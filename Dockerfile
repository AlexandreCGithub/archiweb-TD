# Étape 1 : Build de l'application
FROM oven/bun:alpine AS builder
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copier le reste des fichiers pour la compilation
COPY src ./src
COPY . . 

# Compiler l’application
RUN bun run build

# Étape 2 : Run de l'application
FROM oven/bun:alpine
WORKDIR /app

# Copy only the necessary files from the builder image to the final image
COPY --from=builder /app/build ./build
EXPOSE 80

# Lancer l'application avec Bun
ENV HOST=0.0.0.0
ENV PORT=80
ENTRYPOINT ["/bin/sh", "-c", "echo HOST=$HOST PORT=$PORT && bun ./build"]