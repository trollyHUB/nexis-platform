package com.tolegen.identitysocial.config

import com.tolegen.identitysocial.entity.Role
import com.tolegen.identitysocial.entity.User
import com.tolegen.identitysocial.repository.RoleRepository
import com.tolegen.identitysocial.repository.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.password.PasswordEncoder

/**
 * Инициализация начальных данных при запуске приложения.
 */
@Configuration
class DataInitializer {

    private val logger = LoggerFactory.getLogger(DataInitializer::class.java)

    @Bean
    fun initDatabase(
        roleRepository: RoleRepository,
        userRepository: UserRepository,
        passwordEncoder: PasswordEncoder
    ): CommandLineRunner {
        return CommandLineRunner {
            logger.info("Initializing database...")

            // Создаём роли если их нет
            val roles = listOf(
                Role(name = Role.USER, description = "Default user role"),
                Role(name = Role.ADMIN, description = "Administrator role"),
                Role(name = Role.MODERATOR, description = "Moderator role")
            )

            roles.forEach { role ->
                if (!roleRepository.existsByName(role.name)) {
                    roleRepository.save(role)
                    logger.info("Created role: ${role.name}")
                }
            }

            // Создаём админа если его нет
            if (!userRepository.existsByUsername("admin")) {
                val adminRole = roleRepository.findByName(Role.ADMIN)!!
                val userRole = roleRepository.findByName(Role.USER)!!

                val admin = User(
                    username = "admin",
                    email = "admin@example.com",
                    password = passwordEncoder.encode("Admin123!")!!,
                    firstName = "System",
                    lastName = "Administrator",
                    emailVerified = true,
                    roles = mutableSetOf(adminRole, userRole)
                )

                userRepository.save(admin)
                logger.info("Created admin user: admin@example.com / Admin123!")
            }

            logger.info("Database initialization completed!")
        }
    }
}

