package com.tolegen.identitysocial.dto.auth

import com.tolegen.identitysocial.entity.User
import java.time.LocalDateTime
import java.util.*

/**
 * DTO пользователя для API ответов.
 * Не содержит sensitive данных (пароль, внутренний id).
 */
data class UserDto(
    val uuid: UUID,
    val username: String,
    val email: String,
    val firstName: String?,
    val lastName: String?,
    val fullName: String,
    val avatarUrl: String?,
    val bio: String?,
    val emailVerified: Boolean,
    val roles: List<String>,
    val createdAt: LocalDateTime,
    val lastLoginAt: LocalDateTime?
) {
    companion object {
        /**
         * Конвертация Entity в DTO.
         */
        fun fromEntity(user: User): UserDto = UserDto(
            uuid = user.uuid,
            username = user.username,
            email = user.email,
            firstName = user.firstName,
            lastName = user.lastName,
            fullName = user.fullName,
            avatarUrl = user.avatarUrl,
            bio = user.bio,
            emailVerified = user.emailVerified,
            roles = user.roles.map { it.name },
            createdAt = user.createdAt,
            lastLoginAt = user.lastLoginAt
        )
    }
}

/**
 * Краткое DTO пользователя (для списков, поиска).
 */
data class UserSummaryDto(
    val uuid: UUID,
    val username: String,
    val fullName: String,
    val avatarUrl: String?
) {
    companion object {
        fun fromEntity(user: User): UserSummaryDto = UserSummaryDto(
            uuid = user.uuid,
            username = user.username,
            fullName = user.fullName,
            avatarUrl = user.avatarUrl
        )
    }
}

/**
 * DTO для обновления профиля.
 */
data class UpdateProfileRequest(
    val firstName: String?,
    val lastName: String?,
    val bio: String?,
    val avatarUrl: String?
)

/**
 * DTO для смены пароля.
 */
data class ChangePasswordRequest(
    val currentPassword: String,
    val newPassword: String
)

