FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ARG VITE_BACKEND_PORT
ENV VITE_BACKEND_PORT=5173

EXPOSE 5173

CMD ["npm", "run", "dev"]