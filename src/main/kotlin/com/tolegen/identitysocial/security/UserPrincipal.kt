package com.tolegen.identitysocial.security

import com.tolegen.identitysocial.entity.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

/**
 * Реализация UserDetails для Spring Security.
 * Обёртка над нашей User entity.
 */
class UserPrincipal(
    private val user: User
) : UserDetails {

    /**
     * Получить саму Entity User.
     */
    fun getUser(): User = user

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return user.roles.map { SimpleGrantedAuthority(it.name) }
    }

    override fun getPassword(): String = user.password

    override fun getUsername(): String = user.username

    /**
     * Аккаунт не истёк (можно добавить логику если нужно).
     */
    override fun isAccountNonExpired(): Boolean = true

    /**
     * Аккаунт не заблокирован.
     */
    override fun isAccountNonLocked(): Boolean = !user.locked

    /**
     * Credentials (пароль) не истёк.
     */
    override fun isCredentialsNonExpired(): Boolean = true

    /**
     * Аккаунт активен.
     */
    override fun isEnabled(): Boolean = user.enabled
}

