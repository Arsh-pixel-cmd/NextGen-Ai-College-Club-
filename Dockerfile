# ---------- Stage 1: Build the Vite React App ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies first for caching
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy rest of the app
COPY . .

# Build the app for production
RUN npm run build


# ---------- Stage 2: Run Nginx server ----------
FROM nginx:alpine

# Copy built files to Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: add a simple nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $$uri $$uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
