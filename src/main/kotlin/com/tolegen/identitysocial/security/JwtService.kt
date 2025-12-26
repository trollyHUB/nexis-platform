package com.tolegen.identitysocial.security

import com.tolegen.identitysocial.config.JwtProperties
import com.tolegen.identitysocial.entity.User
import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*
import javax.crypto.SecretKey

/**
 * Сервис для работы с JWT токенами.
 */
@Service
class JwtService(
    private val jwtProperties: JwtProperties
) {
    private val logger = LoggerFactory.getLogger(JwtService::class.java)

    /**
     * Ключ для подписи токенов.
     */
    private val signingKey: SecretKey by lazy {
        Keys.hmacShaKeyFor(jwtProperties.secret.toByteArray())
    }

    /**
     * Генерация Access Token.
     */
    fun generateAccessToken(user: User): String {
        val now = Date()
        val expiryDate = Date(now.time + jwtProperties.expiration)

        return Jwts.builder()
            .subject(user.uuid.toString())
            .claim("username", user.username)
            .claim("email", user.email)
            .claim("roles", user.roles.map { it.name })
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(signingKey)
            .compact()
    }

    /**
     * Извлечение UUID пользователя из токена.
     */
    fun extractUserUuid(token: String): UUID? {
        return try {
            val subject = extractAllClaims(token).subject
            UUID.fromString(subject)
        } catch (e: Exception) {
            logger.warn("Failed to extract user UUID from token: ${e.message}")
            null
        }
    }

    /**
     * Извлечение username из токена.
     */
    fun extractUsername(token: String): String? {
        return try {
            extractAllClaims(token).get("username", String::class.java)
        } catch (e: Exception) {
            logger.warn("Failed to extract username from token: ${e.message}")
            null
        }
    }

    /**
     * Извлечение ролей из токена.
     */
    @Suppress("UNCHECKED_CAST")
    fun extractRoles(token: String): List<String> {
        return try {
            extractAllClaims(token).get("roles", List::class.java) as? List<String> ?: emptyList()
        } catch (e: Exception) {
            logger.warn("Failed to extract roles from token: ${e.message}")
            emptyList()
        }
    }

    /**
     * Проверка валидности токена.
     */
    fun validateToken(token: String): Boolean {
        return try {
            val claims = extractAllClaims(token)
            !isTokenExpired(claims)
        } catch (e: ExpiredJwtException) {
            logger.debug("JWT token expired")
            false
        } catch (e: MalformedJwtException) {
            logger.warn("Invalid JWT token")
            false
        } catch (e: UnsupportedJwtException) {
            logger.warn("Unsupported JWT token")
            false
        } catch (e: IllegalArgumentException) {
            logger.warn("JWT claims string is empty")
            false
        } catch (e: Exception) {
            logger.error("JWT validation error: ${e.message}")
            false
        }
    }

    /**
     * Получение времени жизни access token в секундах.
     */
    fun getAccessTokenExpirationSeconds(): Long = jwtProperties.expiration / 1000

    /**
     * Получение времени жизни refresh token в миллисекундах.
     */
    fun getRefreshTokenExpirationMs(): Long = jwtProperties.refreshExpiration

    /**
     * Извлечение всех claims из токена.
     */
    private fun extractAllClaims(token: String): Claims {
        return Jwts.parser()
            .verifyWith(signingKey)
            .build()
            .parseSignedClaims(token)
            .payload
    }

    /**
     * Проверка истечения токена.
     */
    private fun isTokenExpired(claims: Claims): Boolean {
        return claims.expiration.before(Date())
    }
}

