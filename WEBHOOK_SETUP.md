# GitHub Webhook Setup for Fast Jenkins Triggering

## Current Configuration

- **Jenkins URL (via ngrok)**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev`
- **Jenkins Local URL**: `http://localhost:32768`
- **Webhook Endpoint**: `/github-webhook/`

## Step 1: Configure GitHub Webhook

1. Go to your GitHub repository: `https://github.com/jafar90147677/Restuarant_Webpage`

2. Navigate to **Settings** → **Webhooks** → **Add webhook**

3. Configure the webhook:
   - **Payload URL**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev/github-webhook/`
   - **Content type**: `application/json`
   - **Secret**: Leave empty (or create one if Jenkins requires it)
   - **Events**: Select **"Just the push event"** for fastest triggering
   - **Active**: ✓ Checked

4. Click **"Add webhook"**

## Step 2: Verify Jenkins Webhook Configuration

Jenkins should automatically handle GitHub webhooks if the GitHub plugin is installed.

### Check Jenkins GitHub Plugin:
- Go to: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev/pluginManager/installed`
- Verify these plugins are installed:
  - GitHub plugin
  - GitHub Branch Source Plugin
  - Multibranch Pipeline Plugin

### Configure Multibranch Pipeline:
1. Go to your Jenkins job: `restaurant-multi-2`
2. Click **"Configure"**
3. Under **"Branch Sources"** → **"GitHub"**:
   - Ensure **"Scan by hook"** is enabled
   - This allows immediate triggering on push events

## Step 3: Test the Webhook

### Option 1: Push a test commit
```bash
git commit --allow-empty -m "Test webhook trigger"
git push origin main
```

### Option 2: Manually trigger webhook
1. Go to GitHub repository → **Settings** → **Webhooks**
2. Find your webhook
3. Click **"Recent Deliveries"**
4. Click on a delivery and **"Redeliver"**

## Step 4: Verify Fast Triggering

After pushing code:
1. Check Jenkins dashboard immediately
2. Build should start within **1-3 seconds** of push
3. Check webhook delivery status in GitHub:
   - Green checkmark = Success
   - Red X = Failed (check logs)

## Troubleshooting

### Webhook not triggering?
1. **Check ngrok is running**: `netstat -ano | findstr :4040`
2. **Verify webhook URL**: Must be accessible from internet
3. **Check Jenkins logs**: `docker logs jenkins --tail 50`
4. **Verify GitHub credentials**: Jenkins → Manage Jenkins → Credentials

### Webhook returns 404?
- Ensure URL ends with `/github-webhook/`
- Verify GitHub plugin is installed
- Check Jenkins is accessible via ngrok URL

### Slow triggering?
- Use **"Just the push event"** instead of "Send me everything"
- Enable **"Scan by hook"** in multibranch pipeline
- Disable polling in Jenkins job configuration

## Webhook URL Format

For multibranch pipelines:
- **Standard**: `https://[jenkins-url]/github-webhook/`
- **Alternative**: `https://[jenkins-url]/multibranch-webhook-trigger/`

## Important Notes

⚠️ **ngrok URL changes**: If you restart ngrok, the URL will change. Update the webhook in GitHub.

⚠️ **Persistence**: Consider using ngrok with reserved domain for stable URLs:
```bash
ngrok http 32768 --domain=your-reserved-domain.ngrok.io
```

## Quick Reference

- **Jenkins Dashboard**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev`
- **Webhook Endpoint**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev/github-webhook/`
- **Repository**: `https://github.com/jafar90147677/Restuarant_Webpage`

