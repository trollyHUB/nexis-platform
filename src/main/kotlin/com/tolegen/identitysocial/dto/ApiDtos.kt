package com.tolegen.identitysocial.dto

import com.tolegen.identitysocial.dto.auth.UserDto
import java.time.LocalDateTime
import java.util.UUID

/**
 * Обновление профиля пользователя
 */
data class UpdateProfileRequest(
    val firstName: String?,
    val lastName: String?,
    val bio: String?,
    val avatarUrl: String?
)

/**
 * Создание поста
 */
data class CreatePostRequest(
    val content: String,
    val imageUrl: String? = null
)

/**
 * Ответ с постом
 */
data class PostResponse(
    val uuid: UUID,
    val content: String,
    val imageUrl: String?,
    val author: UserDto,
    val likesCount: Int,
    val commentsCount: Int,
    val isLikedByMe: Boolean,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime?
)

/**
 * Создание комментария
 */
data class CreateCommentRequest(
    val content: String
)

/**
 * Ответ с комментарием
 */
data class CommentResponse(
    val uuid: UUID,
    val content: String,
    val author: UserDto,
    val postUuid: UUID,
    val createdAt: LocalDateTime
)

/**
 * Отправка сообщения
 */
data class SendMessageRequest(
    val recipientUuid: UUID,
    val content: String
)

/**
 * Ответ с сообщением
 */
data class MessageResponse(
    val uuid: UUID,
    val content: String,
    val sender: UserDto,
    val recipient: UserDto,
    val isRead: Boolean,
    val createdAt: LocalDateTime
)

/**
 * Список чатов
 */
data class ConversationResponse(
    val user: UserDto,
    val lastMessage: MessageResponse?,
    val unreadCount: Int
)

/**
 * Уведомление
 */
data class NotificationResponse(
    val uuid: UUID,
    val type: NotificationType,
    val message: String,
    val relatedUser: UserDto?,
    val relatedPostUuid: UUID?,
    val isRead: Boolean,
    val createdAt: LocalDateTime
)

enum class NotificationType {
    LIKE,
    COMMENT,
    FOLLOW,
    MESSAGE,
    MENTION
}

