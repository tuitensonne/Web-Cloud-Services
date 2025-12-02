# -----------------------------
# 1. BUILD STAGE
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

COPY . .

RUN npm run build

# -----------------------------
# 2. RUN STAGE
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# Copy prisma schema and generate client in runner stage
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

# Copy build artifacts
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]