package com.tolegen.identitysocial.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime
import java.util.*

/**
 * Основная сущность пользователя.
 * Используется для аутентификации и авторизации во всех сервисах экосистемы.
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
     * Не раскрываем внутренний ID наружу - это безопаснее.
     */
    @Column(nullable = false, unique = true, updatable = false)
    val uuid: UUID = UUID.randomUUID(),

    @Column(nullable = false, unique = true, length = 50)
    var username: String,

    @Column(nullable = false, unique = true, length = 100)
    var email: String,

    /**
     * Пароль хранится в виде BCrypt хеша.
     * Никогда не хранить в открытом виде!
     */
    @Column(nullable = false)
    var password: String,

    @Column(length = 50)
    var firstName: String? = null,

    @Column(length = 50)
    var lastName: String? = null,

    /**
     * URL аватара пользователя.
     * В будущем будет храниться в MyVault (MinIO).
     */
    @Column(length = 500)
    var avatarUrl: String? = null,

    /**
     * Краткое описание профиля.
     */
    @Column(length = 500)
    var bio: String? = null,

    /**
     * Подтверждён ли email.
     */
    @Column(nullable = false)
    var emailVerified: Boolean = false,

    /**
     * Активен ли аккаунт.
     * Используется для soft-delete и бана.
     */
    @Column(nullable = false)
    var enabled: Boolean = true,

    /**
     * Заблокирован ли аккаунт (например, за нарушения).
     */
    @Column(nullable = false)
    var locked: Boolean = false,

    /**
     * Роли пользователя.
     * Связь многие-ко-многим.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "role_id")]
    )
    var roles: MutableSet<Role> = mutableSetOf(),

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @UpdateTimestamp
    @Column(nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now(),

    /**
     * Последний вход в систему.
     */
    var lastLoginAt: LocalDateTime? = null
) {
    /**
     * Полное имя пользователя.
     */
    val fullName: String
        get() = listOfNotNull(firstName, lastName).joinToString(" ").ifEmpty { username }

    /**
     * Проверка, есть ли роль у пользователя.
     */
    fun hasRole(roleName: String): Boolean = roles.any { it.name == roleName }

    /**
     * Проверка, является ли пользователь администратором.
     */
    fun isAdmin(): Boolean = hasRole("ROLE_ADMIN")

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is User) return false
        return uuid == other.uuid
    }

    override fun hashCode(): Int = uuid.hashCode()

    override fun toString(): String = "User(id=$id, uuid=$uuid, username='$username', email='$email')"
}

