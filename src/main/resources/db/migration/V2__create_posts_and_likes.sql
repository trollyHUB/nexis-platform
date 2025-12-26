-- Миграция для создания таблиц posts и likes
-- Дата: 26.12.2025

-- Таблица постов
CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_uuid ON posts(uuid);

-- Таблица лайков
CREATE TABLE IF NOT EXISTS likes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);

-- Индексы для оптимизации
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_post ON likes(user_id, post_id);

-- Комментарий к таблицам
COMMENT ON TABLE posts IS 'Посты пользователей в социальной ленте';
COMMENT ON TABLE likes IS 'Лайки постов';

COMMENT ON COLUMN posts.uuid IS 'Публичный UUID поста для API';
COMMENT ON COLUMN posts.content IS 'Текст поста';
COMMENT ON COLUMN posts.image_url IS 'URL изображения (опционально)';
COMMENT ON COLUMN posts.author_id IS 'ID автора поста';

COMMENT ON COLUMN likes.user_id IS 'ID пользователя, который лайкнул';
COMMENT ON COLUMN likes.post_id IS 'ID лайкнутого поста';

