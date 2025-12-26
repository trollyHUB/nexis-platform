package com.tolegen.identitysocial.controller

import com.tolegen.identitysocial.dto.CreatePostRequest
import com.tolegen.identitysocial.dto.PostResponse
import com.tolegen.identitysocial.service.PostService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*
import java.util.UUID

/**
 * REST API контроллер для постов (социальная лента).
 */
@RestController
@RequestMapping("/api/posts")
class PostController(
    private val postService: PostService
) {

    /**
     * Получить ленту постов
     * GET /api/posts/feed?page=0&size=20
     */
    @GetMapping("/feed")
    fun getFeed(
        @AuthenticationPrincipal userDetails: UserDetails,
        pageable: Pageable
    ): ResponseEntity<Page<PostResponse>> {
        val feed = postService.getFeed(userDetails.username, pageable)
        return ResponseEntity.ok(feed)
    }

    /**
     * Создать пост
     * POST /api/posts
     */
    @PostMapping
    fun createPost(
        @AuthenticationPrincipal userDetails: UserDetails,
        @RequestBody request: CreatePostRequest
    ): ResponseEntity<PostResponse> {
        val post = postService.createPost(userDetails.username, request)
        return ResponseEntity.status(HttpStatus.CREATED).body(post)
    }

    /**
     * Получить пост по ID
     * GET /api/posts/{uuid}
     */
    @GetMapping("/{uuid}")
    fun getPost(@PathVariable uuid: UUID): ResponseEntity<PostResponse> {
        val post = postService.getPostByUuid(uuid)
        return ResponseEntity.ok(post)
    }

    /**
     * Лайкнуть пост
     * POST /api/posts/{uuid}/like
     */
    @PostMapping("/{uuid}/like")
    fun likePost(
        @AuthenticationPrincipal userDetails: UserDetails,
        @PathVariable uuid: UUID
    ): ResponseEntity<Map<String, Any>> {
        val liked = postService.toggleLike(userDetails.username, uuid)
        return ResponseEntity.ok(mapOf(
            "liked" to liked,
            "likesCount" to postService.getLikesCount(uuid)
        ))
    }

    /**
     * Удалить пост
     * DELETE /api/posts/{uuid}
     */
    @DeleteMapping("/{uuid}")
    fun deletePost(
        @AuthenticationPrincipal userDetails: UserDetails,
        @PathVariable uuid: UUID
    ): ResponseEntity<Void> {
        postService.deletePost(userDetails.username, uuid)
        return ResponseEntity.noContent().build()
    }

    /**
     * Получить посты пользователя
     * GET /api/posts/user/{userUuid}
     */
    @GetMapping("/user/{userUuid}")
    fun getUserPosts(
        @PathVariable userUuid: UUID,
        pageable: Pageable
    ): ResponseEntity<Page<PostResponse>> {
        val posts = postService.getUserPosts(userUuid, pageable)
        return ResponseEntity.ok(posts)
    }
}

