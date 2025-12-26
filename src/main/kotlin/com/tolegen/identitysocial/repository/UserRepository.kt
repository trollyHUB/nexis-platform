package com.tolegen.identitysocial.repository

import com.tolegen.identitysocial.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.*

/**
 * Репозиторий для работы с пользователями.
 */
@Repository
interface UserRepository : JpaRepository<User, Long> {

    /**
     * Поиск по username.
     */
    fun findByUsername(username: String): User?

    /**
     * Поиск по email.
     */
    fun findByEmail(email: String): User?

    /**
     * Поиск по UUID (для API).
     */
    fun findByUuid(uuid: UUID): User?

    /**
     * Поиск по username или email (для логина).
     */
    fun findByUsernameOrEmail(username: String, email: String): User?

    /**
     * Проверка существования по username.
     */
    fun existsByUsername(username: String): Boolean

    /**
     * Проверка существования по email.
     */
    fun existsByEmail(email: String): Boolean

    /**
     * Проверка существования по username или email.
     */
    fun existsByUsernameOrEmail(username: String, email: String): Boolean

    /**
     * Обновление времени последнего входа.
     */
    @Modifying
    @Query("UPDATE User u SET u.lastLoginAt = :loginAt WHERE u.id = :userId")
    fun updateLastLoginAt(userId: Long, loginAt: LocalDateTime)

    /**
     * Поиск пользователей по части username или email (для поиска в соцсети).
     */
    @Query("""
        SELECT u FROM User u 
        WHERE u.enabled = true 
        AND (LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%')) 
             OR LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%'))
             OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%'))
             OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')))
    """)
    fun searchUsers(query: String): List<User>

    /**
     * Получение количества пользователей (для статистики).
     */
    @Query("SELECT COUNT(u) FROM User u WHERE u.enabled = true")
    fun countActiveUsers(): Long

    /**
     * Поиск с пагинацией.
     */
    fun findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(
        username: String,
        email: String,
        pageable: org.springframework.data.domain.Pageable
    ): org.springframework.data.domain.Page<User>

    /**
     * Подсчёт активных пользователей.
     */
    fun countByEnabledTrue(): Long

    /**
     * Подсчёт забаненных пользователей.
     */
    fun countByIsBannedTrue(): Long

    /**
     * Подсчёт пользователей за период.
     */
    fun countByCreatedAtAfter(date: LocalDateTime): Long
}

