FROM node:19-alpine3.17 AS base

EXPOSE 4005
WORKDIR /app

RUN npm install --global pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY src ./src
COPY *config* .

RUN npx prisma generate

FROM base as build
WORKDIR /app
COPY --from=base /app .
COPY index.html .
RUN pnpm build
