# Quick Fix for HTTPS Access Issue

## Problem
Friend cannot access `https://192.168.1.6:18038`

## Root Cause
The SSL certificate is not trusted on friend's device (mkcert certificate needs to be installed).

## Solutions

### Option 1: Install Certificate on Friend's Device (Recommended)

1. **Get the certificate file:**
   - File: `rootCA-for-friends.pem` (created in project folder)
   - Share this file with your friend

2. **Friend installs it:**
   - **Windows**: Double-click → Install → Trusted Root Certification Authorities
   - **Android**: Settings → Security → Install from storage
   - **iPhone**: Email it → Open → Install profile

3. **Access site:**
   - `https://192.168.1.6:18038` will work with green padlock

### Option 2: Use HTTP (Temporary)

If installing certificate is not possible:
```
http://192.168.1.6:8038
```

This will redirect to HTTPS but may show security warnings.

### Option 3: Check Windows Firewall

Firewall rules are already created, but verify:
```powershell
Get-NetFirewallRule | Where-Object { $_.LocalPort -eq 18038 }
```

### Option 4: Verify Container is Running

```powershell
docker ps --filter name=restaurant-main
```

Should show port mapping: `18038->443/tcp`

## Current Status

✅ Container is running with HTTPS enabled  
✅ Port 18038 is exposed and mapped  
✅ SSL certificates are installed  
✅ Windows Firewall rules created  
⚠️ Friend's device needs to trust the certificate

## Quick Test

From your computer, test HTTPS:
```powershell
Invoke-WebRequest -Uri "https://192.168.1.6:18038" -SkipCertificateCheck
```

If this works, the issue is certificate trust on friend's device.

