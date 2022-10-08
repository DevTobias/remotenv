#! Create base node image and install runtime environment
FROM node:18 AS base
RUN apt-get update && apt-get install curl bash && curl -sf https://gobinaries.com/tj/node-prune | sh

#! Install dependencies
FROM base AS builder
WORKDIR /build

# Copy all workspace packages
COPY yarn.lock ./
COPY package.json ./
COPY app/package.json ./app/
COPY backend/package.json ./backend/
COPY modules/remotenv-eslint/package.json ./modules/remotenv-eslint/
COPY modules/remotenv-prettier/package.json ./modules/remotenv-prettier/

# Install all dependencies
RUN yarn install --frozen-lockfile

#! Build the frontend / server

# Build frontend
WORKDIR /build/app
COPY app/tsconfig.json app/tailwind.config.cjs app/astro.config.mjs ./
COPY app/public/ ./public/
COPY app/src/ ./src
ENV NODE_ENV=production
RUN yarn build

# Build backend
WORKDIR /build/backend
COPY backend/tsconfig.json backend/tsconfig.build.json ./
COPY backend/src/ ./src
COPY backend/prisma/schema.prisma ./prisma/schema.prisma
ENV NODE_ENV=production
RUN yarn prisma generate
RUN yarn build

WORKDIR /build

#! Clean node module folder for production
RUN npm prune --production --no-audit
RUN node-prune

#! Copy and and start build outputs
FROM node:18
WORKDIR /api

RUN npm install pm2 -g

COPY --from=builder /build/node_modules ./node_modules/
COPY --from=builder /build/app/dist ./app/
COPY --from=builder /build/backend/dist ./backend/

EXPOSE 3000
CMD [ "pm2-runtime", "-n", "app", "-i", "2", "backend/main.js"]
