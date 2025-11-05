# Quick Port Forwarding Helper Script

Write-Host "=== Router Port Forwarding Helper ===" -ForegroundColor Cyan
Write-Host ""

# Find router IP
Write-Host "Finding your router IP..." -ForegroundColor Yellow
$gateway = (Get-NetRoute -DestinationPrefix "0.0.0.0/0" | Where-Object { $_.NextHop -ne $null }).NextHop | Select-Object -First 1
if ($gateway) {
    Write-Host "✓ Router IP found: $gateway" -ForegroundColor Green
} else {
    $gateway = "192.168.1.1"
    Write-Host "Using default router IP: $gateway" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Step 1: Access Router ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open web browser" -ForegroundColor White
Write-Host "2. Go to: http://$gateway" -ForegroundColor Cyan
Write-Host "3. Login (check router label for default credentials)" -ForegroundColor White
Write-Host ""

# Get local IP
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" }).IPAddress | Select-Object -First 1
if (-not $localIP) {
    $localIP = "192.168.1.6"
    Write-Host "Using expected IP: $localIP" -ForegroundColor Yellow
} else {
    Write-Host "Your computer IP: $localIP" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Step 2: Find Port Forwarding ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Look for these sections in router admin:" -ForegroundColor White
Write-Host "  - Port Forwarding" -ForegroundColor Gray
Write-Host "  - Virtual Server" -ForegroundColor Gray
Write-Host "  - NAT Forwarding" -ForegroundColor Gray
Write-Host "  - Applications and Gaming" -ForegroundColor Gray
Write-Host ""

Write-Host "=== Step 3: Add Port Forwarding Rules ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Add TWO rules:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Rule 1: HTTP" -ForegroundColor Green
Write-Host "  Service Name: HTTP" -ForegroundColor Gray
Write-Host "  External Port: 80" -ForegroundColor Gray
Write-Host "  Internal IP: $localIP" -ForegroundColor Gray
Write-Host "  Internal Port: 80" -ForegroundColor Gray
Write-Host "  Protocol: TCP" -ForegroundColor Gray
Write-Host ""
Write-Host "Rule 2: HTTPS" -ForegroundColor Green
Write-Host "  Service Name: HTTPS" -ForegroundColor Gray
Write-Host "  External Port: 443" -ForegroundColor Gray
Write-Host "  Internal IP: $localIP" -ForegroundColor Gray
Write-Host "  Internal Port: 443" -ForegroundColor Gray
Write-Host "  Protocol: TCP" -ForegroundColor Gray
Write-Host ""

Write-Host "=== Step 4: Save and Verify ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Click 'Save' or 'Apply' in router admin" -ForegroundColor White
Write-Host "2. Wait 1-2 minutes for router to restart" -ForegroundColor White
Write-Host "3. Press Enter here to verify..." -ForegroundColor Yellow
$null = Read-Host

Write-Host ""
Write-Host "Verifying port forwarding..." -ForegroundColor Yellow

# Check if ports are listening locally
$port80 = Test-NetConnection -ComputerName "127.0.0.1" -Port 80 -WarningAction SilentlyContinue -InformationLevel Quiet
$port443 = Test-NetConnection -ComputerName "127.0.0.1" -Port 443 -WarningAction SilentlyContinue -InformationLevel Quiet

if ($port80) {
    Write-Host "✓ Port 80 is listening locally" -ForegroundColor Green
} else {
    Write-Host "✗ Port 80 is not accessible locally" -ForegroundColor Red
    Write-Host "  Make sure Caddy is running: docker ps --filter name=caddy-proxy" -ForegroundColor Yellow
}

if ($port443) {
    Write-Host "✓ Port 443 is listening locally" -ForegroundColor Green
} else {
    Write-Host "✗ Port 443 is not accessible locally" -ForegroundColor Red
    Write-Host "  Make sure Caddy is running: docker ps --filter name=caddy-proxy" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "After port forwarding is configured:" -ForegroundColor Yellow
Write-Host "1. Restart Caddy: docker restart caddy-proxy" -ForegroundColor Cyan
Write-Host "2. Monitor certificate: docker logs -f caddy-proxy" -ForegroundColor Cyan
Write-Host "3. Wait 1-2 minutes for certificate generation" -ForegroundColor White
Write-Host "4. Test: https://restaurant-webpage.ddns.net" -ForegroundColor Green
Write-Host ""
Write-Host "For detailed instructions, see: ROUTER_PORT_FORWARDING_GUIDE.md" -ForegroundColor Yellow
Write-Host ""

