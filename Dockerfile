FROM node:20-alpine

# Install native dependencies required by Prisma engine on Alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Push DB schema, generate Zod schemas, compile TypeScript, then start watch mode
CMD npx prisma db push && npx prisma generate && npm run build && npm run start:dev
