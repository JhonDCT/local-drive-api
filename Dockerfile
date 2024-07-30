FROM arm32v7/node:lts-alpine3.20 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM arm32v7/node:lts-alpine3.20
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "dist/main.js"]
