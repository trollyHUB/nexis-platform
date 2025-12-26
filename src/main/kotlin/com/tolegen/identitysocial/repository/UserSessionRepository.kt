package com.tolegen.identitysocial.repository

import com.tolegen.identitysocial.entity.UserSession
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.*

@Repository
interface UserSessionRepository : JpaRepository<UserSession, UUID> {

    fun findByUserIdAndIsActiveTrue(userId: Long): List<UserSession>

    fun findByTokenHashAndIsActiveTrue(tokenHash: String): UserSession?

    fun countByUserIdAndIsActiveTrue(userId: Long): Long

    @Modifying
    @Query("UPDATE UserSession s SET s.isActive = false WHERE s.user.id = :userId")
    fun deactivateAllByUserId(userId: Long): Int

    @Modifying
    @Query("UPDATE UserSession s SET s.isActive = false WHERE s.expiresAt < :now")
    fun deactivateExpiredSessions(now: LocalDateTime = LocalDateTime.now()): Int

    @Modifying
    @Query("DELETE FROM UserSession s WHERE s.isActive = false AND s.expiresAt < :before")
    fun deleteInactiveBefore(before: LocalDateTime): Int
}

