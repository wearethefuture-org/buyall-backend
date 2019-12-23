FROM node:12

RUN mkdir -p /usr/src/app
WORKDIR /user/src/app

COPY package.json ./
RUN npm install
RUN npm install -g sequelize-cli
COPY . .
CMD ["npm", "start"]
