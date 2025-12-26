package com.tolegen.identitysocial.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

/**
 * Уведомление пользователя.
 */
@Entity
@Table(
    name = "notifications",
    indexes = [
        Index(name = "idx_notifications_user_id", columnList = "user_id"),
        Index(name = "idx_notifications_is_read", columnList = "isRead")
    ]
)
class Notification(
    @Id
    val id: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    val type: NotificationType,

    @Column(nullable = false, length = 255)
    var title: String,

    @Column(columnDefinition = "TEXT")
    var message: String? = null,

    /**
     * Дополнительные данные в JSON формате.
     * Например: { "postId": "...", "userId": "..." }
     */
    @Column(columnDefinition = "jsonb")
    var data: String? = null,

    @Column(nullable = false)
    var isRead: Boolean = false,

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    var readAt: LocalDateTime? = null
) {
    /**
     * Пометить как прочитанное.
     */
    fun markAsRead() {
        if (!isRead) {
            isRead = true
            readAt = LocalDateTime.now()
        }
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Notification) return false
        return id == other.id
    }

    override fun hashCode(): Int = id.hashCode()
}

/**
 * Типы уведомлений.
 */
enum class NotificationType {
    LIKE,           // Кто-то лайкнул пост
    COMMENT,        // Кто-то прокомментировал
    FOLLOW,         // Новый подписчик
    MENTION,        // Упоминание в посте
    MESSAGE,        // Новое сообщение
    SYSTEM,         // Системное уведомление
    SECURITY,       // Уведомление безопасности
    PROMOTION       // Промо/маркетинг
}

