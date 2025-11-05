# Setup Let's Encrypt Domain (No File Sharing Required)

## Quick Setup - Free Domain with DuckDNS

### Step 1: Get Free Domain (2 minutes)

1. Go to: https://www.duckdns.org/
2. Sign in with Google/GitHub (free)
3. Create a subdomain: e.g., `restaurant-webpage`
4. Your domain will be: `restaurant-webpage.duckdns.org`
5. Get your token from DuckDNS dashboard

### Step 2: Point Domain to Your IP

1. Get your public IP:
   ```powershell
   Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing | Select-Object -ExpandProperty Content
   ```

2. Update DuckDNS:
   - Go to DuckDNS dashboard
   - Enter your public IP
   - Click "Update IP"

### Step 3: Configure Router Port Forwarding

1. Open router admin panel (usually 192.168.1.1)
2. Port Forwarding:
   - Port 80 → Your computer's IP (192.168.1.6)
   - Port 443 → Your computer's IP (192.168.1.6)
3. Save settings

### Step 4: Update Configuration Files

1. **Edit `docker-compose-certbot.yml`:**
   - Replace `your-email@example.com` with your email
   - Replace `yourdomain.duckdns.org` with your DuckDNS domain

2. **Edit `nginx-letsencrypt.conf`:**
   - Replace `yourdomain.duckdns.org` with your DuckDNS domain

3. **Get Let's Encrypt certificate:**
   ```powershell
   docker-compose -f docker-compose-certbot.yml run --rm certbot
   ```

### Step 5: Update Dockerfile to Use Let's Encrypt Certificates

The certificates will be mounted from host, so update deployment to use the domain.

## Alternative: Use Existing Domain

If you already have a domain:
1. Add A record: `yourdomain.com` → Your public IP
2. Add A record: `www.yourdomain.com` → Your public IP
3. Follow steps 3-5 above

## Result

After setup:
- ✅ `https://yourdomain.duckdns.org` works (no certificate sharing needed)
- ✅ Browsers trust it automatically (Let's Encrypt is trusted by all browsers)
- ✅ Works on all devices (no file installation)
- ✅ Auto-renewal (certificates renew automatically)

## Update Jenkinsfile

After domain is set up, update Jenkinsfile to use the domain instead of IP:
- Change `https://192.168.1.6:18038` to `https://yourdomain.duckdns.org`

