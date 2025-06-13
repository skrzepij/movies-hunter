# Multi-stage build for optimal production image size
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Set environment variables for build
ENV VITE_TMDB_API_KEY=dae701f4a1f4b9d112b79a05217fe6ce
ENV VITE_TMDB_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU3MDFmNGExZjRiOWQxMTJiNzlhMDUyMTdmZTZjZSIsIm5iZiI6MTY1NjQwOTU2OC43OTcsInN1YiI6IjYyYmFjZGUwMzU2YTcxMDA2MWRjMzEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0rUJMQIw6z6BZxTgECEXY9hBHj1R-WhZPFviE_a-eE4

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
