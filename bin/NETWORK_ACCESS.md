# WiFi Network Access Configuration

## Current Setup

Your project is already configured for local network access:

### Jenkins
- **Local**: http://localhost:32768
- **Network**: http://192.168.1.6:32768 (accessible from WiFi devices)
- **Status**: ✅ Already bound to all interfaces (0.0.0.0)

### Deployed Containers
- **restaurant-main**: http://192.168.1.6:8038
- **restaurant-experiment**: http://192.168.1.6:8054

## Access from WiFi Devices

### On any device connected to the same WiFi:

1. **Jenkins Dashboard:**
   ```
   http://192.168.1.6:32768
   ```

2. **Restaurant Webpage (main branch):**
   ```
   http://192.168.1.6:8038
   ```

3. **Restaurant Webpage (experiment branch):**
   ```
   http://192.168.1.6:8054
   ```

## GitHub Webhook Configuration

Update your GitHub webhook to use local IP:

1. Go to: https://github.com/jafar90147677/Restuarant_Webpage/settings/hooks
2. Edit the webhook
3. Update Payload URL:
   ```
   http://192.168.1.6:32768/github-webhook/
   ```
4. **Important**: This only works if:
   - GitHub can reach your local network (requires port forwarding/router config)
   - OR use ngrok for external access while keeping local access

## Windows Firewall

If devices can't connect, allow ports in Windows Firewall:

```powershell
New-NetFirewallRule -DisplayName "Jenkins" -Direction Inbound -LocalPort 32768 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Restaurant Main" -Direction Inbound -LocalPort 8038 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Restaurant Experiment" -Direction Inbound -LocalPort 8054 -Protocol TCP -Action Allow
```

## Verify Network Access

### From another device on WiFi:
1. Open browser
2. Navigate to: `http://192.168.1.6:32768`
3. Should see Jenkins login page

### From your computer:
```powershell
# Test Jenkins
curl http://192.168.1.6:32768

# Test Restaurant
curl http://192.168.1.6:8038
```

## Important Notes

⚠️ **Local IP may change**: If your router assigns dynamic IPs, the IP (192.168.1.6) may change. Check IP with:
```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" }
```

💡 **For GitHub webhooks**: If you need external access (from GitHub), you have two options:
1. Keep ngrok running for webhooks only
2. Configure port forwarding on your router (advanced)

✅ **Current Status**: Everything is already configured for local network access. Just use the IP addresses above.

## Quick Reference

- **Your Local IP**: 192.168.1.6
- **Jenkins**: http://192.168.1.6:32768
- **Main App**: http://192.168.1.6:8038
- **Experiment App**: http://192.168.1.6:8054

