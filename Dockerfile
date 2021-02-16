FROM node:15.8.0-alpine3.10 as build
# Install python for node-sass
RUN apk add git g++ gcc libgcc libstdc++ linux-headers make python
# Install npm packges
COPY package.json ./
COPY package-lock.json ./
RUN npm install --loglevel=verbose --only=production
# Build server (tsc) and client (webpack)
COPY ./src ./src
COPY ./tsconfig ./tsconfig
COPY ./webpack ./webpack
COPY ./.env-cmdrc.json ./
RUN npm run build

# Copy build output and packages over to release container
FROM node:15.8.0-alpine3.10 as release
COPY --from=build /build /build
COPY --from=build /node_modules /node_modules

# Set CMD to start the server
CMD ["node", "/build/src/server/app.js"]