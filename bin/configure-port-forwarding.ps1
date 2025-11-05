# Port Forwarding Configuration Guide and Verification Script
# This script helps you configure and verify port forwarding

Write-Host "=== Port Forwarding Setup Guide ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Find Router IP
Write-Host "Step 1: Finding your router IP..." -ForegroundColor Yellow
$gateway = (Get-NetRoute -DestinationPrefix "0.0.0.0/0" | Where-Object { $_.NextHop -ne $null }).NextHop | Select-Object -First 1
if ($gateway) {
    Write-Host "Router IP: $gateway" -ForegroundColor Green
    Write-Host "Open in browser: http://$gateway" -ForegroundColor Cyan
} else {
    Write-Host "Router IP: 192.168.1.1 (common default)" -ForegroundColor Yellow
    Write-Host "Open in browser: http://192.168.1.1" -ForegroundColor Cyan
}
Write-Host ""

# Step 2: Instructions
Write-Host "Step 2: Router Configuration Instructions" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Login to router admin panel (common credentials on router label)" -ForegroundColor White
Write-Host "2. Find 'Port Forwarding' or 'Virtual Server' section" -ForegroundColor White
Write-Host "3. Add these two rules:" -ForegroundColor White
Write-Host ""
Write-Host "   Rule 1: HTTP" -ForegroundColor Cyan
Write-Host "   - Service Name: HTTP" -ForegroundColor Gray
Write-Host "   - External Port: 80" -ForegroundColor Gray
Write-Host "   - Internal IP: 192.168.1.6" -ForegroundColor Gray
Write-Host "   - Internal Port: 80" -ForegroundColor Gray
Write-Host "   - Protocol: TCP" -ForegroundColor Gray
Write-Host ""
Write-Host "   Rule 2: HTTPS" -ForegroundColor Cyan
Write-Host "   - Service Name: HTTPS" -ForegroundColor Gray
Write-Host "   - External Port: 443" -ForegroundColor Gray
Write-Host "   - Internal IP: 192.168.1.6" -ForegroundColor Gray
Write-Host "   - Internal Port: 443" -ForegroundColor Gray
Write-Host "   - Protocol: TCP" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Save and apply settings" -ForegroundColor White
Write-Host "5. Wait 1-2 minutes for router to restart" -ForegroundColor White
Write-Host ""

# Step 3: Verification
Write-Host "Step 3: Verify Port Forwarding" -ForegroundColor Yellow
Write-Host ""
Write-Host "After configuring, press Enter to verify..." -ForegroundColor Cyan
$null = Read-Host

# Check if ports are accessible
Write-Host "Checking if port forwarding is working..." -ForegroundColor Yellow
Write-Host ""

# Get public IP
try {
    $publicIP = (Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing -TimeoutSec 5).Content
    Write-Host "Your public IP: $publicIP" -ForegroundColor Green
    Write-Host "Expected: 106.215.173.139" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "Could not get public IP" -ForegroundColor Yellow
}

# Test local port
Write-Host "Testing local port 80..." -ForegroundColor Yellow
try {
    $response = Test-NetConnection -ComputerName "127.0.0.1" -Port 80 -WarningAction SilentlyContinue -InformationLevel Quiet
    if ($response) {
        Write-Host "✓ Port 80 is listening locally" -ForegroundColor Green
    } else {
        Write-Host "✗ Port 80 is not accessible locally" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Could not test port 80" -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing local port 443..." -ForegroundColor Yellow
try {
    $response = Test-NetConnection -ComputerName "127.0.0.1" -Port 443 -WarningAction SilentlyContinue -InformationLevel Quiet
    if ($response) {
        Write-Host "✓ Port 443 is listening locally" -ForegroundColor Green
    } else {
        Write-Host "✗ Port 443 is not accessible locally" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Could not test port 443" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Verify ports are forwarded on router" -ForegroundColor White
Write-Host "2. Run: docker restart caddy-proxy" -ForegroundColor Cyan
Write-Host "3. Monitor: docker logs -f caddy-proxy" -ForegroundColor Cyan
Write-Host "4. Wait 1-2 minutes for certificate generation" -ForegroundColor White
Write-Host ""
Write-Host "After certificate is generated, test:" -ForegroundColor Yellow
Write-Host "https://restaurant-webpage.ddns.net" -ForegroundColor Green

