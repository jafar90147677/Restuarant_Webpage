# WiFi Access Fix - Step by Step

## Problem
Browser shows `ERR_SSL_PROTOCOL_ERROR` when accessing `192.168.1.6:8038`

## Root Cause
Browser is trying HTTPS automatically instead of HTTP

## Solution

### Step 1: Use the EXACT URL
Type this **EXACTLY** in your browser address bar:
```
http://192.168.1.6:8038
```

**Important:**
- ✅ Include `http://` at the beginning
- ✅ Include `:8038` at the end
- ❌ Don't use `https://` (that causes SSL errors)
- ❌ Don't just type `192.168.1.6` (browser may try HTTPS)

### Step 2: If Browser Still Shows SSL Error

**Option A: Clear Browser Cache**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Try the URL again

**Option B: Use Incognito/Private Window**
1. Open incognito/private window (`Ctrl + Shift + N` in Chrome)
2. Type: `http://192.168.1.6:8038`
3. Should work immediately

**Option C: Type URL Carefully**
1. Click in address bar
2. Type: `http://192.168.1.6:8038`
3. Press Enter
4. Don't let browser auto-complete to HTTPS

### Step 3: Verify It's Working

**Test from your computer:**
```powershell
Invoke-WebRequest -Uri "http://192.168.1.6:8038" -UseBasicParsing
```

**Should return:** Status 200

### Step 4: Share on WiFi

**On other devices (same WiFi):**
1. Open browser
2. Type: `http://192.168.1.6:8038`
3. Make sure to include `http://` and `:8038`

## Troubleshooting

### If still not working:

1. **Check container is running:**
   ```powershell
   docker ps --filter name=restaurant-main
   ```

2. **Check Windows Firewall:**
   ```powershell
   Get-NetFirewallRule | Where-Object { $_.LocalPort -eq 8038 }
   ```

3. **If firewall rule missing:**
   ```powershell
   New-NetFirewallRule -DisplayName "Restaurant HTTP 8038" -Direction Inbound -LocalPort 8038 -Protocol TCP -Action Allow
   ```

4. **Test from PowerShell:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:8038" -UseBasicParsing
   ```

## Quick Checklist

- [ ] Container is running: `docker ps --filter name=restaurant-main`
- [ ] Port 8038 is listening: `netstat -ano | findstr ":8038"`
- [ ] Firewall allows port 8038
- [ ] Using `http://` (not `https://`)
- [ ] Including `:8038` port number
- [ ] Both devices on same WiFi network

## Summary

**The URL to share:**
```
http://192.168.1.6:8038
```

✅ **Must include `http://`** (not https)  
✅ **Must include `:8038`** (port number)  
✅ **Works on all devices on same WiFi**

---

**Status**: Container is working correctly. The issue is browser trying HTTPS. Use `http://` explicitly!

