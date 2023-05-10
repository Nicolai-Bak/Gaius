FROM node:19-alpine3.17 AS base

EXPOSE 3005
WORKDIR /app

RUN npm install --global pnpm

COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY src ./src
COPY *config* .

FROM base as build
WORKDIR /app
COPY --from=base /app .
COPY index.html .
RUN pnpm build

FROM nginx:1.23.3-alpine as prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
