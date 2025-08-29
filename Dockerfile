# 1. Build stage
FROM node:18-alpine AS build

# Рабочая директория внутри контейнера
WORKDIR /app

# Сначала копируем package.json и lock-файл
COPY app/package*.json ./

# Установка зависимостей
RUN npm install

# Копируем весь код проекта
COPY app/ ./

# Сборка проекта Vite
RUN npm run build

# 2. Serve stage (Nginx)
FROM nginx:stable-alpine

# Копируем результат билда (dist) в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]