FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

RUN npm install

COPY . .

# Expose port 3000 for the React development server
EXPOSE 3000

# Run the development server
CMD ["npm", "start"]
