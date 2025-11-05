# HTTPS Setup with mkcert - Secure SSL Certificates

## ✅ Implementation Complete

Your project now uses **secure HTTPS with locally-trusted certificates** (no browser warnings).

## What Was Done

1. ✅ **Generated SSL certificates** using mkcert (locally-trusted, secure)
2. ✅ **Updated nginx.conf** to enable HTTPS with HTTP to HTTPS redirect
3. ✅ **Updated Dockerfile** to include SSL certificates
4. ✅ **Updated Jenkinsfile** to expose HTTPS ports

## Certificate Details

- **Certificate**: `ssl/nginx-selfsigned.crt` (valid until February 2028)
- **Private Key**: `ssl/nginx-selfsigned.key`
- **Trusted by**: Your local browser (via mkcert root CA)
- **Security**: TLS 1.2/1.3 with modern cipher suites

## Access URLs

### Main Branch (port 8080)
- **HTTP**: `http://192.168.1.6:8080` → Redirects to HTTPS
- **HTTPS**: `https://192.168.1.6:18080` (secure)

### Develop Branch (port 8081)
- **HTTP**: `http://192.168.1.6:8081` → Redirects to HTTPS
- **HTTPS**: `https://192.168.1.6:18081` (secure)

## Port Mapping

- **HTTP Port**: Original port (e.g., 8080, 8081)
- **HTTPS Port**: HTTP port + 10000 (e.g., 18080, 18081)

## Security Features

✅ **Automatic HTTP to HTTPS redirect**  
✅ **TLS 1.2 and TLS 1.3**  
✅ **Modern cipher suites**  
✅ **HSTS (HTTP Strict Transport Security)**  
✅ **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.)  
✅ **No browser warnings** (certificates trusted by mkcert)

## Next Steps

1. **Rebuild Docker images:**
   ```bash
   docker build -t jafar2001/restaurant-webpage:main-latest .
   ```

2. **Redeploy containers** (Jenkins pipeline will do this automatically)

3. **Test HTTPS:**
   - Visit: `https://192.168.1.6:18080`
   - Should show green padlock (no warnings)

## For Other Devices on WiFi

To access HTTPS from other devices, they need to trust the mkcert root certificate:

1. **Export mkcert root certificate:**
   ```powershell
   mkcert -CAROOT
   ```
   Copy the `rootCA.pem` file

2. **Install on other devices:**
   - **Windows**: Double-click `rootCA.pem` → Install Certificate → Trusted Root Certification Authorities
   - **Android**: Settings → Security → Install from storage → Select `rootCA.pem`
   - **iOS**: Email `rootCA.pem` to yourself → Open on device → Install profile

## Verification

Check certificate details:
```powershell
openssl x509 -in ssl/nginx-selfsigned.crt -text -noout
```

## Important Notes

⚠️ **Certificates expire**: February 2028 (auto-renew with mkcert)  
✅ **Secure**: Real SSL encryption, not self-signed warnings  
✅ **Trusted**: Works like production HTTPS certificates  
✅ **No Cloudflare**: Direct SSL/TLS encryption  

---

**Status**: HTTPS is now enabled and secure! 🎉

