
FROM node:18-slim



WORKDIR /app

COPY package*.json /app/


RUN npm install

RUN npm install -g typescript




COPY . /app/

RUN tsc

RUN npm install pm2 -g







CMD ["pm2-runtime", "ecosystem.config.js"]