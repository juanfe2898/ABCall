FROM node:14.17.0

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .


EXPOSE 3004


CMD ["node", "smart_contract\smart_contract.js"]
