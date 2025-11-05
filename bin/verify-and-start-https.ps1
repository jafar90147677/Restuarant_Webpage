# Verify Port Forwarding and Start HTTPS Certificate Generation

Write-Host "=== HTTPS Certificate Setup ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Caddy status
Write-Host "Step 1: Checking Caddy status..." -ForegroundColor Yellow
$caddyStatus = docker ps --filter name=caddy-proxy --format "{{.Status}}" 2>&1 | Where-Object { $_ -notmatch "Error" }
if ($caddyStatus) {
    Write-Host "✓ Caddy is running: $caddyStatus" -ForegroundColor Green
} else {
    Write-Host "✗ Caddy is not running" -ForegroundColor Red
    Write-Host "Starting Caddy..." -ForegroundColor Yellow
    docker-compose -f docker-compose-https-proxy.yml up -d
    Start-Sleep -Seconds 3
}

Write-Host ""

# Step 2: Verify domain resolution
Write-Host "Step 2: Verifying domain resolution..." -ForegroundColor Yellow
try {
    $dnsResult = Resolve-DnsName restaurant-webpage.ddns.net -ErrorAction Stop
    $domainIP = ($dnsResult | Where-Object { $_.Type -eq 'A' }).IPAddress
    Write-Host "✓ Domain resolves to: $domainIP" -ForegroundColor Green
    
    # Get public IP
    try {
        $publicIP = (Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing -TimeoutSec 5).Content
        if ($domainIP -eq $publicIP) {
            Write-Host "✓ Domain IP matches public IP" -ForegroundColor Green
        } else {
            Write-Host "⚠ Domain IP ($domainIP) does not match public IP ($publicIP)" -ForegroundColor Yellow
            Write-Host "  Update IP in NoIP dashboard if needed" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠ Could not verify public IP" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Domain resolution failed" -ForegroundColor Red
    Write-Host "  Check: nslookup restaurant-webpage.ddns.net" -ForegroundColor Yellow
}

Write-Host ""

# Step 3: Check port forwarding (local test)
Write-Host "Step 3: Testing local ports..." -ForegroundColor Yellow
$port80 = Test-NetConnection -ComputerName "127.0.0.1" -Port 80 -WarningAction SilentlyContinue -InformationLevel Quiet
$port443 = Test-NetConnection -ComputerName "127.0.0.1" -Port 443 -WarningAction SilentlyContinue -InformationLevel Quiet

if ($port80) {
    Write-Host "✓ Port 80 is listening" -ForegroundColor Green
} else {
    Write-Host "✗ Port 80 is not accessible" -ForegroundColor Red
}

if ($port443) {
    Write-Host "✓ Port 443 is listening" -ForegroundColor Green
} else {
    Write-Host "✗ Port 443 is not accessible" -ForegroundColor Red
}

Write-Host ""
Write-Host "⚠ IMPORTANT: Port forwarding must be configured on your router" -ForegroundColor Yellow
Write-Host "   External ports 80/443 → Internal 192.168.1.6:80/443" -ForegroundColor Gray
Write-Host ""

# Step 4: Restart Caddy to trigger certificate generation
Write-Host "Step 4: Restarting Caddy to generate certificate..." -ForegroundColor Yellow
Write-Host "Restarting..." -ForegroundColor Cyan
docker restart caddy-proxy
Start-Sleep -Seconds 3

Write-Host "✓ Caddy restarted" -ForegroundColor Green
Write-Host ""

# Step 5: Monitor certificate generation
Write-Host "Step 5: Monitoring certificate generation..." -ForegroundColor Yellow
Write-Host "Checking logs (last 20 lines)..." -ForegroundColor Cyan
Write-Host ""

Start-Sleep -Seconds 5
docker logs caddy-proxy --tail 20 2>&1 | Select-String -Pattern "certificate|acme|error|success|obtained" -CaseSensitive:$false | ForEach-Object {
    if ($_ -match "error|failed") {
        Write-Host $_ -ForegroundColor Red
    } elseif ($_ -match "success|obtained|certificate") {
        Write-Host $_ -ForegroundColor Green
    } else {
        Write-Host $_ -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== Certificate Status ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you see certificate obtained or success:" -ForegroundColor Green
Write-Host "  ✓ Certificate is ready!" -ForegroundColor Green
Write-Host "  Test: https://restaurant-webpage.ddns.net" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you see timeout or firewall problem:" -ForegroundColor Red
Write-Host "  ✗ Port forwarding not configured yet" -ForegroundColor Red
Write-Host "  Run: .\configure-port-forwarding.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "To monitor in real-time:" -ForegroundColor Yellow
Write-Host "  docker logs -f caddy-proxy" -ForegroundColor Cyan
Write-Host ""

# Check certificate status
Write-Host "Checking certificate files..." -ForegroundColor Yellow
$certPath = docker exec caddy-proxy ls /data/caddy/certificates/acme-v02.api.letsencrypt.org-directory/restaurant-webpage.ddns.net/ 2>&1 | Where-Object { $_ -notmatch "Error|No such file" }
if ($certPath -and $certPath.Count -gt 0) {
    Write-Host "✓ Certificate files found!" -ForegroundColor Green
} else {
    Write-Host "⚠ Certificate files not found yet (may still be generating)" -ForegroundColor Yellow
    Write-Host "  Wait 1-2 minutes and check again" -ForegroundColor Gray
}

