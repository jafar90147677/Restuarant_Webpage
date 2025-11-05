# GitHub Webhook Configuration for Fast Jenkins Triggering

## Current Setup

✅ **ngrok is running** on port 4040  
✅ **Jenkins is accessible** at `http://localhost:32768`  
✅ **Public URL**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev`

## Webhook URL

```
https://nonintercepting-unexperimental-ryan.ngrok-free.dev/github-webhook/
```

## Step-by-Step Setup

### 1. Configure GitHub Webhook

1. Go to: https://github.com/jafar90147677/Restuarant_Webpage/settings/hooks
2. Click **"Add webhook"** button
3. Fill in the form:
   - **Payload URL**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev/github-webhook/`
   - **Content type**: Select `application/json`
   - **Secret**: Leave empty (or configure if needed)
   - **Which events would you like to trigger this webhook?**: Select **"Just the push event"** (for fastest triggering)
   - **Active**: ✓ Check this box
4. Click **"Add webhook"**

### 2. Configure Jenkins Multibranch Pipeline

1. Go to Jenkins: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev`
2. Navigate to your job: **restaurant-multi-2**
3. Click **"Configure"**
4. Under **"Branch Sources"** → **"GitHub"**:
   - Ensure **"Scan by hook"** is enabled (this enables immediate triggering)
   - Disable polling if enabled (to avoid unnecessary scans)
5. Click **"Save"**

### 3. Test the Webhook

#### Quick Test:
```bash
git commit --allow-empty -m "Test webhook trigger"
git push origin main
```

**Expected Result**: Jenkins build should start within **1-3 seconds** of push.

#### Verify Webhook Delivery:
1. Go to GitHub: Repository → Settings → Webhooks
2. Click on your webhook
3. Scroll to **"Recent Deliveries"**
4. Check for:
   - ✅ Green checkmark = Success (200 OK)
   - ❌ Red X = Failed (check response)

## Verification Checklist

- [ ] Webhook added in GitHub
- [ ] Webhook shows recent deliveries
- [ ] Jenkins build triggers within 1-3 seconds of push
- [ ] Build status appears in GitHub commit
- [ ] No errors in Jenkins logs

## Troubleshooting

### Webhook not triggering?
1. **Check ngrok is running**: 
   ```powershell
   netstat -ano | findstr :4040
   ```

2. **Verify webhook URL is correct**: Must match exactly:
   ```
   https://nonintercepting-unexperimental-ryan.ngrok-free.dev/github-webhook/
   ```

3. **Check GitHub webhook delivery**:
   - Go to: Settings → Webhooks → Recent Deliveries
   - Look for error messages

4. **Check Jenkins logs**:
   ```bash
   docker logs jenkins --tail 50
   ```

5. **Verify Jenkins GitHub plugin**:
   - Go to: Jenkins → Manage Jenkins → Manage Plugins
   - Ensure "GitHub plugin" is installed

### Webhook returns 404?
- Ensure URL ends with `/github-webhook/` (trailing slash)
- Verify GitHub plugin is installed in Jenkins
- Check Jenkins is accessible via ngrok URL

### Slow triggering (>5 seconds)?
- Enable **"Scan by hook"** in multibranch pipeline
- Use **"Just the push event"** instead of "Send me everything"
- Disable polling in Jenkins job configuration

## Important Notes

⚠️ **ngrok URL Changes**: If you restart ngrok, the URL will change. You must update the webhook in GitHub.

💡 **Stable URL**: For production, consider using ngrok with a reserved domain:
```bash
ngrok http 32768 --domain=your-reserved-domain.ngrok.io
```

## Current URLs

- **Jenkins Dashboard**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev`
- **Webhook Endpoint**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev/github-webhook/`
- **GitHub Repository**: `https://github.com/jafar90147677/Restuarant_Webpage`

## Next Steps

1. ✅ Add webhook in GitHub (use URL above)
2. ✅ Enable "Scan by hook" in Jenkins multibranch pipeline
3. ✅ Test with empty commit
4. ✅ Verify build triggers within 1-3 seconds
5. ✅ Monitor webhook deliveries in GitHub

---

**Status**: Ready for webhook configuration  
**Webhook URL**: `https://nonintercepting-unexperimental-ryan.ngrok-free.dev/github-webhook/`

