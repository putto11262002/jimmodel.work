FROM node:14 as dev
WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin $PATH
ARG REACT_APP_API_END_POINT
ENV REACT_APP_API_END_POINT $REACT_APP_API_END_POINT
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
EXPOSE 3000
COPY . ./

FROM node:14 as prod
WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin $PATH
ARG REACT_APP_API_END_POINT
ENV REACT_APP_API_END_POINT $REACT_APP_API_END_POINT
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build