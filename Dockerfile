# ============
# BUILD STAGE
# ============
FROM node:16 as build
WORKDIR /build

# Install requirements
COPY LICENSE /build/
COPY package.json /build/
COPY package-lock.json /build/
RUN npm run setup

# Build source code
COPY tsconfig.json /build/
COPY . /build/
RUN npm run build

# ==========
# RUN STAGE
# ==========
FROM node:16 as run
WORKDIR /app

# Install requirements
COPY LICENSE /app/
COPY package.json /app/
COPY package-lock.json /app/
RUN npm run setup:prod

# Copy source code
COPY --from=build /build/build /app/build/

# Define environment variables
ENV NODE_ENV=production
ENV TS_NODE_BASEURL=/app/build

# Start the service
EXPOSE 3003
CMD [ "npm", "start" ]
