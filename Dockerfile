# FROM node:22

# WORKDIR /app

# COPY windows.js .

# CMD ["node", "windows.js"]

FROM node:22

WORKDIR /app

COPY package.json .

RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["npm", "run", "start"]