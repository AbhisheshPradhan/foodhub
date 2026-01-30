FROM node:20-alpine 

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/prisma ./prisma/

COPY shared/ ./shared/

COPY backend/ .

CMD ["npm", "run", "dev"]