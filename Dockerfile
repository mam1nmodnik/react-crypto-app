# 1. Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY app/package*.json ./
RUN npm install
COPY app/ ./
RUN npm run build

# 2. Serve stage
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]