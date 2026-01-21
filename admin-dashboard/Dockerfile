FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY admin-dashboard/package*.json ./

# Install dependencies
RUN npm install

# Copy shared types (this happens at build time)
COPY shared/ ./shared/

# Copy admin-dashboard code
COPY admin-dashboard/ .

CMD ["npm", "run", "dev"]