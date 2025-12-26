package com.tolegen.identitysocial.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

/**
 * Сессия пользователя для управления активными входами.
 */
@Entity
@Table(
    name = "user_sessions",
    indexes = [
        Index(name = "idx_user_sessions_user_id", columnList = "user_id"),
        Index(name = "idx_user_sessions_token_hash", columnList = "tokenHash")
    ]
)
class UserSession(
    @Id
    val id: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @Column(nullable = false)
    val tokenHash: String,

    @Column(length = 255)
    var deviceInfo: String? = null,

    @Column(length = 45)
    var ipAddress: String? = null,

    @Column(columnDefinition = "TEXT")
    var userAgent: String? = null,

    @Column(length = 100)
    var location: String? = null,

    @Column(nullable = false)
    var isActive: Boolean = true,

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    var lastActivityAt: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    val expiresAt: LocalDateTime
) {
    /**
     * Проверка, истекла ли сессия.
     */
    fun isExpired(): Boolean = LocalDateTime.now().isAfter(expiresAt)

    /**
     * Проверка, активна ли сессия.
     */
    fun isValid(): Boolean = isActive && !isExpired()

    /**
     * Обновить время последней активности.
     */
    fun touch() {
        lastActivityAt = LocalDateTime.now()
    }

    /**
     * Деактивировать сессию.
     */
    fun deactivate() {
        isActive = false
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is UserSession) return false
        return id == other.id
    }

    override fun hashCode(): Int = id.hashCode()
}

