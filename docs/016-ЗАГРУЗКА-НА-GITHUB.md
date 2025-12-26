# 016 - ЗАГРУЗКА НА GITHUB

**Дата:** 26.12.2025  
**Статус:** 📋 Инструкция

---

## 🚀 ПОШАГОВАЯ ИНСТРУКЦИЯ

### Шаг 1: Создай репозиторий на GitHub

1. Открой https://github.com
2. Войди в аккаунт (или создай новый)
3. Нажми **"+"** → **"New repository"**
4. Заполни:
   - **Repository name:** `nexis` (или `nexis-platform`)
   - **Description:** `🚀 NEXIS - Network Enterprise eXperience Identity System. Modern authentication platform with React 19 & Spring Boot 4.`
   - **Public** или **Private** (выбери сам)
   - ❌ НЕ ставь галочку "Add a README file"
   - ❌ НЕ ставь галочку "Add .gitignore"
5. Нажми **"Create repository"**

### Шаг 2: Подключи удалённый репозиторий

После создания GitHub покажет команды. Выполни в терминале:

```powershell
cd C:\Users\Lenovo\IdeaProjects\identity-social

# Добавь remote (замени YOUR_USERNAME на твой логин GitHub)
git remote add origin https://github.com/YOUR_USERNAME/nexis.git

# Переименуй ветку в main (если нужно)
git branch -M main

# Загрузи код
git push -u origin main
```

### Шаг 3: Введи учётные данные

При первой загрузке GitHub попросит авторизацию:
- **Вариант 1:** Откроется браузер для авторизации
- **Вариант 2:** Введи логин и Personal Access Token (не пароль!)

#### Как создать Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token"
3. Отметь: `repo`, `workflow`
4. "Generate token"
5. СКОПИРУЙ токен (он покажется только раз!)

---

## 📝 ОПИСАНИЕ ДЛЯ GITHUB

### Repository Description (короткое):
```
🚀 NEXIS - Modern authentication & social platform. React 19 + Spring Boot 4 + PostgreSQL
```

### About (на странице репозитория):
```
🚀 NEXIS - Network Enterprise eXperience Identity System

Modern full-stack platform with:
• JWT Authentication
• Social Feed & Messages
• Dark/Light Theme
• React 19 + TypeScript + Tailwind CSS 4
• Kotlin + Spring Boot 4 + PostgreSQL

Created: December 26, 2025
```

### Topics (теги):
```
react, typescript, kotlin, spring-boot, postgresql, jwt, authentication, 
social-network, tailwindcss, vite, full-stack, dark-theme
```

---

## 🌐 АЛЬТЕРНАТИВЫ GITHUB

| Платформа | Описание | Бесплатно | Приватные репо |
|-----------|----------|-----------|----------------|
| **GitHub** | Самый популярный | ✅ | ✅ Безлимит |
| **GitLab** | CI/CD встроен | ✅ | ✅ Безлимит |
| **Bitbucket** | Atlassian (Jira) | ✅ | ✅ До 5 юзеров |
| **Gitea** | Self-hosted | ✅ | ✅ Свой сервер |
| **SourceForge** | Старый, надёжный | ✅ | ❌ |
| **Codeberg** | Open source | ✅ | ✅ |

### Рекомендация:
- **GitHub** — для портфолио и дипломной (все знают)
- **GitLab** — если нужен CI/CD из коробки
- **Bitbucket** — если используешь Jira

---

## 📁 ЧТО НЕ ЗАГРУЖАЕТСЯ (благодаря .gitignore)

```
❌ build/              # Скомпилированные файлы
❌ .gradle/            # Кэш Gradle
❌ .idea/              # Настройки IDE
❌ node_modules/       # Зависимости npm
❌ dist/               # Собранный frontend
❌ .env                # Секреты и пароли
❌ *.log               # Логи
❌ *.jar               # JAR файлы (кроме gradle-wrapper)
```

---

## ✅ ЧТО ЗАГРУЖАЕТСЯ

```
✅ src/                # Исходный код Backend
✅ frontend/src/       # Исходный код Frontend  
✅ docs/               # Документация
✅ build.gradle.kts    # Конфигурация сборки
✅ docker-compose.yml  # Docker
✅ README.md           # Описание проекта
✅ .gitignore          # Список игнорируемых файлов
```

---

## 🔐 ВАЖНО: БЕЗОПАСНОСТЬ

### Никогда не загружай:
- ❌ Пароли и секретные ключи
- ❌ API ключи (Google, AWS, etc)
- ❌ JWT секреты
- ❌ Файлы .env с паролями

### Если случайно загрузил секрет:
1. Немедленно измени пароль/ключ
2. Удали из истории git:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch PATH_TO_FILE" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. Force push: `git push --force`

---

## 📊 СТАТУС КОММИТА

```
✅ Коммит сделан: 8150a4f
✅ Файлов: 96
✅ Строк кода: 15,323
✅ Сообщение: "Initial commit: NEXIS Platform v0.2.0-alpha"
```

---

## 🎯 СЛЕДУЮЩИЕ ШАГИ

1. [ ] Создать репозиторий на GitHub
2. [ ] Выполнить `git remote add origin ...`
3. [ ] Выполнить `git push -u origin main`
4. [ ] Добавить описание и теги
5. [ ] Добавить README preview изображение (опционально)

---

*Документ создан: 26.12.2025*

