FROM node:22

WORKDIR /app

COPY windows.js .

CMD ["node", "windows.js"]