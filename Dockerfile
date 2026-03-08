FROM node:20

WORKDIR /app

RUN corepack enable \
  && apt-get update \
  && apt-get install -y git \
  && rm -rf /var/lib/apt/lists/*

# Install deps using package-lock for reproducibility
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy the rest of the source (no .git expected)
COPY . .

# Generate Prisma client if a schema exists; skip harmlessly otherwise
RUN npx prisma generate --schema=prisma/schema.prisma || echo "Skipping prisma generate (no schema found)"

EXPOSE 8080

CMD ["node", "scripts/dev-supervisor.js"]
