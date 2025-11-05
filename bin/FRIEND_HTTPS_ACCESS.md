# How to Access HTTPS Site from Friend's Device

## The Problem

The link `https://192.168.1.6:18038` doesn't work because your friend's device doesn't trust the SSL certificate.

## Solution: Install mkcert Root Certificate on Friend's Device

### Step 1: Get the Root Certificate

On your computer, run:
```powershell
mkcert -CAROOT
```

This will show the path to the root certificate (usually `C:\Users\YourUsername\AppData\Local\mkcert`)

### Step 2: Share the Root Certificate

Copy the `rootCA.pem` file from that directory and share it with your friend via:
- Email
- USB drive
- Cloud storage (Google Drive, Dropbox, etc.)

### Step 3: Install on Friend's Device

#### For Windows:
1. Double-click `rootCA.pem`
2. Click "Install Certificate"
3. Select "Current User" or "Local Machine"
4. Choose "Place all certificates in the following store"
5. Click "Browse" → Select "Trusted Root Certification Authorities"
6. Click "Next" → "Finish"
7. Click "Yes" on the security warning

#### For Android:
1. Transfer `rootCA.pem` to the device
2. Settings → Security → Install from storage
3. Select `rootCA.pem`
4. Name it (e.g., "Restaurant CA")
5. Install

#### For iOS/iPhone:
1. Email `rootCA.pem` to yourself
2. Open email on iPhone
3. Tap the attachment
4. Settings → General → VPN & Device Management
5. Tap the certificate → Install

#### For Mac:
1. Double-click `rootCA.pem`
2. Keychain Access opens
3. Find "mkcert" certificate
4. Double-click → Expand "Trust"
5. Set "When using this certificate" to "Always Trust"

### Step 4: Access the Site

After installing the certificate:
1. Open browser
2. Go to: `https://192.168.1.6:18038`
3. Should show green padlock (no warnings)

## Alternative: Use HTTP (Less Secure)

If installing certificates is not possible, use HTTP (will redirect to HTTPS but may show warnings):

```
http://192.168.1.6:8038
```

## Quick Certificate Export Script

Run this on your computer to get the certificate:

```powershell
$caPath = mkcert -CAROOT
Copy-Item "$caPath\rootCA.pem" .\rootCA-for-friends.pem
Write-Host "Certificate copied to: rootCA-for-friends.pem"
```

Share `rootCA-for-friends.pem` with your friend.

