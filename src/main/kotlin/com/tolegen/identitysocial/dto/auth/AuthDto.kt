package com.tolegen.identitysocial.dto.auth

import jakarta.validation.constraints.*

/**
 * Запрос на регистрацию.
 */
data class RegisterRequest(
    @field:NotBlank(message = "Username is required")
    @field:Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @field:Pattern(
        regexp = "^[a-zA-Z0-9_]+$",
        message = "Username can only contain letters, numbers and underscores"
    )
    val username: String,

    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Invalid email format")
    @field:Size(max = 100, message = "Email must be less than 100 characters")
    val email: String,

    @field:NotBlank(message = "Password is required")
    @field:Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    @field:Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
        message = "Password must contain at least one uppercase letter, one lowercase letter and one number"
    )
    val password: String,

    @field:Size(max = 50, message = "First name must be less than 50 characters")
    val firstName: String? = null,

    @field:Size(max = 50, message = "Last name must be less than 50 characters")
    val lastName: String? = null
)

/**
 * Запрос на вход.
 */
data class LoginRequest(
    @field:NotBlank(message = "Username or email is required")
    val usernameOrEmail: String,

    @field:NotBlank(message = "Password is required")
    val password: String
)

/**
 * Запрос на обновление токена.
 */
data class RefreshTokenRequest(
    @field:NotBlank(message = "Refresh token is required")
    val refreshToken: String
)

/**
 * Ответ с токенами.
 */
data class AuthResponse(
    val accessToken: String,
    val refreshToken: String,
    val tokenType: String = "Bearer",
    val expiresIn: Long, // в секундах
    val user: UserDto
)

/**
 * Простой ответ для операций без данных (logout и т.д.).
 */
data class MessageResponse(
    val message: String,
    val success: Boolean = true
)

