# Use Node.js 18 on Debian Bullseye (slim)
FROM node:18-bullseye-slim

# Install OpenJDK 17 (or 11)
RUN apt-get update && \
    apt-get install -y default-jdk && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Verify Java installation
RUN java -version && javac -version

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8080

# Start the service
CMD ["npm", "start"]
