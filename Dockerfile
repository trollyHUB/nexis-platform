# ========================================
# NEXIS BACKEND - DOCKERFILE
# ========================================
# Multi-stage build для оптимизации размера
# ========================================

# Stage 1: Build
FROM gradle:8.14-jdk21-alpine AS builder

WORKDIR /app

# Копируем файлы для кэширования зависимостей
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle

# Загружаем зависимости (кэшируется)
RUN gradle dependencies --no-daemon || true

# Копируем исходный код
COPY src ./src

# Собираем JAR
RUN gradle bootJar --no-daemon -x test

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Установка curl для healthcheck
RUN apk add --no-cache curl

# Копируем JAR из builder
COPY --from=builder /app/build/libs/*.jar app.jar

# Создаем пользователя для безопасности
RUN addgroup -g 1001 nexis && \
    adduser -u 1001 -G nexis -D nexis

USER nexis

# Expose порт
EXPOSE 8082

# Запуск приложения
ENTRYPOINT ["java", "-jar", "app.jar"]

