
FROM node:18-slim

WORKDIR /app

COPY package*.json .


RUN npm install

RUN npm install -g typescript




COPY . .

RUN tsc


RUN npm install pm2 -g


EXPOSE 3000


ENV NODE_ENV=production


CMD ["pm2-runtime", "ecosystem.config.js"]
