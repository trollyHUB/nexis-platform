package com.tolegen.identitysocial.service

import com.tolegen.identitysocial.dto.auth.*
import com.tolegen.identitysocial.entity.RefreshToken
import com.tolegen.identitysocial.entity.Role
import com.tolegen.identitysocial.entity.User
import com.tolegen.identitysocial.exception.BadRequestException
import com.tolegen.identitysocial.exception.ConflictException
import com.tolegen.identitysocial.exception.UnauthorizedException
import com.tolegen.identitysocial.repository.RefreshTokenRepository
import com.tolegen.identitysocial.repository.RoleRepository
import com.tolegen.identitysocial.repository.UserRepository
import com.tolegen.identitysocial.security.JwtService
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

/**
 * Сервис аутентификации.
 * Обрабатывает регистрацию, логин, обновление токенов и logout.
 */
@Service
class AuthService(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val refreshTokenRepository: RefreshTokenRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService,
    private val authenticationManager: AuthenticationManager
) {
    private val logger = LoggerFactory.getLogger(AuthService::class.java)

    /**
     * Регистрация нового пользователя.
     */
    @Transactional
    fun register(request: RegisterRequest, ipAddress: String? = null, deviceInfo: String? = null): AuthResponse {
        logger.info("Registering new user: ${request.username}")

        // Проверяем что username и email не заняты
        if (userRepository.existsByUsername(request.username)) {
            throw ConflictException("Username '${request.username}' is already taken", "USERNAME_TAKEN")
        }

        if (userRepository.existsByEmail(request.email)) {
            throw ConflictException("Email '${request.email}' is already registered", "EMAIL_TAKEN")
        }

        // Получаем роль USER (создаём если не существует)
        val userRole = roleRepository.findByName(Role.USER)
            ?: roleRepository.save(Role(name = Role.USER, description = "Default user role"))

        // Создаём пользователя
        val user = User(
            username = request.username.lowercase(),
            email = request.email.lowercase(),
            password = passwordEncoder.encode(request.password)!!,
            firstName = request.firstName,
            lastName = request.lastName,
            roles = mutableSetOf(userRole)
        )

        val savedUser = userRepository.save(user)
        logger.info("User registered successfully: ${savedUser.username} (id=${savedUser.id})")

        // Генерируем токены
        return generateAuthResponse(savedUser, ipAddress, deviceInfo)
    }

    /**
     * Вход в систему.
     */
    @Transactional
    fun login(request: LoginRequest, ipAddress: String? = null, deviceInfo: String? = null): AuthResponse {
        logger.info("Login attempt for: ${request.usernameOrEmail}")

        // Аутентификация через Spring Security
        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                request.usernameOrEmail.lowercase(),
                request.password
            )
        )

        // Получаем пользователя
        val user = userRepository.findByUsernameOrEmail(
            request.usernameOrEmail.lowercase(),
            request.usernameOrEmail.lowercase()
        ) ?: throw UnauthorizedException("Invalid credentials")

        // Проверяем статус аккаунта
        if (!user.enabled) {
            throw UnauthorizedException("Account is disabled", "ACCOUNT_DISABLED")
        }

        if (user.locked) {
            throw UnauthorizedException("Account is locked", "ACCOUNT_LOCKED")
        }

        // Обновляем время последнего входа
        userRepository.updateLastLoginAt(user.id, LocalDateTime.now())

        logger.info("User logged in successfully: ${user.username}")

        // Генерируем токены
        return generateAuthResponse(user, ipAddress, deviceInfo)
    }

    /**
     * Обновление токенов по refresh token.
     */
    @Transactional
    fun refreshToken(request: RefreshTokenRequest, ipAddress: String? = null, deviceInfo: String? = null): AuthResponse {
        logger.debug("Refreshing token")

        // Находим refresh token
        val refreshToken = refreshTokenRepository.findByToken(request.refreshToken)
            ?: throw UnauthorizedException("Invalid refresh token", "INVALID_REFRESH_TOKEN")

        // Проверяем валидность
        if (!refreshToken.isValid()) {
            throw UnauthorizedException("Refresh token expired or revoked", "REFRESH_TOKEN_EXPIRED")
        }

        val user = refreshToken.user

        // Проверяем статус пользователя
        if (!user.enabled || user.locked) {
            throw UnauthorizedException("Account is not active", "ACCOUNT_NOT_ACTIVE")
        }

        // Отзываем старый refresh token
        refreshToken.revoked = true
        refreshTokenRepository.save(refreshToken)

        logger.debug("Token refreshed for user: ${user.username}")

        // Генерируем новые токены
        return generateAuthResponse(user, ipAddress, deviceInfo)
    }

    /**
     * Выход из системы (отзыв refresh token).
     */
    @Transactional
    fun logout(refreshToken: String) {
        logger.debug("Logging out, revoking refresh token")

        refreshTokenRepository.revokeByToken(refreshToken)
    }

    /**
     * Выход со всех устройств.
     */
    @Transactional
    fun logoutAll(user: User) {
        logger.info("Logging out from all devices for user: ${user.username}")

        refreshTokenRepository.revokeAllByUser(user)
    }

    /**
     * Генерация ответа с токенами.
     */
    private fun generateAuthResponse(
        user: User,
        ipAddress: String? = null,
        deviceInfo: String? = null
    ): AuthResponse {
        // Генерируем access token
        val accessToken = jwtService.generateAccessToken(user)

        // Создаём refresh token
        val refreshTokenExpiry = LocalDateTime.now()
            .plusSeconds(jwtService.getRefreshTokenExpirationMs() / 1000)

        val refreshToken = RefreshToken(
            user = user,
            expiresAt = refreshTokenExpiry,
            ipAddress = ipAddress,
            deviceInfo = deviceInfo
        )

        refreshTokenRepository.save(refreshToken)

        return AuthResponse(
            accessToken = accessToken,
            refreshToken = refreshToken.token,
            expiresIn = jwtService.getAccessTokenExpirationSeconds(),
            user = UserDto.fromEntity(user)
        )
    }
}

