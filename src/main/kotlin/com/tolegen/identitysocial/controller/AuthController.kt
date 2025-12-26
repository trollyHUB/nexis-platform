package com.tolegen.identitysocial.controller

import com.tolegen.identitysocial.dto.auth.*
import com.tolegen.identitysocial.repository.UserRepository
import com.tolegen.identitysocial.security.UserPrincipal
import com.tolegen.identitysocial.service.AuthService
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

/**
 * Контроллер аутентификации.
 * Обрабатывает регистрацию, логин, обновление токенов и logout.
 */
@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService,
    private val userRepository: UserRepository
) {
    private val logger = LoggerFactory.getLogger(AuthController::class.java)

    /**
     * Регистрация нового пользователя.
     *
     * POST /api/auth/register
     */
    @PostMapping("/register")
    fun register(
        @Valid @RequestBody request: RegisterRequest,
        httpRequest: HttpServletRequest
    ): ResponseEntity<AuthResponse> {
        logger.info("Registration request for username: ${request.username}")

        val ipAddress = getClientIp(httpRequest)
        val deviceInfo = httpRequest.getHeader("User-Agent")

        val response = authService.register(request, ipAddress, deviceInfo)

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response)
    }

    /**
     * Вход в систему.
     *
     * POST /api/auth/login
     */
    @PostMapping("/login")
    fun login(
        @Valid @RequestBody request: LoginRequest,
        httpRequest: HttpServletRequest
    ): ResponseEntity<AuthResponse> {
        logger.info("Login request for: ${request.usernameOrEmail}")

        val ipAddress = getClientIp(httpRequest)
        val deviceInfo = httpRequest.getHeader("User-Agent")

        val response = authService.login(request, ipAddress, deviceInfo)

        return ResponseEntity.ok(response)
    }

    /**
     * Обновление токенов.
     *
     * POST /api/auth/refresh
     */
    @PostMapping("/refresh")
    fun refreshToken(
        @Valid @RequestBody request: RefreshTokenRequest,
        httpRequest: HttpServletRequest
    ): ResponseEntity<AuthResponse> {
        logger.debug("Refresh token request")

        val ipAddress = getClientIp(httpRequest)
        val deviceInfo = httpRequest.getHeader("User-Agent")

        val response = authService.refreshToken(request, ipAddress, deviceInfo)

        return ResponseEntity.ok(response)
    }

    /**
     * Выход из системы.
     *
     * POST /api/auth/logout
     */
    @PostMapping("/logout")
    fun logout(
        @RequestBody request: RefreshTokenRequest
    ): ResponseEntity<MessageResponse> {
        logger.debug("Logout request")

        authService.logout(request.refreshToken)

        return ResponseEntity.ok(
            MessageResponse(message = "Logged out successfully")
        )
    }

    /**
     * Выход со всех устройств.
     *
     * POST /api/auth/logout-all
     */
    @PostMapping("/logout-all")
    fun logoutAll(
        @AuthenticationPrincipal userPrincipal: UserPrincipal
    ): ResponseEntity<MessageResponse> {
        logger.info("Logout all request for user: ${userPrincipal.username}")

        authService.logoutAll(userPrincipal.getUser())

        return ResponseEntity.ok(
            MessageResponse(message = "Logged out from all devices successfully")
        )
    }

    /**
     * Получение текущего пользователя.
     *
     * GET /api/auth/me
     */
    @GetMapping("/me")
    fun getCurrentUser(
        @AuthenticationPrincipal userPrincipal: UserPrincipal
    ): ResponseEntity<UserDto> {
        val userDto = UserDto.fromEntity(userPrincipal.getUser())
        return ResponseEntity.ok(userDto)
    }

    /**
     * Проверка доступности username.
     *
     * GET /api/auth/check-username?username=xxx
     */
    @GetMapping("/check-username")
    fun checkUsername(
        @RequestParam username: String
    ): ResponseEntity<Map<String, Boolean>> {
        val available = !userRepository.existsByUsername(username.lowercase())
        return ResponseEntity.ok(mapOf("available" to available))
    }

    /**
     * Проверка доступности email.
     *
     * GET /api/auth/check-email?email=xxx
     */
    @GetMapping("/check-email")
    fun checkEmail(
        @RequestParam email: String
    ): ResponseEntity<Map<String, Boolean>> {
        val available = !userRepository.existsByEmail(email.lowercase())
        return ResponseEntity.ok(mapOf("available" to available))
    }

    /**
     * Получение IP адреса клиента.
     */
    private fun getClientIp(request: HttpServletRequest): String? {
        val xForwardedFor = request.getHeader("X-Forwarded-For")
        return if (!xForwardedFor.isNullOrBlank()) {
            xForwardedFor.split(",").first().trim()
        } else {
            request.remoteAddr
        }
    }
}

