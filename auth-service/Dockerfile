
FROM node:18-slim



WORKDIR /app

COPY package*.json .


RUN npm install

RUN npm install -g typescript




COPY . .

RUN tsc

COPY src/presentation/grpc/user.proto ./dist/presentation/grpc/user.proto

RUN npm install pm2 -g



EXPOSE 6000

ENV NODE_ENV=production


CMD ["pm2-runtime", "ecosystem.config.js"]
