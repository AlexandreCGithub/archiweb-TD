FROM oven/bun:canary-alpine

COPY package.json ./
COPY bun.lockb ./
COPY src ./

RUN bun install
COPY . .
RUN bun run build
EXPOSE 3000
ENTRYPOINT ["bun", "./build"]   