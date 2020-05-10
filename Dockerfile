FROM node:alpine3.11

# set working directory
WORKDIR /app

# in case you want to get in the container using bash for debugging
# uncomment the following line, and rebuid the image to install bash
# RUN apk update && apk add bash

# install server dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

# add code
WORKDIR /app
COPY . ./

# server runs on port 5000
EXPOSE 5000

# start client app
CMD ["npm", "run", "server"]