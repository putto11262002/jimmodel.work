FROM node:14
WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
EXPOSE 3000
COPY . ./
