# Fix WiFi Access - Complete Troubleshooting

Write-Host "=== WiFi Access Troubleshooting ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check container
Write-Host "1. Checking container status..." -ForegroundColor Yellow
$container = docker ps --filter name=restaurant-main --format "{{.Names}}"
if ($container) {
    Write-Host "   ✓ Container is running: $container" -ForegroundColor Green
} else {
    Write-Host "   ✗ Container is not running!" -ForegroundColor Red
    Write-Host "   Starting container..." -ForegroundColor Yellow
    docker-compose -f docker-compose-ngrok-restaurant.yml up -d restaurant-main
    Start-Sleep -Seconds 5
}

Write-Host ""

# Step 2: Check port
Write-Host "2. Checking port 8038..." -ForegroundColor Yellow
$port = netstat -ano | findstr ":8038" | Select-String "LISTENING"
if ($port) {
    Write-Host "   ✓ Port 8038 is listening" -ForegroundColor Green
} else {
    Write-Host "   ✗ Port 8038 is not listening" -ForegroundColor Red
}

Write-Host ""

# Step 3: Check firewall
Write-Host "3. Checking Windows Firewall..." -ForegroundColor Yellow
$firewall = Get-NetFirewallRule | Where-Object { $_.LocalPort -eq 8038 -or $_.DisplayName -like "*Restaurant*8038*" }
if ($firewall) {
    Write-Host "   ✓ Firewall rules exist" -ForegroundColor Green
} else {
    Write-Host "   ⚠ Creating firewall rule..." -ForegroundColor Yellow
    New-NetFirewallRule -DisplayName "Restaurant HTTP 8038" -Direction Inbound -LocalPort 8038 -Protocol TCP -Action Allow
    Write-Host "   ✓ Firewall rule created" -ForegroundColor Green
}

Write-Host ""

# Step 4: Get your IP
Write-Host "4. Getting your IP address..." -ForegroundColor Yellow
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" }).IPAddress | Select-Object -First 1
if ($ip) {
    Write-Host "   Your IP: $ip" -ForegroundColor Green
} else {
    Write-Host "   ✗ Could not determine IP" -ForegroundColor Red
    $ip = "192.168.1.6"
}

Write-Host ""

# Step 5: Test HTTP access
Write-Host "5. Testing HTTP access..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://$ip:8038" -UseBasicParsing -TimeoutSec 5
    Write-Host "   ✓ SUCCESS! HTTP $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Content: $($response.Content.Length) bytes" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   - Make sure you use: http://$ip:8038 (with http://)" -ForegroundColor White
    Write-Host "   - Do not use https (that causes SSL errors)" -ForegroundColor White
    Write-Host "   - Clear browser cache" -ForegroundColor White
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Share this EXACT URL on WiFi:" -ForegroundColor Yellow
Write-Host "  http://$ip:8038" -ForegroundColor Green -BackgroundColor Black
Write-Host ""
Write-Host "IMPORTANT: Use http:// NOT https://" -ForegroundColor Red
Write-Host ""

