# ===== Ejemplo 1 =====
# FROM node:22

# WORKDIR /app

# COPY windows.js .

# CMD ["node", "windows.js"]

# ===== Ejemplo 2 =====
FROM gcc:14

WORKDIR /app

COPY main.c .

RUN gcc main.c -o programa

CMD ["./programa"]

# ===== Ejemplo 3 =====
# FROM node:22

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY server.js .

# EXPOSE 3000

# CMD ["npm", "run", "start"]