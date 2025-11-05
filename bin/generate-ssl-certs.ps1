# Generate SSL certificates using mkcert (if available) or OpenSSL
# This creates locally-trusted certificates for HTTPS

$ErrorActionPreference = "Stop"

Write-Host "=== Generating SSL Certificates ===" -ForegroundColor Cyan
Write-Host ""

# Get local IP
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" } | Select-Object -First 1).IPAddress
Write-Host "Local IP: $localIP" -ForegroundColor Green

# Create ssl directory if it doesn't exist
if (-not (Test-Path "ssl")) {
    New-Item -ItemType Directory -Path "ssl" | Out-Null
    Write-Host "Created ssl directory" -ForegroundColor Green
}

# Check if mkcert is available
$mkcertPath = Get-Command mkcert -ErrorAction SilentlyContinue

if ($mkcertPath) {
    Write-Host "Using mkcert (recommended - creates locally-trusted certificates)" -ForegroundColor Green
    Write-Host ""
    
    # Install mkcert root CA (if not already installed)
    Write-Host "Installing mkcert root certificate..." -ForegroundColor Yellow
    mkcert -install 2>&1 | Out-Null
    
    # Generate certificates
    Write-Host "Generating certificates for $localIP and localhost..." -ForegroundColor Yellow
    Push-Location ssl
    mkcert $localIP localhost 127.0.0.1 ::1
    Move-Item -Force "$localIP+3.pem" nginx-selfsigned.crt
    Move-Item -Force "$localIP+3-key.pem" nginx-selfsigned.key
    Pop-Location
    
    Write-Host "✓ Certificates generated successfully!" -ForegroundColor Green
    Write-Host "  Certificate: ssl/nginx-selfsigned.crt" -ForegroundColor Gray
    Write-Host "  Private Key: ssl/nginx-selfsigned.key" -ForegroundColor Gray
} else {
    Write-Host "mkcert not found. Using OpenSSL to generate self-signed certificates..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Note: Self-signed certificates will show browser warnings." -ForegroundColor Yellow
    Write-Host "For trusted certificates, install mkcert:" -ForegroundColor Yellow
    Write-Host "  choco install mkcert" -ForegroundColor Cyan
    Write-Host "  OR download from: https://github.com/FiloSottile/mkcert/releases" -ForegroundColor Cyan
    Write-Host ""
    
    # Check if OpenSSL is available
    $opensslPath = Get-Command openssl -ErrorAction SilentlyContinue
    
    if (-not $opensslPath) {
        Write-Host "ERROR: OpenSSL not found!" -ForegroundColor Red
        Write-Host "Please install OpenSSL or mkcert" -ForegroundColor Yellow
        exit 1
    }
    
    # Generate self-signed certificate with OpenSSL
    Write-Host "Generating self-signed certificate..." -ForegroundColor Yellow
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 `
        -keyout ssl/nginx-selfsigned.key `
        -out ssl/nginx-selfsigned.crt `
        -subj "/C=US/ST=State/L=City/O=Organization/CN=$localIP" 2>&1 | Out-Null
    
    Write-Host "✓ Self-signed certificate generated!" -ForegroundColor Green
    Write-Host "  Certificate: ssl/nginx-selfsigned.crt" -ForegroundColor Gray
    Write-Host "  Private Key: ssl/nginx-selfsigned.key" -ForegroundColor Gray
    Write-Host ""
    Write-Host "⚠ Browser will show security warning for self-signed certificates" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Update nginx.conf to use nginx-https.conf" -ForegroundColor White
Write-Host "2. Update Dockerfile to copy SSL certificates" -ForegroundColor White
Write-Host "3. Rebuild and redeploy containers" -ForegroundColor White

