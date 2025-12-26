package com.tolegen.identitysocial.service

import com.tolegen.identitysocial.dto.auth.UserDto
import com.tolegen.identitysocial.exception.ResourceNotFoundException
import com.tolegen.identitysocial.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Сервис управления пользователями.
 */
@Service
@Transactional(readOnly = true)
class UserService(
    private val userRepository: UserRepository
) {

    /**
     * Получить UserDto по username
     */
    fun getUserDtoByUsername(username: String): UserDto {
        val user = userRepository.findByUsername(username)
            ?: throw ResourceNotFoundException("User not found", "USER_NOT_FOUND")
        return UserDto.fromEntity(user)
    }

    /**
     * Получить UserDto по UUID
     */
    fun getUserDtoByUuid(uuid: UUID): UserDto {
        val user = userRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("User not found", "USER_NOT_FOUND")
        return UserDto.fromEntity(user)
    }

    // TODO: Добавить метод updateProfile
    // TODO: Добавить метод searchUsers
    // TODO: Добавить метод uploadAvatar
}

