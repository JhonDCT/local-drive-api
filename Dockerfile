# Use an official Node.js image for the ARM architecture
FROM arm32v7/node:lts-alpine3.20

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Ensure Bun is in the PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Copy package.json and bun.lockb files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN bun install

RUN bun run build

# Copy the rest of the application code
COPY dist/* .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["bun", "run", "main.js"]
