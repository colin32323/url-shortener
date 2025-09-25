# Use Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose React dev server port
EXPOSE 3030

# Start React dev server
CMD ["npm", "run", "dev"]
