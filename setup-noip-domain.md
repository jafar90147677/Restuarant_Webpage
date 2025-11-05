# Setup NoIP Domain (Alternative to DuckDNS)

## Step 1: Sign Up for NoIP

1. Go to: https://www.noip.com/
2. Click "Sign Up" (free)
3. Create account
4. Verify email

## Step 2: Create Hostname

1. Login to NoIP dashboard
2. Go to "Dynamic DNS" → "Hostnames"
3. Click "Create Hostname"
4. Enter:
   - **Hostname**: `restaurant-webpage` (or your choice)
   - **Domain**: Choose from dropdown (e.g., `ddns.net`, `mynet.org`)
   - Your domain: `restaurant-webpage.ddns.net`
5. Click "Create Hostname"

## Step 3: Update IP Address

1. In NoIP dashboard → Hostnames
2. Click "Modify" on your hostname
3. Enter IP: `106.215.173.139`
4. Save

## Step 4: Update Caddyfile

Replace `YOUR_DOMAIN.duckdns.org` with your NoIP domain:
```
restaurant-webpage.ddns.net {
    reverse_proxy restaurant-main-internal:80
}
```

## Step 5: Port Forwarding

Router port forwarding:
- Port 80 → 192.168.1.6:80
- Port 443 → 192.168.1.6:443

## Step 6: Start Caddy

```powershell
docker-compose -f docker-compose-https-proxy.yml up -d
```

## Share Link

Share with friends:
```
https://restaurant-webpage.ddns.net
```

✅ Works on all devices without file sharing!

## Important Notes

- **NoIP free plan**: Requires renewal every 30 days (click button in dashboard)
- **Alternative domains**: Choose from available domains in dropdown
- **IP update**: Update IP in NoIP dashboard if your public IP changes

