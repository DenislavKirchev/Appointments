FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose port 3000 (or the port your application is running on)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
