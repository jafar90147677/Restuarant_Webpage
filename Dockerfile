# Multi-stage build for restaurant webpage
FROM nginx:alpine AS production

# Metadata
LABEL maintainer="jafar2001"
LABEL description="Restaurant Webpage - Eat Well😋"
LABEL version="1.0"

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy website files
COPY index.html .
COPY styles.css .
COPY script.js .
COPY logger.js .
COPY log_viewer.html .
COPY test_fixes.html .
COPY test_transaction_ids.html .
COPY a.a.s.surya_qr.png .
COPY project_log.txt .

# Copy SSL certificates
COPY ssl/ /etc/nginx/ssl/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create health check file
RUN echo "healthy" > /usr/share/nginx/html/health

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html && \
    chmod 600 /etc/nginx/ssl/*.key && \
    chmod 644 /etc/nginx/ssl/*.crt && \
    chown -R nginx:nginx /usr/share/nginx/html

# Expose ports 80 (HTTP redirect) and 443 (HTTPS)
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s \
            --timeout=3s \
            --start-period=5s \
            --retries=3 \
            CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

