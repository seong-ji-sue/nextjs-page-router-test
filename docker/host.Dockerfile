FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN rm -rf /usr/local/lib/node_modules/npm
WORKDIR /app

FROM base AS deps

COPY package.json lerna.json yarn.lock* ./
COPY ./packages/front/package.json ./packages/front/
COPY ./packages/server-common/package.json ./packages/server-common/
COPY ./packages/common/package.json ./packages/common/

RUN yarn install --frozen-lockfile

FROM base as builder

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/front/node_modules ./packages/front/node_modules
#node_modules 가 없음
#COPY --from=deps /app/packages/server-common/node_modules ./packages/server-common/node_modules

COPY package.json lerna.json yarn.lock* ./

COPY ./packages/front ./packages/front
COPY ./packages ./packages

RUN NODE_OPTIONS="--max-old-space-size=4096" yarn workspace @nextpr/front build

FROM base AS runner

#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/packages/front/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/front/.next/static ./packages/front/.next/static

COPY ./packages/front/start.sh ./packages/front/
#RUN chmod +x /app/packages/front/start.sh

CMD ["yarn", "workspace", "@nextpr/front", "run", "run"]
