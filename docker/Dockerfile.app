# Base image
FROM node:latest AS base
WORKDIR /app

# Development image
FROM base AS development

ADD package.json /app

RUN yarn

ADD . /app

RUN yarn build

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["serve", "-H", "0.0.0.0"]

# Production image, meant to be lean
FROM joseluisq/static-web-server AS production

WORKDIR /app
COPY --from=development /app/public /app/public
