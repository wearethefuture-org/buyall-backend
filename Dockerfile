FROM node:12

WORKDIR /

RUN apt-get -y update && apt-get -y install bash git curl python yarn nano

RUN npm i -g pm2

RUN yarn install

RUN ls -l

RUN pwd

RUN npm run db:migrate:dev && pm2 kill && pm2 start --env dev
