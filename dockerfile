# -----------------------------
# 1. BUILD STAGE
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (caching)
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client (không cần DATABASE_URL)
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Build NestJS (ts -> js)
RUN npm run build

# -----------------------------
# 2. RUN STAGE
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only production files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built app and Prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "dist/main.js"]
