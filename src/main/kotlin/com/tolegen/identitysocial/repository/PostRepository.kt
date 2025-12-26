package com.tolegen.identitysocial.repository

import com.tolegen.identitysocial.entity.Post
import com.tolegen.identitysocial.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.*

/**
 * Репозиторий для работы с постами.
 */
@Repository
interface PostRepository : JpaRepository<Post, Long> {

    /**
     * Найти пост по UUID
     */
    fun findByUuid(uuid: UUID): Post?

    /**
     * Получить все посты (лента)
     */
    fun findAllByOrderByCreatedAtDesc(pageable: Pageable): Page<Post>

    /**
     * Получить посты конкретного пользователя
     */
    fun findByAuthorOrderByCreatedAtDesc(author: User, pageable: Pageable): Page<Post>

    /**
     * Получить посты по UUID автора
     */
    fun findByAuthorUuidOrderByCreatedAtDesc(authorUuid: UUID, pageable: Pageable): Page<Post>

    /**
     * Проверить существование поста по UUID
     */
    fun existsByUuid(uuid: UUID): Boolean

    /**
     * Удалить пост по UUID
     */
    fun deleteByUuid(uuid: UUID)

    /**
     * Подсчёт постов за период
     */
    fun countByCreatedAtAfter(date: LocalDateTime): Long
}

