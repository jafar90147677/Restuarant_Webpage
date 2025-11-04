# Auto-Start ngrok for Jenkins - Setup Guide

## Problem
You don't want to manually run `ngrok http 32768` every time. You need it to start automatically.

## Solution Options

### Option 1: Quick Start Script (Recommended)
**Use this when you start your computer/development session**

1. **Double-click `start-jenkins-ngrok.ps1`**
   - This starts both Jenkins and ngrok automatically
   - Checks if services are already running
   - Shows the public URL

**Usage:**
```powershell
.\start-jenkins-ngrok.ps1
```

### Option 2: Auto-Start on Windows Login (Permanent Solution)
**Set up once, runs automatically every time you log in**

1. **Run as Administrator:**
   ```powershell
   .\setup-autostart.ps1
   ```

2. **Result:**
   - ngrok will start automatically when you log into Windows
   - No manual action needed

3. **To remove auto-start:**
   ```powershell
   .\setup-autostart.ps1 -Remove
   ```

### Option 3: Manual Start Script
**For manual control**

1. **Run `start-ngrok.ps1`:**
   ```powershell
   .\start-ngrok.ps1
   ```

## Files Created

1. **`start-ngrok.ps1`** - Starts ngrok only
2. **`start-jenkins-ngrok.ps1`** - Starts both Jenkins and ngrok
3. **`setup-autostart.ps1`** - Sets up Windows auto-start

## Quick Setup Steps

### For Daily Use:
```powershell
# Just run this when you start working:
.\start-jenkins-ngrok.ps1
```

### For Permanent Auto-Start:
```powershell
# Run once as Administrator:
.\setup-autostart.ps1
```

## Important Notes

⚠️ **ngrok URL Changes:** When ngrok restarts, the URL changes. You must update the GitHub webhook URL.

💡 **Get the URL:**
- Check ngrok web interface: `http://localhost:4040`
- Or run: `Invoke-RestMethod http://localhost:4040/api/tunnels | Select-Object -ExpandProperty tunnels | Select-Object -ExpandProperty public_url`

## Verification

After starting ngrok:
1. Check ngrok web interface: `http://localhost:4040`
2. Verify tunnel is active
3. Update GitHub webhook if URL changed

## Troubleshooting

### ngrok not starting?
- Check if ngrok is in PATH: `ngrok version`
- Check if port 32768 is already in use
- Check Windows Firewall settings

### Auto-start not working?
- Run `setup-autostart.ps1` as Administrator
- Check Task Scheduler: `taskschd.msc`
- Look for task: "JenkinsNgrokAutoStart"

---

**Recommended:** Use `start-jenkins-ngrok.ps1` for daily use, or set up auto-start with `setup-autostart.ps1` for permanent solution.

