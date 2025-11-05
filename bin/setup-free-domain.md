# Setup Free Domain for HTTPS (No File Sharing)

## Quick 5-Minute Setup

### Step 1: Get Free Domain (2 minutes)

1. **Go to DuckDNS**: https://www.duckdns.org/
2. **Sign in** with Google/GitHub (free, no credit card)
3. **Create subdomain**: e.g., `restaurant-webpage`
   - Your domain: `restaurant-webpage.duckdns.org`
4. **Get your token** from DuckDNS dashboard

### Step 2: Update DuckDNS with Your IP

Your public IP: **106.215.173.139**

1. Go to DuckDNS dashboard
2. Enter IP: `106.215.173.139`
3. Click "Update IP"

### Step 3: Configure Router Port Forwarding

1. **Access router**: Usually `http://192.168.1.1` (check router label)
2. **Find Port Forwarding** section
3. **Add rules**:
   - **Port 80** → Forward to `192.168.1.6:80`
   - **Port 443** → Forward to `192.168.1.6:443`
4. **Save** settings

### Step 4: Update Caddyfile

1. Open `Caddyfile`
2. Replace `YOUR_DOMAIN.duckdns.org` with your actual domain (e.g., `restaurant-webpage.duckdns.org`)
3. Save file

### Step 5: Start Caddy Proxy

```powershell
docker-compose -f docker-compose-https-proxy.yml up -d
```

Caddy will automatically:
- ✅ Get Let's Encrypt certificate (trusted by all browsers)
- ✅ Configure HTTPS
- ✅ Auto-renew certificates

### Step 6: Share the Link

Share with your friend:
```
https://restaurant-webpage.duckdns.org
```

**No certificate sharing needed!** Works on all devices automatically.

## Alternative: Keep Using IP Address

If you want to keep using `https://192.168.1.6:18038`:

1. Use the domain setup above
2. Access via: `https://restaurant-webpage.duckdns.org` (works everywhere)
3. OR configure local DNS to point domain to local IP

## Result

✅ **Works on all devices** (no certificate installation)  
✅ **Trusted by all browsers** (Let's Encrypt)  
✅ **No file sharing needed**  
✅ **Auto-renewal** (certificates renew automatically)

## Troubleshooting

**Port forwarding not working?**
- Check router firewall settings
- Verify ports 80/443 are forwarded correctly
- Test: Visit `http://restaurant-webpage.duckdns.org` from outside your network

**Certificate not generating?**
- Ensure port 80 is accessible from internet
- Check DuckDNS domain is pointing to correct IP
- Wait 2-3 minutes for Let's Encrypt validation

