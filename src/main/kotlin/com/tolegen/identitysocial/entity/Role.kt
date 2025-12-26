package com.tolegen.identitysocial.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime

/**
 * Роль пользователя для авторизации.
 * Использует RBAC (Role-Based Access Control).
 */
@Entity
@Table(name = "roles")
class Role(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    /**
     * Название роли (например: ROLE_USER, ROLE_ADMIN, ROLE_MODERATOR).
     * Префикс ROLE_ обязателен для Spring Security.
     */
    @Column(nullable = false, unique = true, length = 50)
    val name: String,

    /**
     * Описание роли.
     */
    @Column(length = 200)
    val description: String? = null,

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) {
    companion object {
        const val USER = "ROLE_USER"
        const val ADMIN = "ROLE_ADMIN"
        const val MODERATOR = "ROLE_MODERATOR"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Role) return false
        return name == other.name
    }

    override fun hashCode(): Int = name.hashCode()

    override fun toString(): String = "Role(id=$id, name='$name')"
}

