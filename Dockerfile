FROM node:alpine3.11

# set working directory
WORKDIR /app

# in case you want to get in the container using bash for debugging
# uncomment the following line, and rebuid the image to install bash
RUN apk update && apk add bash

# install server dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# install client dependencies
WORKDIR /app/client
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm install

RUN npm install react-scripts@latest

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/client/node_modules/.bin:$PATH

# add code
WORKDIR /app
COPY . ./
RUN ["chmod", "+x", "run.sh"]

# speech-to-text
ENV GOOGLE_APPLICATION_CREDENTIALS "/app/project2-276903-9e1a3036d74e.json"

# client runs on port 3000
EXPOSE 3000
# server runs on port 5000
EXPOSE 5000

# run speech-to-text server, expense-tracker server & client
ENTRYPOINT ["/app/run.sh"]