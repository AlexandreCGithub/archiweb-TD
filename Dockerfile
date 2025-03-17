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

# Définition des variables d'environnement
ENV HOST=0.0.0.0 PORT=80
ENV ORIGIN=*
ENV PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host
# Copy only the necessary files from the builder image to the final image
COPY --from=builder /app/build ./build
EXPOSE 80

# Lancer l'application avec Bun
ENTRYPOINT ["bun", "./build"]