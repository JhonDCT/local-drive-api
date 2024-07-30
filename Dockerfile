# Use an official Node.js image for the ARM architecture
FROM arm32v7/node:lts-alpine3.20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and bun.lockb files
COPY . .

# Install dependencies
RUN npm install

RUN npm run build

# Copy the rest of the application code
COPY dist/* .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "run", "main.js"]
