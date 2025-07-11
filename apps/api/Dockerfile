FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy only the root and API package files
COPY ../../package*.json ./
COPY ../../yarn.lock ./
COPY ../../turbo.json ./
COPY package.json ./apps/api/package.json

# Copy only the shared packages needed by the API
COPY ../../packages/database/ ./packages/database/
COPY ../../packages/config/ ./packages/config/

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Build stage
FROM base AS builder
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/yarn.lock ./
COPY --from=deps /app/turbo.json ./
COPY ../../packages/database/ ./packages/database/
COPY ../../packages/config/ ./packages/config/
COPY ../../apps/api ./apps/api

# Generate Prisma client
RUN npx prisma generate --schema=./packages/database/prisma/schema.prisma

# Build the API only
WORKDIR /app/apps/api
RUN yarn install
RUN yarn build

# Production stage
FROM base AS runner
RUN apk add --no-cache libc6-compat openssl dumb-init

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder --chown=nodejs:nodejs /app/apps/api/build ./build
COPY --from=builder --chown=nodejs:nodejs /app/apps/api/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nodejs:nodejs /app/packages/database/prisma ./prisma

USER nodejs

EXPOSE 8080
ENV PORT=8080

HEALTHCHECK --interval=300s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "build/index.js"]