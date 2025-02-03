
FROM node:18-slim


WORKDIR /app

COPY package*.json .


RUN npm install

RUN npm install -g typescript




COPY . .

RUN tsc

COPY src/presentation/grpc/user.proto ./dist/presentation/grpc/user.proto

RUN npm install pm2 -g



EXPOSE 4000
#GRPC Server
EXPOSE 40001 

ENV NODE_ENV=production


CMD ["pm2-runtime", "ecosystem.config.js"]
