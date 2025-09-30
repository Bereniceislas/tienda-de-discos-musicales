# Tienda de Discos Musicales - Contenerización con Docker

## Descripción
Aplicación web Node.js + Express que implementa autenticación JWT y OAuth con Google, contenerizada usando Docker y Docker Compose.

## Archivos principales
- Dockerfile
- docker-compose.yml
- .env.example

## Ejecución
1. Colocar variables reales en `.env`
2. Construir imagen:
   docker compose build
3. Levantar contenedor:
   docker compose up -d
4. Acceder a la app:
   http://localhost:5500

## Pruebas
- Registro/login JWT: POST `/api/auth/register` y `/api/auth/login`
- Login con Google OAuth: GET `/auth/google`
