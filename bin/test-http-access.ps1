# Test HTTP access to restaurant webpage

Write-Host "=== Testing HTTP Access ===" -ForegroundColor Cyan
Write-Host ""

# Test localhost
Write-Host "1. Testing localhost:8038..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8038" -UseBasicParsing -TimeoutSec 5
    Write-Host "   ✓ SUCCESS - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Content length: $($response.Content.Length) bytes" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test network IP
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" }).IPAddress | Select-Object -First 1
if ($localIP) {
    Write-Host "2. Testing $localIP:8038..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "http://$localIP:8038" -UseBasicParsing -TimeoutSec 5
        Write-Host "   ✓ SUCCESS - Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "   Content length: $($response.Content.Length) bytes" -ForegroundColor Gray
    } catch {
        Write-Host "   ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "2. Could not determine local IP" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Share this URL on your WiFi network:" -ForegroundColor Yellow
Write-Host "  http://$localIP:8038" -ForegroundColor Green
Write-Host ""

