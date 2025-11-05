# GitHub Webhook Setup Script for Jenkins
# This script helps configure the GitHub webhook for fast triggering

Write-Host "=== GitHub Webhook Setup for Jenkins ===" -ForegroundColor Cyan
Write-Host ""

# Get ngrok URL
Write-Host "Checking ngrok status..." -ForegroundColor Yellow
try {
    $ngrokResponse = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -UseBasicParsing
    $publicUrl = $ngrokResponse.tunnels[0].public_url
    Write-Host "✓ ngrok is running" -ForegroundColor Green
    Write-Host "  Public URL: $publicUrl" -ForegroundColor White
} catch {
    Write-Host "✗ ngrok is not running or not accessible" -ForegroundColor Red
    Write-Host "  Please start ngrok: ngrok http 32768" -ForegroundColor Yellow
    exit 1
}

# Construct webhook URL
$webhookUrl = "$publicUrl/github-webhook/"
Write-Host ""
Write-Host "Webhook URL: $webhookUrl" -ForegroundColor Cyan
Write-Host ""

# Test Jenkins accessibility
Write-Host "Testing Jenkins accessibility..." -ForegroundColor Yellow
try {
    $jenkinsTest = Invoke-WebRequest -Uri "$publicUrl" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Jenkins is accessible via ngrok" -ForegroundColor Green
} catch {
    Write-Host "⚠ Jenkins may not be accessible (ngrok browser warning is normal)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== GitHub Webhook Configuration ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to: https://github.com/jafar90147677/Restuarant_Webpage/settings/hooks" -ForegroundColor White
Write-Host "2. Click 'Add webhook'" -ForegroundColor White
Write-Host "3. Configure:" -ForegroundColor White
Write-Host "   - Payload URL: $webhookUrl" -ForegroundColor Cyan
Write-Host "   - Content type: application/json" -ForegroundColor White
Write-Host "   - Secret: (leave empty)" -ForegroundColor White
Write-Host "   - Events: Just the push event" -ForegroundColor White
Write-Host "   - Active: ✓" -ForegroundColor White
Write-Host "4. Click 'Add webhook'" -ForegroundColor White
Write-Host ""

# Copy webhook URL to clipboard
$webhookUrl | Set-Clipboard
Write-Host "✓ Webhook URL copied to clipboard!" -ForegroundColor Green
Write-Host ""

Write-Host "=== Testing Webhook ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "After adding the webhook, test it by:" -ForegroundColor White
Write-Host "1. Push a test commit:" -ForegroundColor Yellow
Write-Host "   git commit --allow-empty -m 'Test webhook'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Check Jenkins dashboard immediately" -ForegroundColor Yellow
Write-Host "   Build should start within 1-3 seconds" -ForegroundColor Gray
Write-Host ""

Write-Host "=== Verification ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "To verify webhook is working:" -ForegroundColor White
Write-Host "1. GitHub → Settings → Webhooks → Recent Deliveries" -ForegroundColor Yellow
Write-Host "2. Look for green checkmarks (200 OK responses)" -ForegroundColor Yellow
Write-Host "3. Check Jenkins logs:" -ForegroundColor Yellow
Write-Host "   docker logs jenkins --tail 50" -ForegroundColor Gray
Write-Host ""

Write-Host "=== Important Notes ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: ngrok URL changes on restart" -ForegroundColor Yellow
Write-Host "   Update webhook in GitHub if you restart ngrok" -ForegroundColor Gray
Write-Host ""
Write-Host "For stable URLs, use ngrok reserved domain:" -ForegroundColor Green
Write-Host "   ngrok http 32768 --domain=your-domain.ngrok.io" -ForegroundColor Gray
Write-Host ""

