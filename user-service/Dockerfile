
FROM node:18-slim


WORKDIR /app


COPY package*.json ./


RUN npm install

RUN npm install -g typescript




COPY . .

RUN tsc



EXPOSE 4000
#GRPC Server
EXPOSE 40001 


CMD ["node", "dist/server.js"]
