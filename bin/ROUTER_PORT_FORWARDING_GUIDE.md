# Router Port Forwarding Guide

## Step-by-Step Instructions

### Step 1: Find Your Router's IP Address

**Method 1: Check Windows**
1. Open PowerShell
2. Run: `ipconfig`
3. Look for "Default Gateway" - that's your router IP (usually `192.168.1.1` or `192.168.0.1`)

**Method 2: Check Router Label**
- Look at the bottom/back of your router
- Usually shows: "Router IP: 192.168.1.1" or similar

### Step 2: Access Router Admin Panel

1. Open web browser
2. Type router IP in address bar (e.g., `http://192.168.1.1`)
3. Press Enter

### Step 3: Login to Router

**Common Default Credentials:**
- Username: `admin` / Password: `admin`
- Username: `admin` / Password: `password`
- Username: `admin` / Password: (blank)
- Username: `root` / Password: `admin`

**If you changed it:**
- Use your custom credentials
- If forgotten: Reset router (button on back) - this will reset all settings

**Note:** Default credentials are often printed on router label

### Step 4: Find Port Forwarding Section

The section name varies by router brand:

**Common Names:**
- "Port Forwarding"
- "Virtual Server"
- "NAT Forwarding"
- "Firewall" → "Port Forwarding"
- "Advanced" → "Port Forwarding"
- "Applications & Gaming" → "Port Range Forwarding"

### Step 5: Add Port Forwarding Rules

You need to add **TWO rules**:

#### Rule 1: HTTP (Port 80)

**Configuration:**
- **Service Name**: HTTP (or any name you like)
- **External Port**: 80
- **Internal IP Address**: 192.168.1.6
- **Internal Port**: 80
- **Protocol**: TCP (or Both/TCP+UDP)
- **Enable**: Yes/Checked

#### Rule 2: HTTPS (Port 443)

**Configuration:**
- **Service Name**: HTTPS (or any name you like)
- **External Port**: 443
- **Internal IP Address**: 192.168.1.6
- **Internal Port**: 443
- **Protocol**: TCP (or Both/TCP+UDP)
- **Enable**: Yes/Checked

### Step 6: Save and Apply

1. Click "Save" or "Apply" button
2. Router may restart (wait 1-2 minutes)
3. Some routers require "Reboot" after saving

---

## Brand-Specific Instructions

### TP-Link Routers

1. Login to admin panel
2. Go to: **Advanced** → **NAT Forwarding** → **Virtual Servers**
3. Click "Add"
4. Fill in:
   - Service Name: HTTP
   - External Port: 80
   - Internal Port: 80
   - IP Address: 192.168.1.6
   - Protocol: TCP
5. Click "Save"
6. Repeat for HTTPS (port 443)

### Netgear Routers

1. Login to admin panel
2. Go to: **Advanced** → **Port Forwarding** (or **Port Forwarding / Port Triggering**)
3. Click "Add Custom Service"
4. Fill in:
   - Service Name: HTTP
   - External Starting Port: 80
   - External Ending Port: 80
   - Internal IP Address: 192.168.1.6
   - Internal Port: 80
   - Protocol: TCP
5. Click "Apply"
6. Repeat for HTTPS (port 443)

### Linksys Routers

1. Login to admin panel
2. Go to: **Smart Wi-Fi Tools** → **Port Forwarding**
3. Click "Add a new port forwarding"
4. Fill in:
   - Service Name: HTTP
   - External Port: 80
   - Internal Port: 80
   - Device IP: 192.168.1.6
   - Protocol: TCP
5. Click "OK"
6. Repeat for HTTPS (port 443)

### Asus Routers

1. Login to admin panel
2. Go to: **Advanced Settings** → **WAN** → **Virtual Server / Port Forwarding**
3. Click "Add"
4. Fill in:
   - Service Name: HTTP
   - Port Range: 80
   - Local IP: 192.168.1.6
   - Local Port: 80
   - Protocol: TCP
