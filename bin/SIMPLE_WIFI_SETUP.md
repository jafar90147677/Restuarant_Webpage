# Simple WiFi Network Access - HTTP Only

## ✅ Setup Complete

Your restaurant webpage is now accessible on your WiFi network via **plain HTTP** (no HTTPS, no certificates).

## Access URL

**Share this with anyone on your WiFi network:**
```
http://192.168.1.6:8038
```

## What Was Done

✅ **Removed all HTTPS/SSL** - Pure HTTP only  
✅ **Removed SSL certificates** - No certificate files in Dockerfile  
✅ **Updated nginx.conf** - HTTP server only, no redirects  
✅ **Updated Dockerfile** - Exposes only port 80  
✅ **Rebuilt container** - Fresh build with HTTP-only config  

## Current Status

- **Container**: `restaurant-main`
- **Port**: `8038` → `80` (HTTP only)
- **Protocol**: HTTP (no HTTPS)
- **Access**: Works on all devices on same WiFi

## How to Access

### On Your Computer:
```
http://localhost:8038
```

### On Other Devices (Same WiFi):
```
http://192.168.1.6:8038
```

## Verification

### Check Container:
```powershell
docker ps --filter name=restaurant-main
```

### Test Access:
```powershell
Invoke-WebRequest -Uri "http://192.168.1.6:8038" -UseBasicParsing
```

### View Logs:
```powershell
docker logs restaurant-main -f
```

## Troubleshooting

### If devices can't access:

1. **Check both devices are on same WiFi network**
2. **Verify Windows Firewall allows port 8038:**
   ```powershell
   Get-NetFirewallRule | Where-Object { $_.DisplayName -like "*Restaurant*" }
   ```
3. **If firewall rule missing, create it:**
   ```powershell
   New-NetFirewallRule -DisplayName "Restaurant HTTP" -Direction Inbound -LocalPort 8038 -Protocol TCP -Action Allow
   ```
4. **Test from your computer first:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:8038" -UseBasicParsing
   ```

## Summary

✅ **HTTP only** - No SSL/HTTPS  
✅ **No certificates** - Removed from Dockerfile  
✅ **WiFi accessible** - Works on all devices  
✅ **Simple URL** - `http://192.168.1.6:8038`  

**Status**: Ready for WiFi network access!

