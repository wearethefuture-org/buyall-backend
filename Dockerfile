FROM node:10

RUN apt-get -y update && apt-get -y install bash git curl python yarn nano

RUN npm i -g pm2

RUN ls -l

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn install

RUN pwd

# RUN npm run db:migrate:dev && pm2 kill && pm2 start --env dev
COPY . .
CMD [ "npm", "dev" ]
# RUN pm2 kill && pm2 start --env dev
