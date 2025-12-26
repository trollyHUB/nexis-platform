package com.tolegen.identitysocial.controller

import com.tolegen.identitysocial.dto.*
import com.tolegen.identitysocial.service.UserService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * REST API контроллер для управления пользователями.
 * Часть NEXIS ID - центрального модуля аутентификации.
 */
@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {
    /**
     * Получить текущего пользователя.
     */
    @GetMapping("/me")
    fun getCurrentUser(
        @AuthenticationPrincipal userDetails: UserDetails
    ): ResponseEntity<UserResponse> {
        val user = userService.getCurrentUser(userDetails.username)
        return ResponseEntity.ok(user)
    }

    /**
     * Обновить профиль текущего пользователя.
     */
    @PutMapping("/me")
    fun updateProfile(
        @AuthenticationPrincipal userDetails: UserDetails,
        @RequestBody request: UpdateProfileRequest
    ): ResponseEntity<UserResponse> {
        val user = userService.updateProfile(userDetails.username, request)
        return ResponseEntity.ok(user)
    }

    /**
     * Обновить аватар.
     */
    @PostMapping("/me/avatar")
    fun updateAvatar(
        @AuthenticationPrincipal userDetails: UserDetails,
        @RequestBody body: Map<String, String>
    ): ResponseEntity<UserResponse> {
        val avatarUrl = body["avatarUrl"] ?: throw IllegalArgumentException("avatarUrl is required")
        val user = userService.updateAvatar(userDetails.username, avatarUrl)
        return ResponseEntity.ok(user)
    }

    /**
     * Удалить аватар.
     */
    @DeleteMapping("/me/avatar")
    fun deleteAvatar(
        @AuthenticationPrincipal userDetails: UserDetails
    ): ResponseEntity<UserResponse> {
        val user = userService.deleteAvatar(userDetails.username)
        return ResponseEntity.ok(user)
    }

    /**
     * Изменить пароль.
     */
    @PutMapping("/me/password")
    fun changePassword(
        @AuthenticationPrincipal userDetails: UserDetails,
        @RequestBody request: ChangePasswordRequest
    ): ResponseEntity<SuccessResponse> {
        userService.changePassword(userDetails.username, request)
        return ResponseEntity.ok(SuccessResponse(message = "Password changed successfully"))
    }

    /**
     * Получить публичный профиль пользователя по UUID.
     */
    @GetMapping("/{uuid}")
    fun getUserByUuid(
        @PathVariable uuid: UUID,
        @AuthenticationPrincipal userDetails: UserDetails?
    ): ResponseEntity<PublicUserResponse> {
        val profile = userService.getPublicProfile(uuid, userDetails?.username)
        return ResponseEntity.ok(profile)
    }

    /**
     * Поиск пользователей.
     */
    @GetMapping("/search")
    fun searchUsers(
        @RequestParam q: String,
        @PageableDefault(size = 20) pageable: Pageable
    ): ResponseEntity<Page<PublicUserResponse>> {
        val users = userService.searchUsers(q, pageable)
        return ResponseEntity.ok(users)
    }

    /**
     * Подписаться на пользователя.
     */
    @PostMapping("/{uuid}/follow")
    @PreAuthorize("isAuthenticated()")
    fun followUser(
        @PathVariable uuid: UUID,
        @AuthenticationPrincipal userDetails: UserDetails
    ): ResponseEntity<FollowResponse> {
        val result = userService.follow(userDetails.username, uuid)
        return ResponseEntity.ok(result)
    }

    /**
     * Отписаться от пользователя.
     */
    @DeleteMapping("/{uuid}/follow")
    @PreAuthorize("isAuthenticated()")
    fun unfollowUser(
        @PathVariable uuid: UUID,
        @AuthenticationPrincipal userDetails: UserDetails
    ): ResponseEntity<FollowResponse> {
        val result = userService.unfollow(userDetails.username, uuid)
        return ResponseEntity.ok(result)
    }

    /**
     * Получить подписчиков пользователя.
     */
    @GetMapping("/{uuid}/followers")
    fun getFollowers(
        @PathVariable uuid: UUID,
        @PageableDefault(size = 20) pageable: Pageable
    ): ResponseEntity<Page<PublicUserResponse>> {
        val followers = userService.getFollowers(uuid, pageable)
        return ResponseEntity.ok(followers)
    }

    /**
     * Получить подписки пользователя.
     */
    @GetMapping("/{uuid}/following")
    fun getFollowing(
        @PathVariable uuid: UUID,
        @PageableDefault(size = 20) pageable: Pageable
    ): ResponseEntity<Page<PublicUserResponse>> {
        val following = userService.getFollowing(uuid, pageable)
        return ResponseEntity.ok(following)
    }
}

