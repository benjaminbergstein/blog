FROM node:latest

WORKDIR /app

ADD package.json /app

RUN yarn

ADD . /app

RUN yarn build

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["serve", "-H", "0.0.0.0"]
