# Get ngrok HTTPS URL for Restaurant Webpage

Write-Host "=== Getting ngrok HTTPS URL ===" -ForegroundColor Cyan
Write-Host ""

# Check if container is running
$container = docker ps --filter name=ngrok-restaurant --format "{{.Names}}"
if (-not $container) {
    Write-Host "✗ ngrok-restaurant container is not running" -ForegroundColor Red
    Write-Host "Starting container..." -ForegroundColor Yellow
    docker-compose -f docker-compose-ngrok-restaurant.yml up -d
    Start-Sleep -Seconds 8
}

# Get HTTPS URL
Write-Host "Fetching HTTPS URL..." -ForegroundColor Yellow
try {
    $tunnels = Invoke-RestMethod -Uri "http://localhost:4041/api/tunnels" -UseBasicParsing -TimeoutSec 5 | ConvertFrom-Json
    $httpsUrl = $tunnels.tunnels | Where-Object { $_.proto -eq 'https' } | Select-Object -First 1 -ExpandProperty public_url
    
    if ($httpsUrl) {
        Write-Host ""
        Write-Host "=== SUCCESS ===" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your Secure HTTPS URL:" -ForegroundColor Cyan
        Write-Host "$httpsUrl" -ForegroundColor Green -BackgroundColor Black
        Write-Host ""
        Write-Host "Security Features:" -ForegroundColor Yellow
        Write-Host "  ✓ HTTPS (encrypted)" -ForegroundColor Green
        Write-Host "  ✓ Trusted certificate" -ForegroundColor Green
        Write-Host "  ✓ Works on all browsers" -ForegroundColor Green
        Write-Host ""
        Write-Host "Share this URL with others!" -ForegroundColor Cyan
        Write-Host ""
        
        # Copy to clipboard (optional)
        try {
            $httpsUrl | Set-Clipboard
            Write-Host "✓ URL copied to clipboard" -ForegroundColor Gray
        } catch {
            # Clipboard not available
        }
    } else {
        Write-Host "⚠ HTTPS tunnel not ready yet. Waiting..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Write-Host "Checking logs..." -ForegroundColor Yellow
        docker logs ngrok-restaurant --tail 20
    }
} catch {
    Write-Host "✗ Error getting URL: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Checking container status..." -ForegroundColor Yellow
    docker logs ngrok-restaurant --tail 30
}

