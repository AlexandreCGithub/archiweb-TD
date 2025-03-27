# Étape 1 : Build de l'application
FROM oven/bun:alpine AS builder
WORKDIR /app
# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json bun.lock vite.config.ts \
    .npmrc .prettierignore .prettierrc \
    eslint.config.js svelte.config.js \
    tsconfig.json vitest-setup-client.ts ./

COPY src ./src

RUN bun install

# Compiler l’application
RUN bun run build

# Étape 2 : Run de l'application
FROM node:alpine
WORKDIR /app

ARG VITE_COMMIT_NUMBER
ENV PUBLIC_VITE_COMMIT_NUMBER=${VITE_COMMIT_NUMBER}

# Définition des variables d'environnement
ENV HOST 0.0.0.0
ENV PORT 80
ENV ORIGIN https://chi.cours.quimerch.com
# Copy only the necessary files from the builder image to the final image
RUN npm install --os=linux --libc=musl --cpu=x64 sharp
COPY --from=builder /app/build ./build
EXPOSE 80

# Lancer l'application avec Bun
ENTRYPOINT ["node", "./build"]