package com.tolegen.identitysocial.controller

import com.tolegen.identitysocial.dto.*
import com.tolegen.identitysocial.service.AdminService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * Admin API для управления системой.
 * Доступно только для ролей ADMIN и SUPER_ADMIN.
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
class AdminController(
    private val adminService: AdminService
) {
    /**
     * Получить список всех пользователей.
     */
    @GetMapping("/users")
    fun getAllUsers(
        @PageableDefault(size = 20) pageable: Pageable,
        @RequestParam(required = false) search: String?,
        @RequestParam(required = false) role: String?,
        @RequestParam(required = false) banned: Boolean?
    ): ResponseEntity<Page<AdminUserResponse>> {
        val users = adminService.getAllUsers(pageable, search, role, banned)
        return ResponseEntity.ok(users)
    }

    /**
     * Получить пользователя по UUID.
     */
    @GetMapping("/users/{uuid}")
    fun getUserByUuid(@PathVariable uuid: UUID): ResponseEntity<AdminUserResponse> {
        val user = adminService.getUserByUuid(uuid)
        return ResponseEntity.ok(user)
    }

    /**
     * Изменить роль пользователя.
     */
    @PutMapping("/users/{uuid}/role")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    fun updateUserRole(
        @PathVariable uuid: UUID,
        @RequestBody request: UpdateUserRoleRequest
    ): ResponseEntity<AdminUserResponse> {
        val user = adminService.updateUserRole(uuid, request.role)
        return ResponseEntity.ok(user)
    }

    /**
     * Забанить пользователя.
     */
    @PostMapping("/users/{uuid}/ban")
    fun banUser(
        @PathVariable uuid: UUID,
        @RequestBody request: BanUserRequest
    ): ResponseEntity<AdminUserResponse> {
        val user = adminService.banUser(uuid, request.reason)
        return ResponseEntity.ok(user)
    }

    /**
     * Разбанить пользователя.
     */
    @DeleteMapping("/users/{uuid}/ban")
    fun unbanUser(@PathVariable uuid: UUID): ResponseEntity<AdminUserResponse> {
        val user = adminService.unbanUser(uuid)
        return ResponseEntity.ok(user)
    }

    /**
     * Отключить аккаунт пользователя.
     */
    @PostMapping("/users/{uuid}/disable")
    fun disableUser(@PathVariable uuid: UUID): ResponseEntity<AdminUserResponse> {
        val user = adminService.disableUser(uuid)
        return ResponseEntity.ok(user)
    }

    /**
     * Включить аккаунт пользователя.
     */
    @PostMapping("/users/{uuid}/enable")
    fun enableUser(@PathVariable uuid: UUID): ResponseEntity<AdminUserResponse> {
        val user = adminService.enableUser(uuid)
        return ResponseEntity.ok(user)
    }

    /**
     * Получить статистику системы.
     */
    @GetMapping("/stats")
    fun getStats(): ResponseEntity<AdminStatsResponse> {
        val stats = adminService.getStats()
        return ResponseEntity.ok(stats)
    }

    /**
     * Получить список всех ролей.
     */
    @GetMapping("/roles")
    fun getAllRoles(): ResponseEntity<List<String>> {
        val roles = adminService.getAllRoles()
        return ResponseEntity.ok(roles)
    }
}

