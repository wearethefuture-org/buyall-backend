FROM node:10

WORKDIR /usr/src/app

RUN ls -l

COPY package*.json ./

RUN apt-get -y update && apt-get -y install bash git curl python yarn nano

RUN npm i -g pm2

RUN ls -l

COPY . .

RUN yarn install

RUN pwd

RUN npm run db:migrate:dev && pm2 kill && pm2 start --env dev
