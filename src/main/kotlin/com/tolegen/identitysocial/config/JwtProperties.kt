package com.tolegen.identitysocial.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

/**
 * Конфигурация JWT из application.properties.
 */
@Configuration
@ConfigurationProperties(prefix = "jwt")
class JwtProperties {
    /**
     * Секретный ключ для подписи токенов.
     * ВАЖНО: В production использовать минимум 256 бит!
     */
    lateinit var secret: String

    /**
     * Время жизни access token в миллисекундах.
     * По умолчанию: 24 часа.
     */
    var expiration: Long = 86400000

    /**
     * Время жизни refresh token в миллисекундах.
     * По умолчанию: 7 дней.
     */
    var refreshExpiration: Long = 604800000
}

