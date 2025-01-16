
FROM node:18-slim

WORKDIR /app

COPY package*.json .


RUN npm install

RUN npm install -g typescript




COPY . .

RUN tsc


RUN npm install pm2 -g


EXPOSE 7000


CMD ["pm2-runtime", "ecosystem.config.js"]
