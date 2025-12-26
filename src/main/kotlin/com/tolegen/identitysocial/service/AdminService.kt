package com.tolegen.identitysocial.service

import com.tolegen.identitysocial.dto.AdminStatsResponse
import com.tolegen.identitysocial.dto.AdminUserResponse
import com.tolegen.identitysocial.entity.User
import com.tolegen.identitysocial.exception.BadRequestException
import com.tolegen.identitysocial.exception.ResourceNotFoundException
import com.tolegen.identitysocial.repository.LikeRepository
import com.tolegen.identitysocial.repository.PostRepository
import com.tolegen.identitysocial.repository.RoleRepository
import com.tolegen.identitysocial.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.util.*

@Service
class AdminService(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val postRepository: PostRepository,
    private val likeRepository: LikeRepository
) {
    /**
     * Получить всех пользователей с фильтрацией.
     */
    fun getAllUsers(
        pageable: Pageable,
        search: String?,
        role: String?,
        banned: Boolean?
    ): Page<AdminUserResponse> {
        // Простая реализация - в production нужен Specification
        var users = userRepository.findAll(pageable)

        // Фильтрация в памяти (для MVP, потом переделать на Specification)
        var filteredList = users.content.toMutableList()

        if (!search.isNullOrBlank()) {
            filteredList = filteredList.filter {
                it.username.contains(search, ignoreCase = true) ||
                it.email.contains(search, ignoreCase = true) ||
                it.fullName.contains(search, ignoreCase = true)
            }.toMutableList()
        }

        if (!role.isNullOrBlank()) {
            filteredList = filteredList.filter { user ->
                user.roles.any { it.name == role }
            }.toMutableList()
        }

        if (banned != null) {
            filteredList = filteredList.filter { it.isBanned == banned }.toMutableList()
        }

        val responseList = filteredList.map { toAdminUserResponse(it) }
        return PageImpl(responseList, pageable, filteredList.size.toLong())
    }

    /**
     * Получить пользователя по UUID.
     */
    fun getUserByUuid(uuid: UUID): AdminUserResponse {
        val user = userRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("User not found")
        return toAdminUserResponse(user)
    }

    /**
     * Изменить роль пользователя.
     */
    @Transactional
    fun updateUserRole(uuid: UUID, roleName: String): AdminUserResponse {
        val user = userRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("User not found")

        val role = roleRepository.findByName(roleName)
            ?: throw BadRequestException("Role not found: $roleName")

        // Нельзя менять роль супер-админа
        if (user.isSuperAdmin()) {
            throw BadRequestException("Cannot change role of super admin")
        }

        // Очищаем текущие роли и добавляем новую + базовую ROLE_USER
        user.roles.clear()
        user.roles.add(roleRepository.findByName("ROLE_USER")!!)
        if (roleName != "ROLE_USER") {
            user.roles.add(role)
        }

        val saved = userRepository.save(user)
        return toAdminUserResponse(saved)
    }

    /**
     * Забанить пользователя.
     */
    @Transactional
    fun banUser(uuid: UUID, reason: String): AdminUserResponse {
        val user = userRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("User not found")

        // Нельзя банить админов
        if (user.isAdmin()) {
            throw BadRequestException("Cannot ban admin user")
        }

        user.isBanned = true
        user.bannedAt = LocalDateTime.now()
        user.banReason = reason

        val saved = userRepository.save(user)
        return toAdminUserResponse(saved)
    }

    /**
     * Разбанить пользователя.
     */
    @Transactional
    fun unbanUser(uuid: UUID): AdminUserResponse {
        val user = userRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("User not found")

        user.isBanned = false
        user.bannedAt = null
        user.banReason = null

        val saved = userRepository.save(user)
        return toAdminUserResponse(saved)
    }

    /**
     * Отключить аккаунт.
     */
    @Transactional
    fun disableUser(uuid: UUID): AdminUserResponse {
        val user = userRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("User not found")

        if (user.isAdmin()) {
            throw BadRequestException("Cannot disable admin user")
        }

        user.enabled = false
        val saved = userRepository.save(user)
        return toAdminUserResponse(saved)
    }

    /**
     * Включить аккаунт.
     */
    @Transactional
    fun enableUser(uuid: UUID): AdminUserResponse {
        val user = userRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("User not found")

        user.enabled = true
        val saved = userRepository.save(user)
        return toAdminUserResponse(saved)
    }

    /**
     * Получить статистику системы.
     */
    fun getStats(): AdminStatsResponse {
        val today = LocalDate.now()
        val startOfDay = LocalDateTime.of(today, LocalTime.MIN)

        return AdminStatsResponse(
            totalUsers = userRepository.count(),
            activeUsers = userRepository.countByEnabledTrue(),
            bannedUsers = userRepository.countByIsBannedTrue(),
            totalPosts = postRepository.count(),
            totalLikes = likeRepository.count(),
            usersToday = userRepository.countByCreatedAtAfter(startOfDay),
            postsToday = postRepository.countByCreatedAtAfter(startOfDay)
        )
    }

    /**
     * Получить все роли.
     */
    fun getAllRoles(): List<String> {
        return roleRepository.findAll().map { it.name }
    }

    /**
     * Конвертация в AdminUserResponse.
     */
    private fun toAdminUserResponse(user: User): AdminUserResponse {
        return AdminUserResponse(
            uuid = user.uuid,
            username = user.username,
            email = user.email,
            fullName = user.fullName,
            avatarUrl = user.avatarUrl,
            roles = user.roles.map { it.name },
            highestRole = user.getHighestRole(),
            emailVerified = user.emailVerified,
            enabled = user.enabled,
            isBanned = user.isBanned,
            banReason = user.banReason,
            storageUsedBytes = user.storageUsedBytes,
            storageLimitBytes = user.storageLimitBytes,
            createdAt = user.createdAt,
            lastLoginAt = user.lastLoginAt
        )
    }
}

