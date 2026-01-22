FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY app/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy shared types (this happens at build time)
COPY shared/ ./shared/

# Copy admin-dashboard code
COPY app/ .

CMD ["npm", "run", "dev"]