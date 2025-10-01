# syntax=docker/dockerfile:1

FROM node:lts-alpine AS builder
WORKDIR /src

# copiar dependencias e instalarlas
COPY package*.json ./
RUN npm ci

# copiar el resto del código
COPY . .

# imagen final
FROM node:lts-alpine AS release
WORKDIR /app
COPY --from=builder /src ./

EXPOSE 3000
CMD ["npm", "start"]
