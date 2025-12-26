package com.tolegen.identitysocial.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

/**
 * Основная сущность пользователя NEXIS ID.
 * Центральный модуль аутентификации и профиля для всей экосистемы.
 */
@Entity
@Table(
    name = "users",
    indexes = [
        Index(name = "idx_users_username", columnList = "username"),
        Index(name = "idx_users_email", columnList = "email"),
        Index(name = "idx_users_uuid", columnList = "uuid")
    ]
)
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    /**
     * UUID для внешнего использования (API, межсервисное взаимодействие).
     */
    @Column(nullable = false, unique = true, updatable = false)
    val uuid: UUID = UUID.randomUUID(),

    @Column(nullable = false, unique = true, length = 50)
    var username: String,

    @Column(nullable = false, unique = true, length = 100)
    var email: String,

    /**
     * Пароль хранится в виде BCrypt хеша.
     */
    @Column(nullable = false)
    var password: String,

    // === Профиль ===

    @Column(length = 50)
    var firstName: String? = null,

    @Column(length = 50)
    var lastName: String? = null,

    @Column(length = 500)
    var avatarUrl: String? = null,

    @Column(columnDefinition = "TEXT")
    var bio: String? = null,

    @Column(length = 100)
    var location: String? = null,

    @Column(length = 255)
    var website: String? = null,

    @Column(length = 20)
    var phone: String? = null,

    var dateOfBirth: LocalDate? = null,

    @Column(length = 20)
    var gender: String? = null, // male, female, other, prefer_not_to_say

    @Column(length = 10)
    var language: String = "ru",

    @Column(length = 50)
    var timezone: String = "UTC",

    // === Статус аккаунта ===

    @Column(nullable = false)
    var emailVerified: Boolean = false,

    @Column(nullable = false)
    var enabled: Boolean = true,

    @Column(nullable = false)
    var locked: Boolean = false,

    @Column(nullable = false)
    var isBanned: Boolean = false,

    var bannedAt: LocalDateTime? = null,

    @Column(columnDefinition = "TEXT")
    var banReason: String? = null,

    // === Безопасность ===

    @Column(nullable = false)
    var twoFactorEnabled: Boolean = false,

    @Column(length = 255)
    var twoFactorSecret: String? = null,

    var lastPasswordChange: LocalDateTime? = null,

    // === Хранилище ===

    @Column(nullable = false)
    var storageUsedBytes: Long = 0,

    @Column(nullable = false)
    var storageLimitBytes: Long = 10737418240, // 10 GB по умолчанию

    // === Роли ===

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "role_id")]
    )
    var roles: MutableSet<Role> = mutableSetOf(),

    // === Timestamps ===

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @UpdateTimestamp
    @Column(nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now(),

    var lastLoginAt: LocalDateTime? = null
) {
    /**
     * Полное имя пользователя.
     */
    val fullName: String
        get() = listOfNotNull(firstName, lastName).joinToString(" ").ifEmpty { username }

    /**
     * Использовано хранилища в процентах.
     */
    val storageUsedPercent: Double
        get() = if (storageLimitBytes > 0) (storageUsedBytes.toDouble() / storageLimitBytes * 100) else 0.0

    /**
     * Использовано хранилища в человекочитаемом формате.
     */
    val storageUsedFormatted: String
        get() = formatBytes(storageUsedBytes)

    val storageLimitFormatted: String
        get() = formatBytes(storageLimitBytes)

    private fun formatBytes(bytes: Long): String {
        return when {
            bytes >= 1073741824 -> "%.1f GB".format(bytes / 1073741824.0)
            bytes >= 1048576 -> "%.1f MB".format(bytes / 1048576.0)
            bytes >= 1024 -> "%.1f KB".format(bytes / 1024.0)
            else -> "$bytes B"
        }
    }

    /**
     * Проверка роли.
     */
    fun hasRole(roleName: String): Boolean = roles.any { it.name == roleName }

    /**
     * Проверка нескольких ролей (любая из).
     */
    fun hasAnyRole(vararg roleNames: String): Boolean = roleNames.any { hasRole(it) }

    /**
     * Проверка административных прав.
     */
    fun isAdmin(): Boolean = hasAnyRole("ROLE_ADMIN", "ROLE_SUPER_ADMIN")

    fun isSuperAdmin(): Boolean = hasRole("ROLE_SUPER_ADMIN")

    fun isModerator(): Boolean = hasAnyRole("ROLE_MODERATOR", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

    fun isDeveloper(): Boolean = hasAnyRole("ROLE_DEVELOPER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

    fun isPremium(): Boolean = hasAnyRole("ROLE_PREMIUM", "ROLE_DEVELOPER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")

    /**
     * Получить наивысшую роль.
     */
    fun getHighestRole(): String {
        return when {
            hasRole("ROLE_SUPER_ADMIN") -> "Super Admin"
            hasRole("ROLE_ADMIN") -> "Admin"
            hasRole("ROLE_MODERATOR") -> "Moderator"
            hasRole("ROLE_DEVELOPER") -> "Developer"
            hasRole("ROLE_PREMIUM") -> "Premium"
            hasRole("ROLE_USER") -> "User"
            else -> "Guest"
        }
    }

    /**
     * Можно ли пользователю войти.
     */
    fun canLogin(): Boolean = enabled && !locked && !isBanned

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is User) return false
        return uuid == other.uuid
    }

    override fun hashCode(): Int = uuid.hashCode()

    override fun toString(): String = "User(id=$id, uuid=$uuid, username='$username', email='$email')"
}

