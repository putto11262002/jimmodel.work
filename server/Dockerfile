FROM node:14-alpine3.10 as prod
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN mkdir -p /usr/app/public && mkdir -p /usr/app/public/model-profiles && mkdir -p /usr/app/publuc/model-profiles



FROM node:14-alpine3.10 as dev
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./

RUN mkdir -p /usr/app/public && mkdir -p /usr/app/public/model-profiles && mkdir -p /usr/app/publuc/model-profiles