package com.tolegen.identitysocial.exception

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.LocalDateTime

/**
 * DTO для ответа с ошибкой.
 */
data class ErrorResponse(
    val timestamp: LocalDateTime = LocalDateTime.now(),
    val status: Int,
    val error: String,
    val message: String?,
    val errorCode: String? = null,
    val details: Map<String, String>? = null
)

/**
 * Глобальный обработчик исключений.
 */
@RestControllerAdvice
class GlobalExceptionHandler {

    private val logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)

    /**
     * Обработка ошибок валидации.
     */
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationErrors(ex: MethodArgumentNotValidException): ResponseEntity<ErrorResponse> {
        val errors = ex.bindingResult.allErrors.associate { error ->
            val fieldName = (error as? FieldError)?.field ?: "unknown"
            fieldName to (error.defaultMessage ?: "Invalid value")
        }

        val response = ErrorResponse(
            status = HttpStatus.BAD_REQUEST.value(),
            error = "Validation Failed",
            message = "One or more fields have validation errors",
            errorCode = "VALIDATION_ERROR",
            details = errors
        )

        return ResponseEntity.badRequest().body(response)
    }

    /**
     * Обработка BadRequestException.
     */
    @ExceptionHandler(BadRequestException::class)
    fun handleBadRequest(ex: BadRequestException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.BAD_REQUEST.value(),
            error = "Bad Request",
            message = ex.message,
            errorCode = ex.errorCode
        )

        return ResponseEntity.badRequest().body(response)
    }

    /**
     * Обработка ResourceNotFoundException.
     */
    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleNotFound(ex: ResourceNotFoundException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.NOT_FOUND.value(),
            error = "Not Found",
            message = ex.message,
            errorCode = ex.errorCode
        )

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response)
    }

    /**
     * Обработка UnauthorizedException.
     */
    @ExceptionHandler(UnauthorizedException::class)
    fun handleUnauthorized(ex: UnauthorizedException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.UNAUTHORIZED.value(),
            error = "Unauthorized",
            message = ex.message,
            errorCode = ex.errorCode
        )

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response)
    }

    /**
     * Обработка ForbiddenException.
     */
    @ExceptionHandler(ForbiddenException::class)
    fun handleForbidden(ex: ForbiddenException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.FORBIDDEN.value(),
            error = "Forbidden",
            message = ex.message,
            errorCode = ex.errorCode
        )

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response)
    }

    /**
     * Обработка ConflictException.
     */
    @ExceptionHandler(ConflictException::class)
    fun handleConflict(ex: ConflictException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.CONFLICT.value(),
            error = "Conflict",
            message = ex.message,
            errorCode = ex.errorCode
        )

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response)
    }

    /**
     * Обработка ошибок аутентификации Spring Security.
     */
    @ExceptionHandler(BadCredentialsException::class)
    fun handleBadCredentials(ex: BadCredentialsException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.UNAUTHORIZED.value(),
            error = "Unauthorized",
            message = "Invalid username or password",
            errorCode = "INVALID_CREDENTIALS"
        )

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response)
    }

    /**
     * Обработка UsernameNotFoundException.
     */
    @ExceptionHandler(UsernameNotFoundException::class)
    fun handleUsernameNotFound(ex: UsernameNotFoundException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.UNAUTHORIZED.value(),
            error = "Unauthorized",
            message = "Invalid username or password",
            errorCode = "INVALID_CREDENTIALS"
        )

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response)
    }

    /**
     * Обработка всех остальных исключений.
     */
    @ExceptionHandler(Exception::class)
    fun handleAllExceptions(ex: Exception): ResponseEntity<ErrorResponse> {
        logger.error("Unhandled exception: ${ex.message}", ex)

        val response = ErrorResponse(
            status = HttpStatus.INTERNAL_SERVER_ERROR.value(),
            error = "Internal Server Error",
            message = "An unexpected error occurred",
            errorCode = "INTERNAL_ERROR"
        )

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response)
    }
}

