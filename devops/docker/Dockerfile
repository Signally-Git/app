FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY src ./src


RUN yarn install


EXPOSE 3000

CMD [ "yarn", "start" ]
