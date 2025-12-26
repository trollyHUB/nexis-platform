package com.tolegen.identitysocial.service

import com.tolegen.identitysocial.dto.CreatePostRequest
import com.tolegen.identitysocial.dto.PostResponse
import com.tolegen.identitysocial.dto.auth.UserDto
import com.tolegen.identitysocial.entity.Post
import com.tolegen.identitysocial.exception.ForbiddenException
import com.tolegen.identitysocial.exception.ResourceNotFoundException
import com.tolegen.identitysocial.repository.LikeRepository
import com.tolegen.identitysocial.repository.PostRepository
import com.tolegen.identitysocial.repository.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * Сервис для работы с постами.
 */
@Service
@Transactional(readOnly = true)
class PostService(
    private val postRepository: PostRepository,
    private val userRepository: UserRepository,
    private val likeRepository: LikeRepository
) {
    private val logger = LoggerFactory.getLogger(PostService::class.java)

    /**
     * Создать новый пост
     */
    @Transactional
    fun createPost(username: String, request: CreatePostRequest): PostResponse {
        logger.info("Creating post for user: $username")
        
        val author = userRepository.findByUsername(username)
            ?: throw ResourceNotFoundException("User not found", "USER_NOT_FOUND")

        val post = Post(
            content = request.content,
            imageUrl = request.imageUrl,
            author = author
        )

        val savedPost = postRepository.save(post)
        logger.info("Post created: ${savedPost.uuid}")

        return toPostResponse(savedPost, author.uuid)
    }

    /**
     * Получить ленту постов
     */
    fun getFeed(username: String, pageable: Pageable): Page<PostResponse> {
        logger.debug("Getting feed for user: $username")
        
        val user = userRepository.findByUsername(username)
            ?: throw ResourceNotFoundException("User not found", "USER_NOT_FOUND")

        val posts = postRepository.findAllByOrderByCreatedAtDesc(pageable)
        
        return posts.map { post -> toPostResponse(post, user.uuid) }
    }

    /**
     * Получить пост по UUID
     */
    fun getPostByUuid(uuid: UUID): PostResponse {
        logger.debug("Getting post: $uuid")
        
        val post = postRepository.findByUuid(uuid)
            ?: throw ResourceNotFoundException("Post not found", "POST_NOT_FOUND")

        return toPostResponse(post, null)
    }

    /**
     * Получить посты пользователя
     */
    fun getUserPosts(userUuid: UUID, pageable: Pageable): Page<PostResponse> {
        logger.debug("Getting posts for user: $userUuid")
        
        val posts = postRepository.findByAuthorUuidOrderByCreatedAtDesc(userUuid, pageable)
        
        return posts.map { post -> toPostResponse(post, null) }
    }

    /**
     * Удалить пост
     */
    @Transactional
    fun deletePost(username: String, postUuid: UUID) {
        logger.info("Deleting post: $postUuid by user: $username")
        
        val user = userRepository.findByUsername(username)
            ?: throw ResourceNotFoundException("User not found", "USER_NOT_FOUND")
        
        val post = postRepository.findByUuid(postUuid)
            ?: throw ResourceNotFoundException("Post not found", "POST_NOT_FOUND")

        // Проверяем что пользователь - автор поста
        if (post.author.uuid != user.uuid) {
            throw ForbiddenException("You can only delete your own posts", "NOT_POST_AUTHOR")
        }

        postRepository.delete(post)
        logger.info("Post deleted: $postUuid")
    }

    /**
     * Лайкнуть/дизлайкнуть пост
     */
    @Transactional
    fun toggleLike(username: String, postUuid: UUID): Boolean {
        logger.debug("Toggling like on post: $postUuid by user: $username")
        
        val user = userRepository.findByUsername(username)
            ?: throw ResourceNotFoundException("User not found", "USER_NOT_FOUND")
        
        val post = postRepository.findByUuid(postUuid)
            ?: throw ResourceNotFoundException("Post not found", "POST_NOT_FOUND")

        val existingLike = likeRepository.findByUserAndPost(user, post)

        return if (existingLike != null) {
            // Дизлайк - удаляем лайк
            likeRepository.delete(existingLike)
            logger.debug("Like removed from post: $postUuid")
            false
        } else {
            // Лайк - создаём новый
            val like = com.tolegen.identitysocial.entity.Like(
                user = user,
                post = post
            )
            likeRepository.save(like)
            logger.debug("Like added to post: $postUuid")
            true
        }
    }

    /**
     * Получить количество лайков на посте
     */
    fun getLikesCount(postUuid: UUID): Int {
        return likeRepository.countByPostUuid(postUuid)
    }

    /**
     * Проверить лайкнул ли текущий пользователь пост
     */
    private fun isLikedByUser(postUuid: UUID, userUuid: UUID?): Boolean {
        if (userUuid == null) return false
        return likeRepository.existsByUserUuidAndPostUuid(userUuid, postUuid)
    }

    /**
     * Конвертировать Post entity в PostResponse DTO
     */
    private fun toPostResponse(post: Post, currentUserUuid: UUID?): PostResponse {
        return PostResponse(
            uuid = post.uuid,
            content = post.content,
            imageUrl = post.imageUrl,
            author = UserDto.fromEntity(post.author),
            likesCount = likeRepository.countByPost(post),
            commentsCount = 0, // TODO: реализовать комментарии
            isLikedByMe = isLikedByUser(post.uuid, currentUserUuid),
            createdAt = post.createdAt,
            updatedAt = post.updatedAt
        )
    }
}

