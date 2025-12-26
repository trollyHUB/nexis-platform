package com.tolegen.identitysocial.repository

import com.tolegen.identitysocial.entity.Like
import com.tolegen.identitysocial.entity.Post
import com.tolegen.identitysocial.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

/**
 * Репозиторий для работы с лайками.
 */
@Repository
interface LikeRepository : JpaRepository<Like, Long> {

    /**
     * Найти лайк пользователя на посте
     */
    fun findByUserAndPost(user: User, post: Post): Like?

    /**
     * Проверить существование лайка
     */
    fun existsByUserAndPost(user: User, post: Post): Boolean

    /**
     * Удалить лайк пользователя на посте
     */
    fun deleteByUserAndPost(user: User, post: Post)

    /**
     * Подсчитать количество лайков на посте
     */
    fun countByPost(post: Post): Int

    /**
     * Подсчитать количество лайков по UUID поста
     */
    fun countByPostUuid(postUuid: UUID): Int

    /**
     * Проверить лайкнул ли пользователь пост
     */
    fun existsByUserUuidAndPostUuid(userUuid: UUID, postUuid: UUID): Boolean
}

