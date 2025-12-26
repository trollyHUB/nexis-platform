package com.tolegen.identitysocial.dto

import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

// === User DTOs ===

/**
 * Полный ответ профиля пользователя (для текущего пользователя)
 */
data class UserResponse(
    val uuid: UUID,
    val username: String,
    val email: String?,
    val firstName: String?,
    val lastName: String?,
    val fullName: String,
    val avatarUrl: String?,
    val bio: String?,
    val location: String?,
    val website: String?,
    val emailVerified: Boolean,
    val twoFactorEnabled: Boolean,
    val roles: List<String>,
    val highestRole: String,
    val storageUsed: String,
    val storageLimit: String,
    val storagePercent: Double,
    val language: String,
    val timezone: String,
    val createdAt: LocalDateTime,
    val lastLoginAt: LocalDateTime?
)

/**
 * Публичный профиль пользователя (для других пользователей)
 */
data class PublicUserResponse(
    val uuid: UUID,
    val username: String,
    val fullName: String,
    val avatarUrl: String?,
    val bio: String?,
    val location: String?,
    val website: String?,
    val followersCount: Long,
    val followingCount: Long,
    val isFollowing: Boolean,
    val createdAt: LocalDateTime
)

/**
 * Краткая информация о пользователе (для списков)
 */
data class UserSummary(
    val uuid: UUID,
    val username: String,
    val fullName: String,
    val avatarUrl: String?,
    val highestRole: String? = null
)

/**
 * Обновление профиля
 */
data class UpdateProfileRequest(
    val firstName: String? = null,
    val lastName: String? = null,
    val bio: String? = null,
    val location: String? = null,
    val website: String? = null,
    val phone: String? = null,
    val dateOfBirth: LocalDate? = null,
    val gender: String? = null,
    val language: String? = null,
    val timezone: String? = null
)

/**
 * Изменение пароля
 */
data class ChangePasswordRequest(
    val currentPassword: String,
    val newPassword: String
)

/**
 * Ответ на follow/unfollow
 */
data class FollowResponse(
    val following: Boolean,
    val followersCount: Long,
    val followingCount: Long
)

// === Post DTOs ===

data class CreatePostRequest(
    val content: String,
    val imageUrl: String? = null
)

data class PostResponse(
    val uuid: UUID,
    val content: String,
    val imageUrl: String?,
    val author: com.tolegen.identitysocial.dto.auth.UserDto,
    val likesCount: Int,
    val commentsCount: Int,
    val isLikedByMe: Boolean,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime?
)

// === Comment DTOs ===

data class CreateCommentRequest(
    val content: String
)

data class CommentResponse(
    val uuid: UUID,
    val content: String,
    val author: UserSummary,
    val postUuid: UUID,
    val createdAt: LocalDateTime
)

// === Message DTOs ===

data class SendMessageRequest(
    val recipientUuid: UUID,
    val content: String
)

data class MessageResponse(
    val uuid: UUID,
    val content: String,
    val sender: UserSummary,
    val recipient: UserSummary,
    val isRead: Boolean,
    val createdAt: LocalDateTime
)

data class ConversationResponse(
    val user: UserSummary,
    val lastMessage: MessageResponse?,
    val unreadCount: Int
)

// === Notification DTOs ===

data class NotificationResponse(
    val uuid: UUID,
    val type: String,
    val title: String,
    val message: String?,
    val data: String?,
    val isRead: Boolean,
    val createdAt: LocalDateTime,
    val readAt: LocalDateTime?
)

// === Session DTOs ===

data class SessionResponse(
    val id: UUID,
    val deviceInfo: String?,
    val ipAddress: String?,
    val location: String?,
    val isCurrent: Boolean,
    val lastActivityAt: LocalDateTime,
    val createdAt: LocalDateTime
)

// === Admin DTOs ===

data class AdminUserResponse(
    val uuid: UUID,
    val username: String,
    val email: String,
    val fullName: String,
    val avatarUrl: String?,
    val roles: List<String>,
    val highestRole: String,
    val emailVerified: Boolean,
    val enabled: Boolean,
    val isBanned: Boolean,
    val banReason: String?,
    val storageUsedBytes: Long,
    val storageLimitBytes: Long,
    val createdAt: LocalDateTime,
    val lastLoginAt: LocalDateTime?
)

data class UpdateUserRoleRequest(
    val role: String
)

data class BanUserRequest(
    val reason: String
)

data class AdminStatsResponse(
    val totalUsers: Long,
    val activeUsers: Long,
    val bannedUsers: Long,
    val totalPosts: Long,
    val totalLikes: Long,
    val usersToday: Long,
    val postsToday: Long
)

// === Security DTOs ===

data class Enable2FAResponse(
    val secret: String,
    val qrCodeUrl: String
)

data class Verify2FARequest(
    val code: String
)

// === Generic DTOs ===

data class SuccessResponse(
    val success: Boolean = true,
    val message: String? = null
)

data class CountResponse(
    val count: Long
)

