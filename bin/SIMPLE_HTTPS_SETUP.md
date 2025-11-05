# Simple HTTPS Setup - No File Sharing Required

## The Solution: Use a Free Domain with Let's Encrypt

To make `https://192.168.1.6:18038` work without sharing files, you need a **trusted SSL certificate** from Let's Encrypt.

Let's Encrypt requires a **domain name** (not just IP address).

## Easiest Option: DuckDNS (Free, 2 minutes)

### What You Get
- Free domain: `yourname.duckdns.org`
- Let's Encrypt certificate (trusted by all browsers)
- Works on all devices without file sharing
- Auto-renewal

### Setup Steps

1. **Get domain** (2 min):
   - Go to: https://www.duckdns.org/
   - Sign in → Create subdomain
   - Update IP: `106.215.173.139`

2. **Port forwarding** (router):
   - Port 80 → 192.168.1.6:80
   - Port 443 → 192.168.1.6:443

3. **Start Caddy** (automatic Let's Encrypt):
   ```powershell
   # Update Caddyfile with your domain
   docker-compose -f docker-compose-https-proxy.yml up -d
   ```

4. **Share link**:
   ```
   https://yourname.duckdns.org
   ```

## Important

⚠️ **IP addresses cannot get trusted certificates** - You MUST use a domain name.

✅ **Solution**: Use DuckDNS domain → Get Let's Encrypt → Share domain link instead of IP

## Quick Command

After setting up DuckDNS:
```powershell
# Edit Caddyfile - replace YOUR_DOMAIN with your DuckDNS domain
# Then:
docker-compose -f docker-compose-https-proxy.yml up -d
```

Caddy automatically gets Let's Encrypt certificate - no manual steps!

---

**Result**: Your friend can access `https://yourname.duckdns.org` without any certificate installation!

