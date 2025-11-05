# Quick Setup - HTTPS Without File Sharing

## Problem
`https://192.168.1.6:18038` doesn't work because browsers don't trust certificates for IP addresses.

## Solution: Use Free Domain (5 minutes)

### Step 1: Get Free Domain (2 minutes)

1. Go to: https://www.duckdns.org/
2. Sign in with Google/GitHub
3. Create subdomain (e.g., `restaurant-webpage`)
4. Your domain: `restaurant-webpage.duckdns.org`
5. Get your token

### Step 2: Update DuckDNS (30 seconds)

1. Go to DuckDNS dashboard
2. Enter your public IP: `106.215.173.139`
3. Click "Update IP"

### Step 3: Port Forwarding (2 minutes)

1. Open router: `http://192.168.1.1`
2. Port Forwarding:
   - **External Port 80** → **Internal 192.168.1.6:80**
   - **External Port 443** → **Internal 192.168.1.6:443**
3. Save

### Step 4: Update Caddyfile (30 seconds)

1. Open `Caddyfile`
2. Replace `YOUR_DOMAIN.duckdns.org` with your actual domain
3. Save

### Step 5: Start Proxy (1 minute)

```powershell
docker-compose -f docker-compose-https-proxy.yml up -d
```

Caddy automatically gets Let's Encrypt certificate!

## Share This Link

Instead of IP, share:
```
https://restaurant-webpage.duckdns.org
```

✅ Works on all devices  
✅ No certificate installation  
✅ Trusted by all browsers  
✅ Auto-renewal

## Keep Using IP? 

After setup, you can also access via:
- `https://192.168.1.6:443` (if configured in Caddyfile)

But the domain link is easier and works everywhere!

---

**Total time: 5 minutes**  
**Cost: Free**  
**Result: Trusted HTTPS without file sharing!**

