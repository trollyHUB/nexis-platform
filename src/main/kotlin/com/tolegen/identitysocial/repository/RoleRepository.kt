package com.tolegen.identitysocial.repository

import com.tolegen.identitysocial.entity.Role
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Репозиторий для работы с ролями.
 */
@Repository
interface RoleRepository : JpaRepository<Role, Long> {

    /**
     * Поиск роли по имени.
     */
    fun findByName(name: String): Role?

    /**
     * Проверка существования роли.
     */
    fun existsByName(name: String): Boolean
}

