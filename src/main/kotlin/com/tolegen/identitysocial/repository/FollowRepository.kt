package com.tolegen.identitysocial.repository

import com.tolegen.identitysocial.entity.Follow
import com.tolegen.identitysocial.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface FollowRepository : JpaRepository<Follow, UUID> {

    fun existsByFollowerIdAndFollowingId(followerId: Long, followingId: Long): Boolean

    fun findByFollowerIdAndFollowingId(followerId: Long, followingId: Long): Follow?

    fun deleteByFollowerIdAndFollowingId(followerId: Long, followingId: Long)

    // Подписчики пользователя (кто на него подписан)
    @Query("SELECT f.follower FROM Follow f WHERE f.following.id = :userId")
    fun findFollowersByUserId(userId: Long, pageable: Pageable): Page<User>

    fun countByFollowingId(followingId: Long): Long

    // Подписки пользователя (на кого он подписан)
    @Query("SELECT f.following FROM Follow f WHERE f.follower.id = :userId")
    fun findFollowingByUserId(userId: Long, pageable: Pageable): Page<User>

    fun countByFollowerId(followerId: Long): Long

    // Взаимные подписки
    @Query("""
        SELECT f.following FROM Follow f 
        WHERE f.follower.id = :userId 
        AND f.following.id IN (
            SELECT f2.follower.id FROM Follow f2 WHERE f2.following.id = :userId
        )
    """)
    fun findMutualFollows(userId: Long, pageable: Pageable): Page<User>
}

