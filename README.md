# 🚀 NEXIS Platform

> **Единая экосистема для общения, работы и разработки**

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)]()
[![Version](https://img.shields.io/badge/Version-0.1.0-blue)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

---

## 🎯 О проекте

**NEXIS** — это модульная платформа нового поколения, которая объединяет:
- 🔐 **NEXIS ID** — Единая система аутентификации
- 💬 **NEXIS Connect** — Социальная сеть и мессенджер
- 📁 **NEXIS Workspace** — Проекты и командная работа
- ☁️ **NEXIS Cloud** — Облачное хранилище
- 🔧 **NEXIS Dev** — API и инструменты для разработчиков

---

## ⚡ Быстрый старт

### Требования:
- Java 21+
- Node.js 20+
- PostgreSQL 16+
- Docker (опционально)

### Запуск:

```bash
# 1. База данных (Docker)
docker-compose up -d

# 2. Backend
./gradlew bootRun

# 3. Frontend (в отдельном терминале)
cd frontend
npm install
npm run dev
```

### Открыть:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8082/api
- **Swagger:** http://localhost:8082/swagger-ui.html

---

## 🏗️ Архитектура

```
NEXIS Platform
├── Backend (Kotlin + Spring Boot 4.0)
│   ├── Auth (JWT, OAuth2, 2FA)
│   ├── Users (профили, подписки)
│   ├── Posts (лента, комментарии)
│   └── Messages (чаты, уведомления)
│
├── Frontend (React 19 + TypeScript)
│   ├── Landing Page
│   ├── Dashboard
│   ├── Connect Module
│   └── Account Settings
│
└── Database (PostgreSQL 16)
    ├── users
    ├── roles
    ├── posts
    ├── comments
    └── messages
```

---

## 📦 Модули

| Модуль | Статус | Описание |
|--------|--------|----------|
| NEXIS ID | 🟡 70% | Авторизация, профили |
| NEXIS Connect | 🟡 40% | Соц.сеть, сообщения |
| NEXIS Workspace | 🔴 0% | Проекты, команды |
| NEXIS Cloud | 🔴 0% | Файлы, хранилище |
| NEXIS Dev | 🔴 0% | API, SDK |

---

## 🛠️ Технологии

### Backend:
- Kotlin 2.0
- Spring Boot 4.0
- Spring Security + JWT
- PostgreSQL
- Hibernate ORM

### Frontend:
- React 19
- TypeScript
- Tailwind CSS 4
- Vite
- React Router

---

## 📁 Структура проекта

```
identity-social/
├── src/                    # Backend (Kotlin)
│   └── main/
│       ├── kotlin/         # Исходный код
│       └── resources/      # Конфигурация
├── frontend/               # Frontend (React)
│   └── src/
│       ├── components/     # UI компоненты
│       ├── pages/          # Страницы
│       ├── contexts/       # React контексты
│       └── services/       # API сервисы
├── docs/                   # Документация
└── docker-compose.yml      # Docker конфигурация
```

---

## 🔐 API Endpoints

### Auth:
```
POST /api/auth/register    - Регистрация
POST /api/auth/login       - Вход
POST /api/auth/refresh     - Обновить токен
POST /api/auth/logout      - Выход
```

### Users:
```
GET  /api/users/me         - Текущий пользователь
PUT  /api/users/me         - Обновить профиль
GET  /api/users/{id}       - Получить пользователя
```

### Posts:
```
GET  /api/posts/feed       - Лента постов
POST /api/posts            - Создать пост
POST /api/posts/{id}/like  - Лайк
```

---

## 📖 Документация

Вся документация находится в папке `/docs`:
- [Генеральный план](docs/027-ГЕНЕРАЛЬНЫЙ-ПЛАН-NEXIS.md)
- [Архитектура](docs/026-ПЕРЕОСМЫСЛЕНИЕ-АРХИТЕКТУРЫ.md)
- [REST API](docs/017-REST-API-АРХИТЕКТУРА.md)

---

## 🚀 Roadmap

- [x] Авторизация (JWT)
- [x] Профили пользователей
- [x] Лента постов
- [ ] 2FA аутентификация
- [ ] OAuth2 (Google, GitHub)
- [ ] Личные сообщения
- [ ] Групповые чаты
- [ ] Файловое хранилище
- [ ] Мобильное приложение

---

## 👤 Автор

**NEXIS Platform** разрабатывается как масштабный проект с целью создания полноценной экосистемы для пользователей.

---

## 📄 Лицензия

Проект находится в стадии разработки. Все права защищены.

---

*Последнее обновление: 26.12.2025*

