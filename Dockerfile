# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript code
RUN tsc

# Expose the port your application runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
