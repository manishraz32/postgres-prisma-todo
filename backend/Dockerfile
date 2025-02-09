# Use a specific Alpine version that supports openssl1.1-compat
FROM node:18-alpine3.17

# Set the working directory
WORKDIR /app

# Install OpenSSL 1.1 compatibility package
RUN apk add --no-cache openssl1.1-compat

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# ✅ Generate Prisma client
RUN npx prisma generate 

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
