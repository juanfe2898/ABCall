FROM node:18.20.0

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .


EXPOSE 9092


CMD ["node", "src/index.js"]
