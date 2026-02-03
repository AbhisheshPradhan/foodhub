FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies only if package.json changes
RUN npm ci --prefer-offline --no-audit

# Copy shared types
COPY shared/ ./shared/

# Copy frontend code
COPY frontend/ .

# Pre-create .next directory with correct permissions
RUN mkdir -p .next && chown -R node:node .next

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["npm", "run", "dev"]