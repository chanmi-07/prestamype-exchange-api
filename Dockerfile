# Build stage
FROM node:24-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install project dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Compile the application (if applicable)
RUN pnpm run build

# Production stage
FROM node:24-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies using pnpm
RUN pnpm install --prod

# Copy the compiled application code from the build stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the application port (if applicable)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]