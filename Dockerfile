# ============
# BUILD STAGE
# ============
FROM node:16.15 as build
WORKDIR /app

# Install requirements
COPY package*.json /app/
RUN npm run setup
RUN npm run setup:modules

# Build source code
COPY . /app/
RUN npm run build

# ==========
# RUN STAGE
# ==========
FROM node:16.15 as run
WORKDIR /app

# Install requirements
COPY package*.json /app/
RUN npm run setup:prod

# Build source code
COPY LICENSE /app/
COPY tsconfig.json /app/
COPY --from=build /app/build /app/build/

# Define environment variables
ENV NODE_ENV=production
ENV TS_NODE_BASEURL=./build

# Start the service
EXPOSE 3002
CMD [ "npm", "start" ]
