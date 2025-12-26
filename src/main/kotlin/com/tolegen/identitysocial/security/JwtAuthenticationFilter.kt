package com.tolegen.identitysocial.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter

/**
 * Фильтр для обработки JWT токенов в каждом HTTP запросе.
 */
@Component
class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val userDetailsService: CustomUserDetailsService
) : OncePerRequestFilter() {

    private val log = LoggerFactory.getLogger(JwtAuthenticationFilter::class.java)

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            val jwt = extractJwtFromRequest(request)

            if (jwt != null && jwtService.validateToken(jwt)) {
                val userUuid = jwtService.extractUserUuid(jwt)

                if (userUuid != null) {
                    val userDetails = userDetailsService.loadUserByUuid(userUuid)

                    // Проверяем что пользователь активен
                    if (userDetails.isEnabled && userDetails.isAccountNonLocked) {
                        val authentication = UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.authorities
                        )
                        authentication.details = WebAuthenticationDetailsSource().buildDetails(request)

                        SecurityContextHolder.getContext().authentication = authentication
                        log.debug("Set authentication for user: ${userDetails.username}")
                    }
                }
            }
        } catch (ex: Exception) {
            log.error("Could not set user authentication in security context", ex)
        }

        filterChain.doFilter(request, response)
    }

    /**
     * Извлечение JWT из заголовка Authorization.
     */
    private fun extractJwtFromRequest(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader("Authorization")

        return if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            bearerToken.substring(7)
        } else {
            null
        }
    }
}

