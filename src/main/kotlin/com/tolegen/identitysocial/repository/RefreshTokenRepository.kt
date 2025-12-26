package com.tolegen.identitysocial.repository

import com.tolegen.identitysocial.entity.RefreshToken
import com.tolegen.identitysocial.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

/**
 * Репозиторий для работы с Refresh токенами.
 */
@Repository
interface RefreshTokenRepository : JpaRepository<RefreshToken, Long> {

    /**
     * Поиск токена по значению.
     */
    fun findByToken(token: String): RefreshToken?

    /**
     * Поиск всех токенов пользователя.
     */
    fun findAllByUser(user: User): List<RefreshToken>

    /**
     * Поиск активных токенов пользователя.
     */
    @Query("SELECT rt FROM RefreshToken rt WHERE rt.user = :user AND rt.revoked = false AND rt.expiresAt > :now")
    fun findActiveTokensByUser(user: User, now: LocalDateTime = LocalDateTime.now()): List<RefreshToken>

    /**
     * Отзыв всех токенов пользователя (logout everywhere).
     */
    @Modifying
    @Query("UPDATE RefreshToken rt SET rt.revoked = true WHERE rt.user = :user")
    fun revokeAllByUser(user: User)

    /**
     * Отзыв конкретного токена.
     */
    @Modifying
    @Query("UPDATE RefreshToken rt SET rt.revoked = true WHERE rt.token = :token")
    fun revokeByToken(token: String)

    /**
     * Удаление истёкших токенов (для очистки).
     */
    @Modifying
    @Query("DELETE FROM RefreshToken rt WHERE rt.expiresAt < :now")
    fun deleteExpiredTokens(now: LocalDateTime = LocalDateTime.now())

    /**
     * Подсчёт активных сессий пользователя.
     */
    @Query("SELECT COUNT(rt) FROM RefreshToken rt WHERE rt.user = :user AND rt.revoked = false AND rt.expiresAt > :now")
    fun countActiveSessionsByUser(user: User, now: LocalDateTime = LocalDateTime.now()): Long
}

