FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npx knex migrate:latest && npx knex seed:run && npm run dev
