FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD [ "node", "server/server.js" ]

EXPOSE 3002