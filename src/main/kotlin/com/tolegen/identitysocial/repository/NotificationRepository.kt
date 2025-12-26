package com.tolegen.identitysocial.repository

import com.tolegen.identitysocial.entity.Notification
import com.tolegen.identitysocial.entity.NotificationType
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface NotificationRepository : JpaRepository<Notification, UUID> {

    fun findByUserIdOrderByCreatedAtDesc(userId: Long, pageable: Pageable): Page<Notification>

    fun findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId: Long): List<Notification>

    fun countByUserIdAndIsReadFalse(userId: Long): Long

    fun findByUserIdAndTypeOrderByCreatedAtDesc(userId: Long, type: NotificationType, pageable: Pageable): Page<Notification>

    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true, n.readAt = CURRENT_TIMESTAMP WHERE n.user.id = :userId AND n.isRead = false")
    fun markAllAsReadByUserId(userId: Long): Int

    @Modifying
    @Query("DELETE FROM Notification n WHERE n.user.id = :userId AND n.isRead = true")
    fun deleteReadByUserId(userId: Long): Int
}

