# ⚠️ Port Forwarding Required for HTTPS

## Current Status

✅ **Caddy proxy is running**  
✅ **Domain configured**: `restaurant-webpage.ddns.net`  
✅ **Container connected to network**  
❌ **Port forwarding not configured** (Certificate generation failing)

## Error Message

```
Timeout during connect (likely firewall problem)
106.215.173.139: Timeout during connect
```

This means Let's Encrypt cannot reach your server on port 80/443 to verify domain ownership.

## Solution: Configure Router Port Forwarding

### Step 1: Access Router Admin

1. Open browser: `http://192.168.1.1` (or check router label)
2. Login with admin credentials
3. Find "Port Forwarding" or "Virtual Server" section

### Step 2: Add Port Forwarding Rules

Add these two rules:

**Rule 1: HTTP (Port 80)**
- **Service Name**: HTTP
- **External Port**: 80
- **Internal IP**: 192.168.1.6
- **Internal Port**: 80
- **Protocol**: TCP

**Rule 2: HTTPS (Port 443)**
- **Service Name**: HTTPS
- **External Port**: 443
- **Internal IP**: 192.168.1.6
- **Internal Port**: 443
- **Protocol**: TCP

### Step 3: Save and Restart

1. Save settings
2. Router may restart (wait 1-2 minutes)

### Step 4: Verify Port Forwarding

Test from external network or use online tool:
- https://www.yougetsignal.com/tools/open-ports/
- Enter IP: `106.215.173.139`
- Check ports: 80, 443

### Step 5: Retry Certificate

After port forwarding is active:
```powershell
docker restart caddy-proxy
docker logs -f caddy-proxy
```

Wait 1-2 minutes for certificate generation.

## Alternative: Test Locally First

If you want to test locally before port forwarding:
1. Access: `http://192.168.1.6` (should work)
2. HTTPS will work after port forwarding + certificate

## After Port Forwarding Works

Share this link:
```
https://restaurant-webpage.ddns.net
```

✅ Works on all devices  
✅ No file sharing needed  
✅ Trusted HTTPS certificate  

---

**Note**: Port forwarding is required because Let's Encrypt needs to verify domain ownership by accessing your server from the internet on port 80.

