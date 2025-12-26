# 017 - REST API АРХИТЕКТУРА

**Дата начала:** 26.12.2025 12:50  
**Дата завершения:** 26.12.2025 13:15  
**Статус:** ✅ Реализовано

---

## 📋 ЧТО ТАКОЕ REST API?

**REST API** (Representational State Transfer Application Programming Interface) — это архитектурный стиль для создания веб-сервисов.

### Простыми словами:

```
Frontend (браузер)  →  HTTP запрос  →  Backend (сервер)
                    ←  JSON ответ   ←
```

**Пример:**
```http
POST http://localhost:8082/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

→ Response:
{
  "accessToken": "eyJhbGc...",
  "user": { "username": "admin", ... }
}
```

---

## 🎯 ЗАЧЕМ НУЖЕН REST API?

| Преимущество | Описание |
|--------------|----------|
| **Разделение** | Frontend и Backend — независимые приложения |
| **Гибкость** | Можно создать: веб, мобильное приложение, desktop |
| **Масштабируемость** | Backend на нескольких серверах |
| **Переиспользование** | Один API для всех платформ |

---

## 🏗️ НАША REST API АРХИТЕКТУРА

### Структура URL:

```
http://localhost:8082/api/{resource}/{action}

/api/auth/login              ← Аутентификация
/api/auth/register
/api/auth/refresh

/api/users/me                ← Профиль
/api/users/{uuid}
/api/users/search

/api/posts/feed              ← Лента постов
/api/posts/{uuid}
/api/posts/{uuid}/like

/api/messages                ← Сообщения
/api/messages/{uuid}

/api/notifications           ← Уведомления
```

---

## 📚 ПОЛНАЯ ДОКУМЕНТАЦИЯ API

### 🔐 АУТЕНТИФИКАЦИЯ

#### 1. Регистрация
```http
POST /api/auth/register
Content-Type: application/json

Request:
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### 2. Вход
```http
POST /api/auth/login
Content-Type: application/json

Request:
{
  "username": "johndoe",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000",
  "tokenType": "Bearer",
  "expiresIn": 86400,
  "user": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

#### 3. Обновить токен
```http
POST /api/auth/refresh
Content-Type: application/json

Request:
{
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
}

Response: 200 OK
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "expiresIn": 86400
}
```

---

### 👤 ПОЛЬЗОВАТЕЛИ

#### 1. Получить свой профиль
```http
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

Response: 200 OK
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "fullName": "John Doe",
  "bio": "Software Developer",
  "avatarUrl": "https://example.com/avatar.jpg",
  "createdAt": "2025-12-26T10:00:00"
}
```

#### 2. Обновить профиль
```http
PUT /api/users/me
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
Content-Type: application/json

Request:
{
  "firstName": "John",
  "lastName": "Smith",
  "bio": "Full Stack Developer | Kotlin enthusiast"
}

Response: 200 OK
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "fullName": "John Smith",
  "bio": "Full Stack Developer | Kotlin enthusiast"
}
```

#### 3. Поиск пользователей
```http
GET /api/users/search?q=john
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

Response: 200 OK
[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "fullName": "John Doe"
  },
  {
    "uuid": "660e8400-e29b-41d4-a716-446655440001",
    "username": "johnny",
    "fullName": "Johnny Walker"
  }
]
```

---

### 📝 ПОСТЫ (ЛЕНТА)

#### 1. Получить ленту
```http
GET /api/posts/feed?page=0&size=20
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

Response: 200 OK
{
  "content": [
    {
      "uuid": "770e8400-e29b-41d4-a716-446655440000",
      "content": "Hello World! 🚀",
      "imageUrl": null,
      "author": {
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "username": "johndoe",
        "fullName": "John Doe"
      },
      "likesCount": 15,
      "commentsCount": 3,
      "isLikedByMe": false,
      "createdAt": "2025-12-26T12:00:00"
    }
  ],
  "pageable": { "pageNumber": 0, "pageSize": 20 },
  "totalElements": 45,
  "totalPages": 3
}
```

#### 2. Создать пост
```http
POST /api/posts
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
Content-Type: application/json

Request:
{
  "content": "Just deployed my new app! 🎉",
  "imageUrl": "https://example.com/screenshot.png"
}

Response: 201 Created
{
  "uuid": "880e8400-e29b-41d4-a716-446655440000",
  "content": "Just deployed my new app! 🎉",
  "imageUrl": "https://example.com/screenshot.png",
  "likesCount": 0,
  "commentsCount": 0,
  "createdAt": "2025-12-26T13:00:00"
}
```

#### 3. Лайкнуть пост
```http
POST /api/posts/770e8400-e29b-41d4-a716-446655440000/like
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

Response: 200 OK
{
  "liked": true,
  "likesCount": 16
}
```

#### 4. Удалить пост
```http
DELETE /api/posts/880e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

Response: 204 No Content
```

---

## 🔒 БЕЗОПАСНОСТЬ

### JWT Token в каждом запросе:
```http
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE3MDM1OTIwMDAsImV4cCI6MTcwMzY3ODQwMH0.signature
```

### Публичные endpoints (без токена):
- `POST /api/auth/login`
- `POST /api/auth/register`

### Защищённые endpoints (требуют токен):
- Все `/api/users/*`
- Все `/api/posts/*`
- Все `/api/messages/*`
- Все `/api/notifications/*`

---

## 📊 HTTP STATUS CODES

| Код | Значение | Когда используется |
|-----|----------|-------------------|
| **200** | OK | Успешный запрос |
| **201** | Created | Создан новый ресурс |
| **204** | No Content | Успешно удалено |
| **400** | Bad Request | Неверные данные |
| **401** | Unauthorized | Не авторизован |
| **403** | Forbidden | Нет прав доступа |
| **404** | Not Found | Ресурс не найден |
| **500** | Internal Error | Ошибка сервера |

---

## 🧪 ТЕСТИРОВАНИЕ В POSTMAN

### 1. Создай коллекцию "NEXIS API"

### 2. Добавь Environment:
```json
{
  "baseUrl": "http://localhost:8082",
  "accessToken": ""
}
```

### 3. Последовательность тестов:
1. **Login** → сохрани `accessToken`
2. **Get Profile** → используй токен
3. **Create Post** → используй токен
4. **Like Post** → используй токен

---

## 🔄 СЛЕДУЮЩИЕ ШАГИ

- [ ] Добавить Messages API (личные сообщения)
- [ ] Добавить Notifications API (уведомления)
- [ ] Добавить Friends API (друзья/подписчики)
- [ ] Добавить Comments API (комментарии к постам)
- [ ] WebSocket для real-time уведомлений

---

## 💡 ПОЧЕМУ REST, А НЕ GRAPHQL?

| Критерий | REST | GraphQL |
|----------|------|---------|
| Простота | ✅ Легко понять | ⚠️ Сложнее |
| Кэширование | ✅ HTTP кэш | ⚠️ Сложнее |
| Для нашего проекта | ✅ Идеально | ❌ Оверкилл |

**Вывод:** REST достаточно для 90% проектов, включая наш.

---

*Документ создан: 26.12.2025 12:50*  
*Последнее обновление: 26.12.2025 13:15*

