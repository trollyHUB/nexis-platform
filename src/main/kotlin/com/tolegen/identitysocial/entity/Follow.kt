package com.tolegen.identitysocial.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

/**
 * Подписка на пользователя (followers/following).
 */
@Entity
@Table(
    name = "follows",
    indexes = [
        Index(name = "idx_follows_follower_id", columnList = "follower_id"),
        Index(name = "idx_follows_following_id", columnList = "following_id")
    ],
    uniqueConstraints = [
        UniqueConstraint(columnNames = ["follower_id", "following_id"])
    ]
)
class Follow(
    @Id
    val id: UUID = UUID.randomUUID(),

    /**
     * Кто подписался (подписчик).
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    val follower: User,

    /**
     * На кого подписался.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id", nullable = false)
    val following: User,

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Follow) return false
        return id == other.id
    }

    override fun hashCode(): Int = id.hashCode()
}

