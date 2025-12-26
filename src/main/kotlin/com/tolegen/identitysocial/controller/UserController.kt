package com.tolegen.identitysocial.controller

import com.tolegen.identitysocial.dto.auth.UserDto
import com.tolegen.identitysocial.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {

    /**
     * Получить свой профиль
     * GET /api/users/me
     */
    @GetMapping("/me")
    fun getCurrentUser(@AuthenticationPrincipal userDetails: UserDetails): ResponseEntity<UserDto> {
        val user = userService.getUserDtoByUsername(userDetails.username)
        return ResponseEntity.ok(user)
    }

    /**
     * Получить профиль пользователя по UUID
     * GET /api/users/{uuid}
     */
    @GetMapping("/{uuid}")
    fun getUserProfile(@PathVariable uuid: UUID): ResponseEntity<UserDto> {
        val user = userService.getUserDtoByUuid(uuid)
        return ResponseEntity.ok(user)
    }

    /**
     * Обновить свой профиль
     * PUT /api/users/me
     *
     * TODO: Реализовать метод updateProfile в UserService
     */
    /*
    @PutMapping("/me")
    fun updateProfile(
        @AuthenticationPrincipal userDetails: UserDetails,
        @RequestBody request: UpdateProfileRequest
    ): ResponseEntity<UserDto> {
        val updatedUser = userService.updateProfile(userDetails.username, request)
        return ResponseEntity.ok(updatedUser)
    }
    */

    /**
     * Поиск пользователей
     * GET /api/users/search?q=query
     *
     * TODO: Реализовать метод searchUsers в UserService
     */
    /*
    @GetMapping("/search")
    fun searchUsers(@RequestParam q: String): ResponseEntity<List<UserDto>> {
        val users = userService.searchUsers(q)
        return ResponseEntity.ok(users)
    }
    */

    /**
     * Загрузить аватар
     * POST /api/users/me/avatar
     *
     * TODO: Реализовать загрузку файлов
     */
    /*
    @PostMapping("/me/avatar")
    fun uploadAvatar(
        @AuthenticationPrincipal userDetails: UserDetails,
        @RequestParam("file") file: org.springframework.web.multipart.MultipartFile
    ): ResponseEntity<Map<String, String>> {
        val avatarUrl = userService.uploadAvatar(userDetails.username, file)
        return ResponseEntity.ok(mapOf("avatarUrl" to avatarUrl))
    }
    */
}

