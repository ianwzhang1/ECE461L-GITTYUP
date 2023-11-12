# syntax=docker/dockerfile:1

FROM node:20.9.0

WORKDIR .

COPY . .
RUN yarn install
RUN npm run build
RUN npm install -g serve

CMD [ "serve", "-s", "build"]