5. Click "OK"
6. Repeat for HTTPS (port 443)

### D-Link Routers

1. Login to admin panel
2. Go to: **Advanced** → **Port Forwarding**
3. Click "Add Rule"
4. Fill in:
   - Rule Name: HTTP
   - External Port: 80
   - Internal Port: 80
   - Internal IP: 192.168.1.6
   - Protocol: TCP
5. Click "Save"
6. Repeat for HTTPS (port 443)

### Huawei Routers

1. Login to admin panel
2. Go to: **Advanced** → **NAT** → **Port Forwarding**
3. Click "Add"
4. Fill in:
   - Service Name: HTTP
   - External Port: 80
   - Internal Port: 80
   - Internal Host: 192.168.1.6
   - Protocol: TCP
5. Click "Apply"
6. Repeat for HTTPS (port 443)

---

## Troubleshooting

### Can't Access Router Admin Panel?

1. **Check IP address**: Try `192.168.0.1` or `192.168.1.1` or `10.0.0.1`
2. **Check connection**: Make sure you're connected to router's Wi-Fi/network
3. **Try different browser**: Use Chrome, Firefox, or Edge
4. **Check firewall**: Temporarily disable Windows Firewall
5. **Reset router**: Hold reset button for 10 seconds (will reset all settings)

### Port Forwarding Not Working?

1. **Check firewall**: Windows Firewall should allow ports 80/443
2. **Check IP address**: Verify `192.168.1.6` is correct (run `ipconfig`)
3. **Check router IP**: Internal IP might be different (check `ipconfig`)
4. **Restart router**: After changes, reboot router
5. **Check ISP**: Some ISPs block ports 80/443 (call ISP if needed)

### ISP Blocks Ports 80/443?

Some ISPs block these ports. Options:
1. **Contact ISP**: Ask to unblock ports 80/443
2. **Use different ports**: Configure Caddy to use ports 8080/8443 (requires router config)
3. **Use alternative**: Consider using a tunnel service (ngrok, Cloudflare Tunnel)

---

## Verification

### Test Port Forwarding

**Method 1: Online Tool**
1. Go to: https://www.yougetsignal.com/tools/open-ports/
2. Enter IP: `106.215.173.139`
3. Check ports: 80, 443
4. Click "Check"
5. Should show "Open" if working

**Method 2: From External Network**
1. Use mobile data (not Wi-Fi)
2. Try: `http://106.215.173.139` (should show your website)
3. Try: `https://restaurant-webpage.ddns.net` (after certificate)

**Method 3: Check Caddy Logs**
```powershell
docker logs caddy-proxy --tail 20
```

Look for:
- ✅ "certificate obtained" = Success!
- ❌ "timeout" or "firewall" = Port forwarding not working

---

## Quick Reference

**What You Need:**
- Router IP: Usually `192.168.1.1`
- Router login: Check router label
- Internal IP: `192.168.1.6` (your computer)
- External Ports: 80, 443
- Internal Ports: 80, 443
- Protocol: TCP

**After Configuration:**
1. Wait 1-2 minutes for router to apply changes
2. Restart Caddy: `docker restart caddy-proxy`
3. Monitor: `docker logs -f caddy-proxy`
4. Test: `https://restaurant-webpage.ddns.net`

---

## Need Help?

If you can't find the port forwarding section:
1. **Check router model**: Look at router label
2. **Google**: "Port forwarding [Your Router Model]"
3. **Router manual**: Check router documentation
4. **Router support**: Contact router manufacturer support

**Common Router Admin URLs:**
- TP-Link: `http://tplinkwifi.net`
- Netgear: `http://routerlogin.net`
- Linksys: `http://myrouter.local`
- Asus: `http://router.asus.com`

---

**Remember:** Port forwarding allows external internet traffic to reach your server. This is required for Let's Encrypt to verify your domain and issue the SSL certificate.

