FROM node:20-alpine 

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy shared types (this happens at build time)
COPY shared/ ./shared/

# Copy backend code
COPY backend/ .

# Generate Prisma client
RUN npx prisma generate

CMD ["npm", "run", "dev"]