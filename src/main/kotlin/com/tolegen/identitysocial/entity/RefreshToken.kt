package com.tolegen.identitysocial.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

/**
 * Refresh Token для обновления Access Token.
 * Хранится в базе данных для возможности отзыва.
 */
@Entity
@Table(
    name = "refresh_tokens",
    indexes = [
        Index(name = "idx_refresh_tokens_token", columnList = "token"),
        Index(name = "idx_refresh_tokens_user_id", columnList = "user_id")
    ]
)
class RefreshToken(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    /**
     * Сам токен (UUID).
     */
    @Column(nullable = false, unique = true)
    val token: String = UUID.randomUUID().toString(),

    /**
     * Владелец токена.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    /**
     * Дата истечения токена.
     */
    @Column(nullable = false)
    val expiresAt: LocalDateTime,

    /**
     * Отозван ли токен (logout, смена пароля).
     */
    @Column(nullable = false)
    var revoked: Boolean = false,

    /**
     * Информация об устройстве (User-Agent).
     */
    @Column(length = 500)
    val deviceInfo: String? = null,

    /**
     * IP адрес при создании токена.
     */
    @Column(length = 50)
    val ipAddress: String? = null,

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) {
    /**
     * Проверка, истёк ли токен.
     */
    fun isExpired(): Boolean = LocalDateTime.now().isAfter(expiresAt)

    /**
     * Проверка, валиден ли токен.
     */
    fun isValid(): Boolean = !revoked && !isExpired()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is RefreshToken) return false
        return token == other.token
    }

    override fun hashCode(): Int = token.hashCode()

    override fun toString(): String = "RefreshToken(id=$id, userId=${user.id}, revoked=$revoked, expiresAt=$expiresAt)"
}

