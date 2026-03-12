FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/client
RUN npm install && npm run build

WORKDIR /app

EXPOSE 5000

CMD ["node", "server/index.js"]
