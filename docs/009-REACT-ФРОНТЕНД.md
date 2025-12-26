# 009 - REACT ФРОНТЕНД И БУДУЩИЕ ФУНКЦИИ

**Дата:** 26.12.2025  
**Статус:** ✅ Базовый фронтенд готов | ⏳ OAuth и Email в разработке

---

## ✅ ЧТО СДЕЛАНО

### Фронтенд (React + TypeScript + Tailwind)

```
frontend/src/
├── App.tsx                    # Роутинг
├── index.css                  # Tailwind стили
├── contexts/
│   └── AuthContext.tsx        # Контекст авторизации
├── services/
│   └── api.ts                 # API клиент (axios)
├── components/
│   └── OAuthButtons.tsx       # Кнопки OAuth (Google, GitHub, Facebook, Apple)
├── pages/
│   ├── HomePage.tsx           # Главная страница
│   ├── LoginPage.tsx          # Вход + OAuth + Забыли пароль
│   ├── RegisterPage.tsx       # Регистрация с валидацией
│   ├── ProfilePage.tsx        # Профиль пользователя
│   └── ForgotPasswordPage.tsx # Восстановление пароля (скелет)
└── types/
    └── index.ts               # TypeScript типы
```

### Страницы:
- ✅ **Главная** - лендинг с описанием
- ✅ **Вход** - с OAuth кнопками и "Забыли пароль"
- ✅ **Регистрация** - с real-time валидацией пароля
- ✅ **Профиль** - полная информация о пользователе
- ✅ **Забыли пароль** - UI готов (бэкенд TODO)

---

## 🔮 ПЛАН БУДУЩИХ ФУНКЦИЙ

### Фаза 2: Email функции (Backend)

| Функция | Endpoint | Статус |
|---------|----------|--------|
| Забыли пароль | `POST /api/auth/forgot-password` | ⏳ TODO |
| Сброс пароля | `POST /api/auth/reset-password` | ⏳ TODO |
| Подтверждение email | `POST /api/auth/verify-email` | ⏳ TODO |
| Повторная отправка | `POST /api/auth/resend-verification` | ⏳ TODO |

**Требуется:**
- Настройка SMTP (Gmail, SendGrid, Mailgun)
- Entity для хранения токенов сброса/подтверждения
- Email шаблоны (HTML)

### Фаза 3: OAuth2 (Backend)

| Провайдер | Статус | Документация |
|-----------|--------|--------------|
| Google | ⏳ TODO | https://developers.google.com/identity |
| GitHub | ⏳ TODO | https://docs.github.com/en/apps/oauth-apps |
| Facebook | ⏳ TODO | https://developers.facebook.com/docs/facebook-login |
| Apple | ⏳ TODO | https://developer.apple.com/sign-in-with-apple |

**Требуется:**
- Spring Security OAuth2 Client
- Регистрация приложений у провайдеров
- Callback endpoints
- Связь OAuth аккаунтов с локальными

### Фаза 4: Профиль и настройки

| Функция | Статус |
|---------|--------|
| Редактирование профиля | ⏳ TODO |
| Загрузка аватара | ⏳ TODO (MinIO/S3) |
| Смена пароля | ⏳ TODO |
| Удаление аккаунта | ⏳ TODO |
| Двухфакторная аутентификация (2FA) | ⏳ TODO |

### Фаза 5: Social функции

| Функция | Статус |
|---------|--------|
| Посты (CRUD) | ⏳ TODO |
| Комментарии | ⏳ TODO |
| Лайки | ⏳ TODO |
| Подписки (follow/unfollow) | ⏳ TODO |
| Лента новостей | ⏳ TODO |
| Уведомления | ⏳ TODO |

---

## 🛠 ЗАПУСК

### Backend (порт 8083)
```bash
# В IDEA: зелёная кнопка ▶️
# Или в терминале:
cd identity-social
./gradlew bootRun
```

### Frontend (порт 5173)
```bash
cd frontend
npm run dev
```

### URLs
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8083
- **Swagger (будет):** http://localhost:8083/swagger-ui.html

---

## 📝 TODO для бэкенда (следующие шаги)

### 1. Email Service
```kotlin
// Создать:
// - EmailService.kt - отправка писем
// - EmailTemplate.kt - шаблоны
// - PasswordResetToken.kt - entity для токенов
```

### 2. Endpoints для восстановления пароля
```kotlin
// POST /api/auth/forgot-password
// POST /api/auth/reset-password
// GET /api/auth/verify-email?token=xxx
```

### 3. OAuth2 Configuration
```kotlin
// SecurityConfig - добавить OAuth2 login
// OAuth2UserService - обработка OAuth пользователей
// application.properties - credentials провайдеров
```

---

## 🔧 Переменные окружения (для OAuth)

```properties
# Google
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET

# GitHub
spring.security.oauth2.client.registration.github.client-id=YOUR_GITHUB_CLIENT_ID
spring.security.oauth2.client.registration.github.client-secret=YOUR_GITHUB_CLIENT_SECRET

# Email (SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL
spring.mail.password=YOUR_APP_PASSWORD
```

---

*Документ создан: 26.12.2025*

