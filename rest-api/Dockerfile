FROM node:14.17.0

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .


EXPOSE 3000


CMD ["node", "src/index.js"]
