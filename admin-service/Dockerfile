
FROM node:18-slim


WORKDIR /app


COPY package*.json ./


RUN npm install

RUN npm install -g typescript




COPY . .

RUN tsc




CMD ["node", "dist/server.js"]
