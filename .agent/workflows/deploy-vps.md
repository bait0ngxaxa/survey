---
description: Deploy survey app to VPS with Docker Compose (DB) + PM2 + Nginx + Certbot
---

# 📦 VPS Deployment Guide

## Stack Overview

-   **Database**: PostgreSQL via Docker Compose
-   **Application**: Next.js via PM2
-   **Reverse Proxy**: Nginx
-   **SSL**: Certbot (Let's Encrypt)

---

## Phase 1: VPS Initial Setup

### 1.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw
```

### 1.2 Install Docker & Docker Compose

```bash
# Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Docker Compose Plugin
sudo apt install -y docker-compose-plugin

# Verify
docker --version
docker compose version
```

### 1.3 Install Node.js 20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

### 1.4 Install PM2

```bash
sudo npm install -g pm2
pm2 --version
```

### 1.5 Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
```

### 1.6 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

## Phase 2: Configure Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
sudo ufw status
```

---

## Phase 3: Clone Project

```bash
# Create web directory
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www

# Clone repository
cd /var/www
git clone <YOUR_REPOSITORY_URL> survey
cd survey
```

---

## Phase 4: Configure Environment Variables

### 4.1 Create Production .env file

```bash
nano .env
```

**Add the following content:**

```env
# ===== PostgreSQL (Docker) =====
POSTGRES_USER=survey_user
POSTGRES_PASSWORD=YOUR_SECURE_PASSWORD_HERE
POSTGRES_DB=survey

# ===== Database Connection =====
DATABASE_URL=postgresql://survey_user:YOUR_SECURE_PASSWORD_HERE@localhost:5432/survey

# ===== Clerk Authentication =====
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# ===== Application =====
NODE_ENV=production
```

> ⚠️ **IMPORTANT**: Replace `YOUR_SECURE_PASSWORD_HERE` with a strong password (use `openssl rand -base64 32` to generate)

---

## Phase 5: Start PostgreSQL with Docker Compose

### 5.1 The docker-compose.yml already exists, just run:

```bash
cd /var/www/survey
docker compose up -d

# Verify database is running
docker compose ps
docker compose logs db
```

### 5.2 Test Database Connection

```bash
docker exec -it survey-db-1 psql -U survey_user -d survey -c "SELECT 1;"
```

---

## Phase 6: Build & Run Next.js with PM2

### 6.1 Install Dependencies

```bash
cd /var/www/survey
npm ci
```

### 6.2 Generate Prisma Client & Migrate

```bash
npx prisma generate
npx prisma migrate deploy
```

### 6.3 Build Production

```bash
npm run build
```

### 6.4 Create PM2 Ecosystem Config

```bash
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'survey-app',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/survey',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    max_memory_restart: '500M',
    error_file: '/var/log/pm2/survey-error.log',
    out_file: '/var/log/pm2/survey-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    watch: false,
    autorestart: true
  }]
};
EOF
```

### 6.5 Create Log Directory & Start PM2

```bash
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

pm2 start ecosystem.config.js
pm2 save
```

### 6.6 Setup PM2 Auto-start on Boot

```bash
pm2 startup
# Copy and run the command that PM2 outputs
# Example: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

### 6.7 Verify Application

```bash
pm2 status
pm2 logs survey-app --lines 20
curl http://localhost:3000
```

---

## Phase 7: Configure Nginx Reverse Proxy

### 7.1 Create Nginx Site Config

```bash
sudo nano /etc/nginx/sites-available/survey
```

**Add the following content (replace `your-domain.com`):**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Limits
    client_max_body_size 10M;
}
```

### 7.2 Enable Site & Test

```bash
# Enable site
sudo ln -sf /etc/nginx/sites-available/survey /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Phase 8: Setup SSL with Certbot

### 8.1 Obtain SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 8.2 Verify Auto-Renewal

```bash
sudo certbot renew --dry-run
```

### 8.3 Setup Auto-Renewal Cron (Optional - Certbot usually auto-adds this)

```bash
sudo crontab -e
# Add line:
0 0,12 * * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
```

---

## Phase 9: Verify Deployment

```bash
# Check all services
pm2 status
docker compose ps
sudo systemctl status nginx

# Check logs if needed
pm2 logs survey-app
docker compose logs db
sudo tail -f /var/log/nginx/access.log
```

---

## 🔄 Common Operations

### Update Application

```bash
cd /var/www/survey
git pull
npm ci
npx prisma migrate deploy
npm run build
pm2 reload survey-app
```

### Restart Services

```bash
# Application
pm2 restart survey-app

# Database
docker compose restart db

# Nginx
sudo systemctl restart nginx
```

### View Logs

```bash
# Application logs
pm2 logs survey-app

# Database logs
docker compose logs -f db

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Database Backup

```bash
docker exec survey-db-1 pg_dump -U survey_user survey > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Database Restore

```bash
cat backup_file.sql | docker exec -i survey-db-1 psql -U survey_user -d survey
```

---

## 📁 File Structure on VPS

```
/var/www/survey/
├── .env                    # Production environment variables
├── ecosystem.config.js     # PM2 configuration
├── docker-compose.yml      # PostgreSQL container config
├── .next/                  # Next.js build output
├── node_modules/
├── prisma/
└── ...

/etc/nginx/sites-available/survey   # Nginx config
/var/log/pm2/                       # PM2 logs
```

---

## 🚨 Troubleshooting

### Port 3000 already in use

```bash
pm2 kill
pm2 start ecosystem.config.js
```

### Database connection failed

```bash
docker compose ps
docker compose logs db
docker compose restart db
```

### SSL not working

```bash
sudo certbot --nginx -d your-domain.com --dry-run
sudo nginx -t
sudo systemctl reload nginx
```

### Check disk space

```bash
df -h
docker system prune -a  # Remove unused Docker data
pm2 flush               # Clear PM2 logs
```
