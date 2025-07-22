FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN rm -rf /usr/local/lib/node_modules/npm
WORKDIR /app

FROM base AS deps

COPY package.json lerna.json yarn.lock* ./
COPY ./packages/next-host/package.json ./packages/next-host/
COPY ./packages/server-common/package.json ./packages/server-common/
COPY ./packages/common/package.json ./packages/common/

RUN yarn install --frozen-lockfile

FROM base as builder

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/next-host/node_modules ./packages/next-host/node_modules
#node_modules 가 없음
#COPY --from=deps /app/packages/server-common/node_modules ./packages/server-common/node_modules

COPY package.json lerna.json yarn.lock* ./

COPY ./packages/next-host ./packages/next-host
COPY ./packages ./packages

RUN NODE_OPTIONS="--max-old-space-size=4096" yarn workspace @nextpr/next-host build

FROM base AS runner

#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/packages/next-host/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/next-host/.next/static ./packages/next-host/.next/static

COPY ./packages/next-host/start.sh ./packages/next-host/
#RUN chmod +x /app/packages/next-host/start.sh

CMD ["yarn", "workspace", "@nextpr/next-host", "run", "run"]
