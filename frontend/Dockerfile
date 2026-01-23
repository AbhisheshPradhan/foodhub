FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy shared types (this happens at build time)
COPY shared/ ./shared/

# Copy frontend code
COPY frontend/ .

CMD ["npm", "run", "dev"]