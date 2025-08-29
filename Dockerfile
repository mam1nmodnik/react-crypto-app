# 1. Этап сборки (build stage)
FROM node:18-alpine AS build

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY app/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники
COPY app/ ./

# Сборка production версии
RUN npm run build


# 2. Этап запуска (serve stage)
FROM nginx:stable-alpine

# Копируем собранный билд в папку Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Конфиг nginx (по желанию)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]