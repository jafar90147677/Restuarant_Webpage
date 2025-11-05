# Start HTTPS Proxy with Let's Encrypt

## Your Domain Setup
- **Domain**: `restaurant-webpage.ddns.net`
- **IP**: `106.215.173.139` (already configured in NoIP)

## Step 1: Router Port Forwarding

Configure your router to forward:
- **External Port 80** → **Internal 192.168.1.6:80**
- **External Port 443** → **Internal 192.168.1.6:443**

**How to do it:**
1. Open router admin: `http://192.168.1.1` (or check router label)
2. Find "Port Forwarding" or "Virtual Server" section
3. Add rules:
   - Service: HTTP, External: 80, Internal: 192.168.1.6:80
   - Service: HTTPS, External: 443, Internal: 192.168.1.6:443
4. Save

## Step 2: Connect Existing Container to Network

Your `restaurant-main` container needs to be on the same network as Caddy:

```powershell
docker network create restaurant-network
docker network connect restaurant-network restaurant-main
```

## Step 3: Start Caddy Proxy

```powershell
docker-compose -f docker-compose-https-proxy.yml up -d
```

Caddy will automatically:
- Get Let's Encrypt certificate for `restaurant-webpage.ddns.net`
- Configure HTTPS
- Auto-renew certificates

## Step 4: Verify

Wait 1-2 minutes, then test:
```powershell
Invoke-WebRequest -Uri "https://restaurant-webpage.ddns.net" -UseBasicParsing
```

## Step 5: Share Link

Share with your friend:
```
https://restaurant-webpage.ddns.net
```

✅ Works on all devices  
✅ No certificate sharing needed  
✅ Trusted by all browsers  

## Troubleshooting

**Certificate not generating?**
- Check port 80 is accessible from internet
- Verify domain resolves to correct IP: `nslookup restaurant-webpage.ddns.net`
- Check Caddy logs: `docker logs caddy-proxy`

**Port forwarding not working?**
- Test from outside network
- Verify router firewall allows ports 80/443
- Check Windows Firewall rules

