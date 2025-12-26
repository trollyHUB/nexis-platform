package com.tolegen.identitysocial.service

import com.tolegen.identitysocial.dto.*
import com.tolegen.identitysocial.entity.User
import com.tolegen.identitysocial.exception.*
import com.tolegen.identitysocial.repository.FollowRepository
import com.tolegen.identitysocial.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class UserService(
    private val userRepository: UserRepository,
    private val followRepository: FollowRepository,
    private val passwordEncoder: PasswordEncoder
) {
    /**
     * Получить пользователя по UUID.
     */
    fun getUserByUuid(uuid: UUID): User {
        return userRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("User not found")
    }

    /**
     * Получить пользователя по username.
     */
    fun getUserByUsername(username: String): User {
        return userRepository.findByUsername(username)
            ?: throw ResourceNotFoundException("User not found")
    }

    /**
     * Получить текущего пользователя по username (из SecurityContext).
     */
    fun getCurrentUser(username: String): UserResponse {
        val user = getUserByUsername(username)
        return toUserResponse(user, includePrivate = true)
    }

    /**
     * Обновить профиль пользователя.
     */
    @Transactional
    fun updateProfile(username: String, request: UpdateProfileRequest): UserResponse {
        val user = getUserByUsername(username)

        request.firstName?.let { user.firstName = it }
        request.lastName?.let { user.lastName = it }
        request.bio?.let { user.bio = it }
        request.location?.let { user.location = it }
        request.website?.let { user.website = it }
        request.phone?.let { user.phone = it }
        request.dateOfBirth?.let { user.dateOfBirth = it }
        request.gender?.let { user.gender = it }
        request.language?.let { user.language = it }
        request.timezone?.let { user.timezone = it }

        val updated = userRepository.save(user)
        return toUserResponse(updated, includePrivate = true)
    }

    /**
     * Обновить аватар.
     */
    @Transactional
    fun updateAvatar(username: String, avatarUrl: String): UserResponse {
        val user = getUserByUsername(username)
        user.avatarUrl = avatarUrl
        val updated = userRepository.save(user)
        return toUserResponse(updated, includePrivate = true)
    }

    /**
     * Удалить аватар.
     */
    @Transactional
    fun deleteAvatar(username: String): UserResponse {
        val user = getUserByUsername(username)
        user.avatarUrl = null
        val updated = userRepository.save(user)
        return toUserResponse(updated, includePrivate = true)
    }

    /**
     * Изменить пароль.
     */
    @Transactional
    fun changePassword(username: String, request: ChangePasswordRequest) {
        val user = getUserByUsername(username)

        // Проверяем текущий пароль
        if (!passwordEncoder.matches(request.currentPassword, user.password)) {
            throw BadRequestException("Current password is incorrect")
        }

        // Проверяем что новый пароль отличается
        if (passwordEncoder.matches(request.newPassword, user.password)) {
            throw BadRequestException("New password must be different from current")
        }

        user.password = passwordEncoder.encode(request.newPassword)!!
        user.lastPasswordChange = java.time.LocalDateTime.now()
        userRepository.save(user)
    }

    /**
     * Публичный профиль пользователя.
     */
    fun getPublicProfile(uuid: UUID, currentUsername: String?): PublicUserResponse {
        val user = getUserByUuid(uuid)
        val currentUser = currentUsername?.let { userRepository.findByUsername(it) }

        val followersCount = followRepository.countByFollowingId(user.id)
        val followingCount = followRepository.countByFollowerId(user.id)
        val isFollowing = currentUser?.let {
            followRepository.existsByFollowerIdAndFollowingId(it.id, user.id)
        } ?: false

        return PublicUserResponse(
            uuid = user.uuid,
            username = user.username,
            fullName = user.fullName,
            avatarUrl = user.avatarUrl,
            bio = user.bio,
            location = user.location,
            website = user.website,
            followersCount = followersCount,
            followingCount = followingCount,
            isFollowing = isFollowing,
            createdAt = user.createdAt
        )
    }

    /**
     * Подписаться на пользователя.
     */
    @Transactional
    fun follow(currentUsername: String, targetUuid: UUID): FollowResponse {
        val currentUser = getUserByUsername(currentUsername)
        val targetUser = getUserByUuid(targetUuid)

        if (currentUser.id == targetUser.id) {
            throw BadRequestException("You cannot follow yourself")
        }

        if (followRepository.existsByFollowerIdAndFollowingId(currentUser.id, targetUser.id)) {
            throw BadRequestException("You are already following this user")
        }

        val follow = com.tolegen.identitysocial.entity.Follow(
            follower = currentUser,
            following = targetUser
        )
        followRepository.save(follow)

        return FollowResponse(
            following = true,
            followersCount = followRepository.countByFollowingId(targetUser.id),
            followingCount = followRepository.countByFollowerId(targetUser.id)
        )
    }

    /**
     * Отписаться от пользователя.
     */
    @Transactional
    fun unfollow(currentUsername: String, targetUuid: UUID): FollowResponse {
        val currentUser = getUserByUsername(currentUsername)
        val targetUser = getUserByUuid(targetUuid)

        followRepository.deleteByFollowerIdAndFollowingId(currentUser.id, targetUser.id)

        return FollowResponse(
            following = false,
            followersCount = followRepository.countByFollowingId(targetUser.id),
            followingCount = followRepository.countByFollowerId(targetUser.id)
        )
    }

    /**
     * Получить подписчиков.
     */
    fun getFollowers(uuid: UUID, pageable: Pageable): Page<PublicUserResponse> {
        val user = getUserByUuid(uuid)
        return followRepository.findFollowersByUserId(user.id, pageable)
            .map { toPublicUserResponse(it) }
    }

    /**
     * Получить подписки.
     */
    fun getFollowing(uuid: UUID, pageable: Pageable): Page<PublicUserResponse> {
        val user = getUserByUuid(uuid)
        return followRepository.findFollowingByUserId(user.id, pageable)
            .map { toPublicUserResponse(it) }
    }

    /**
     * Поиск пользователей.
     */
    fun searchUsers(query: String, pageable: Pageable): Page<PublicUserResponse> {
        val users = userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            query, query, pageable
        )
        return users.map { toPublicUserResponse(it) }
    }

    /**
     * Конвертация в UserResponse (для текущего пользователя).
     */
    private fun toUserResponse(user: User, includePrivate: Boolean = false): UserResponse {
        return UserResponse(
            uuid = user.uuid,
            username = user.username,
            email = if (includePrivate) user.email else null,
            firstName = user.firstName,
            lastName = user.lastName,
            fullName = user.fullName,
            avatarUrl = user.avatarUrl,
            bio = user.bio,
            location = user.location,
            website = user.website,
            emailVerified = user.emailVerified,
            twoFactorEnabled = user.twoFactorEnabled,
            roles = user.roles.map { it.name },
            highestRole = user.getHighestRole(),
            storageUsed = user.storageUsedFormatted,
            storageLimit = user.storageLimitFormatted,
            storagePercent = user.storageUsedPercent,
            language = user.language,
            timezone = user.timezone,
            createdAt = user.createdAt,
            lastLoginAt = user.lastLoginAt
        )
    }

    /**
     * Конвертация в PublicUserResponse (для других пользователей).
     */
    private fun toPublicUserResponse(user: User): PublicUserResponse {
        return PublicUserResponse(
            uuid = user.uuid,
            username = user.username,
            fullName = user.fullName,
            avatarUrl = user.avatarUrl,
            bio = user.bio,
            location = user.location,
            website = user.website,
            followersCount = followRepository.countByFollowingId(user.id),
            followingCount = followRepository.countByFollowerId(user.id),
            isFollowing = false,
            createdAt = user.createdAt
        )
    }
}
