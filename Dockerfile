FROM node:latest as BUILD

RUN mkdir /app
COPY src/ /app/
COPY package.json /app/
COPY yarn.lock /app/

WORKDIR /app
RUN yarn install

FROM node:alpine

RUN apk add --no-cache tini
ENTRYPOINT ["tini", "--"]

COPY --from=BUILD /app /app

WORKDIR /app
CMD ["node", "server.js"]
