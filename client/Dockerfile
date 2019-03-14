FROM node:alpine

WORKDIR /app

RUN npm -g install serve
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build