package com.tolegen.identitysocial.security

import com.tolegen.identitysocial.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Сервис для загрузки пользователя по username/email для Spring Security.
 */
@Service
class CustomUserDetailsService(
    private val userRepository: UserRepository
) : UserDetailsService {

    /**
     * Загрузка пользователя по username или email.
     */
    @Transactional(readOnly = true)
    override fun loadUserByUsername(usernameOrEmail: String): UserDetails {
        val user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
            ?: throw UsernameNotFoundException("User not found with username or email: $usernameOrEmail")

        return UserPrincipal(user)
    }

    /**
     * Загрузка пользователя по UUID (для JWT фильтра).
     */
    @Transactional(readOnly = true)
    fun loadUserByUuid(uuid: java.util.UUID): UserDetails {
        val user = userRepository.findByUuid(uuid)
            ?: throw UsernameNotFoundException("User not found with uuid: $uuid")

        return UserPrincipal(user)
    }
}

