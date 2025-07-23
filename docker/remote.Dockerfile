FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN rm -rf /usr/local/lib/node_modules/npm
WORKDIR /app

FROM base AS deps

COPY package.json lerna.json yarn.lock* ./
COPY ./packages/test-table/package.json ./packages/test-table/
COPY ./packages/server-common/package.json ./packages/server-common/
COPY ./packages/common/package.json ./packages/common/

RUN yarn install --frozen-lockfile

FROM base as builder

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/test-table/node_modules ./packages/test-table/node_modules
#node_modules 가 없음
#COPY --from=deps /app/packages/server-common/node_modules ./packages/server-common/node_modules

COPY package.json lerna.json yarn.lock* ./

COPY ./packages/test-table ./packages/test-table
COPY ./packages ./packages

RUN NODE_OPTIONS="--max-old-space-size=4096" yarn workspace @nextpr/test-table build

FROM base AS runner

#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/packages/test-table/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/test-table/.next/static ./packages/test-table/.next/static

COPY ./packages/test-table/start.sh ./packages/test-table/
#RUN chmod +x /app/packages/test-table/start.sh

CMD ["yarn", "workspace", "@nextpr/test-table", "run", "run"]
