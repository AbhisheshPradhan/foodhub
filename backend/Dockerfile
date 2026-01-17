FROM node:20-alpine 

WORKDIR /app

# 1. Copy package files first
COPY backend/package*.json ./

# 2. Install dependencies (cached if package.json unchanged)
RUN npm install

# 3. Copy prisma schema
COPY backend/prisma ./prisma/

# 4. Generate Prisma Client
RUN npx prisma generate

# 5. Copy shared types
COPY shared/ ./shared/

# 6. Copy rest of backend code (changes most frequently)
COPY backend/ .

CMD ["npm", "run", "dev"]