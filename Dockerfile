FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -g 1001 -S kubescope && adduser -S kubescope -u 1001 -G kubescope

COPY --from=build /app/public ./public
COPY --from=build --chown=kubescope:kubescope /app/.next/standalone ./
COPY --from=build --chown=kubescope:kubescope /app/.next/static ./.next/static

USER kubescope
EXPOSE 3000
CMD ["node", "server.js"]
