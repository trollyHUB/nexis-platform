package com.tolegen.identitysocial.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

/**
 * Базовое исключение приложения.
 */
open class ApiException(
    message: String,
    val errorCode: String? = null
) : RuntimeException(message)

/**
 * Ресурс не найден.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
class ResourceNotFoundException(
    message: String,
    errorCode: String = "RESOURCE_NOT_FOUND"
) : ApiException(message, errorCode)

/**
 * Ошибка валидации / бизнес-логики.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
class BadRequestException(
    message: String,
    errorCode: String = "BAD_REQUEST"
) : ApiException(message, errorCode)

/**
 * Ошибка аутентификации.
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
class UnauthorizedException(
    message: String,
    errorCode: String = "UNAUTHORIZED"
) : ApiException(message, errorCode)

/**
 * Ошибка авторизации (нет доступа).
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
class ForbiddenException(
    message: String,
    errorCode: String = "FORBIDDEN"
) : ApiException(message, errorCode)

/**
 * Конфликт данных (дубликат username/email).
 */
@ResponseStatus(HttpStatus.CONFLICT)
class ConflictException(
    message: String,
    errorCode: String = "CONFLICT"
) : ApiException(message, errorCode)

/**
 * Токен истёк или невалиден.
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
class TokenExpiredException(
    message: String = "Token has expired",
    errorCode: String = "TOKEN_EXPIRED"
) : ApiException(message, errorCode)

