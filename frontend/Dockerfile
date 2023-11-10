# syntax=docker/dockerfile:1

FROM node:20.9.0

WORKDIR .

COPY package.json package.json
RUN npm install -g serve

COPY . .

CMD [ "serve", "-s", "build"]