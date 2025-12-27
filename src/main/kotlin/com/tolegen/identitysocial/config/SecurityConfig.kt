package com.tolegen.identitysocial.config

import com.tolegen.identitysocial.security.CustomUserDetailsService
import com.tolegen.identitysocial.security.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

/**
 * Конфигурация Spring Security.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
    private val userDetailsService: CustomUserDetailsService
) {

    /**
     * Основная цепочка фильтров безопасности.
     */
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            // Отключаем CSRF (используем JWT, не cookies)
            .csrf { it.disable() }

            // Настройка CORS
            .cors { it.configurationSource(corsConfigurationSource()) }

            // Stateless сессии (JWT)
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }

            // Настройка авторизации endpoints
            .authorizeHttpRequests { auth ->
                auth
                    // Публичные endpoints (без авторизации)
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/public/**").permitAll()

                    // Swagger/OpenAPI (если добавим)
                    .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()

                    // Health check
                    .requestMatchers("/actuator/health", "/api/health").permitAll()

                    // Статические ресурсы
                    .requestMatchers("/", "/index.html", "/static/**", "/favicon.ico").permitAll()

                    // Всё остальное требует аутентификации
                    .anyRequest().authenticated()
            }

            // Добавляем JWT фильтр перед стандартным фильтром
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)

            // Провайдер аутентификации
            .authenticationProvider(authenticationProvider())

        return http.build()
    }

    /**
     * Настройка CORS для фронтенда.
     */
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()

        // Разрешаем ВСЕ origins для разработки (в production заменить на конкретные домены!)
        configuration.allowedOriginPatterns = listOf("*")

        // Разрешённые HTTP методы
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")

        // Разрешённые заголовки
        configuration.allowedHeaders = listOf("*")

        // Разрешить отправку credentials (cookies, authorization headers)
        configuration.allowCredentials = true

        // Время кэширования preflight запросов
        configuration.maxAge = 3600L

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)  // Все пути

        return source
    }

    /**
     * Кодировщик паролей (BCrypt).
     */
    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    /**
     * Провайдер аутентификации.
     */
    @Bean
    fun authenticationProvider(): AuthenticationProvider {
        val provider = DaoAuthenticationProvider(userDetailsService)
        provider.setPasswordEncoder(passwordEncoder())
        return provider
    }

    /**
     * Менеджер аутентификации.
     */
    @Bean
    fun authenticationManager(config: AuthenticationConfiguration): AuthenticationManager {
        return config.authenticationManager
    }
}

