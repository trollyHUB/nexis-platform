package com.tolegen.identitysocial.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Публичный контроллер для проверки работы API.
 */
@RestController
class HomeController {

    @GetMapping("/")
    fun home(): Map<String, Any> = mapOf(
        "service" to "Identity & Social API",
        "version" to "0.0.1",
        "status" to "running",
        "endpoints" to mapOf(
            "register" to "POST /api/auth/register",
            "login" to "POST /api/auth/login",
            "refresh" to "POST /api/auth/refresh",
            "me" to "GET /api/auth/me (requires JWT)",
            "logout" to "POST /api/auth/logout"
        )
    )

    @GetMapping("/api/public/health")
    fun health(): Map<String, String> = mapOf(
        "status" to "UP",
        "database" to "connected"
    )
}

