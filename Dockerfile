FROM node:12.18-alpine as base

# 1- Install Dockerize
RUN apk add --no-cache git openssl
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-alpine-linux-amd64-v0.6.1.tar.gz

# 2- Configure directory
RUN mkdir -p /app
RUN chown node:node /app
WORKDIR /app

USER node

FROM base as build

ARG NODE_ENV=development

# 3- Configure npm
ADD --chown=node:node .npmrc .

# 4- Install dependencies
ADD --chown=node:node package.json yarn.lock ./
ADD --chown=node:node package.json tsconfig.json ./
ADD --chown=node:node packages/api ./packages/api

RUN yarn install --frozen-lockfile --production=false

# 5- Build packages
WORKDIR /app/packages/api
RUN yarn
RUN yarn run build

# 6- Reinstall packages based on NODE_ENV
WORKDIR /app
RUN yarn install --frozen-lockfile
RUN rm .npmrc
EXPOSE 5000
EXPOSE 1025
EXPOSE 8025

FROM base as api

ARG NODE_ENV=development
ARG RELEASE

# 7- Default environment variables
ENV NODE_ENV "${NODE_ENV}"
ENV APP__RELEASE "${RELEASE}"

# 8- Copy dependencies & compiled source
COPY --from=build --chown=node:node /app ./

# 9- Configure entrypoint
RUN chmod +x /app/packages/api/docker-entrypoint.sh
ENTRYPOINT [ "sh", "/app/packages/api/docker-entrypoint.sh" ]

WORKDIR /app/packages/api

CMD [ "yarn", "run", "start" ]
