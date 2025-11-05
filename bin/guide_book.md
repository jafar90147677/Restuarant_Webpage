# Complete Setup Guide Book
## Restaurant Webpage - Jenkins CI/CD Pipeline

**Version:** 1.0  
**Last Updated:** 2024  
**Project:** Restaurant Webpage - Eat Well😋

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Jenkins Installation & Setup](#jenkins-installation--setup)
4. [Jenkins Plugins Installation](#jenkins-plugins-installation)
5. [Jenkins Credentials Configuration](#jenkins-credentials-configuration)
6. [Jenkinsfile Creation & Structure](#jenkinsfile-creation--structure)
7. [Multibranch Pipeline Creation](#multibranch-pipeline-creation)
8. [GitHub Webhook Setup](#github-webhook-setup)
9. [Docker Setup](#docker-setup)
10. [Network Access (WiFi)](#network-access-wifi)
11. [Pipeline Stages Explained](#pipeline-stages-explained)
12. [Branch and Port Mapping](#branch-and-port-mapping)
13. [Troubleshooting](#troubleshooting)
14. [Quick Reference](#quick-reference)

---

## Project Overview

This project is a restaurant webpage built with:
- **Frontend:** HTML, CSS, JavaScript
- **Testing:** Python (pytest)
- **Containerization:** Docker
- **CI/CD:** Jenkins Multibranch Pipeline
- **Web Server:** Nginx (inside Docker container)
- **Network:** HTTP-only for local WiFi access

### Project Structure

```
Restuarant_Webpage/
├── index.html              # Main webpage
├── styles.css              # Stylesheet
├── script.js               # JavaScript functionality
├── logger.js               # Logging utility
├── log_viewer.html         # Log viewer page
├── test_fixes.html         # Test fixes page
├── test_transaction_ids.html # Transaction ID tests
├── a.a.s.surya_qr.png      # QR code image
├── project_log.txt         # Project log
├── Jenkinsfile             # Jenkins pipeline definition
├── Dockerfile              # Docker image definition
├── nginx.conf              # Nginx configuration
├── requirements.txt        # Python dependencies
├── pytest.ini             # Pytest configuration
└── tests/                  # Test files
    ├── __init__.py
    ├── test_html_validation.py
    ├── test_css_validation.py
    ├── test_javascript_validation.py
    └── test_integration.py
```

---

## Prerequisites

### Required Software

1. **Docker Desktop** (Windows/Mac/Linux)
   - Download: https://www.docker.com/products/docker-desktop
   - Verify: `docker --version`

2. **Python 3.7+**
   - Download: https://www.python.org/downloads/
   - Verify: `python --version` or `python3 --version`

3. **Git**
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

4. **Jenkins**
   - Can be installed via Docker or standalone
   - See [Jenkins Installation](#jenkins-installation--setup)

### Required Accounts

1. **Docker Hub Account**
   - Sign up: https://hub.docker.com/signup
   - Create repository: `jafar2001/restaurant-webpage`
   - Generate access token (Settings → Security → New Access Token)

2. **GitHub Account**
   - Repository: `https://github.com/jafar90147677/Restuarant_Webpage`
   - Personal Access Token (Settings → Developer settings → Personal access tokens)

### Required Ports

- **Jenkins:** 8080 (default) or 32768 (Docker)
- **Docker Containers:**
  - `main` branch: 8080
  - `develop` branch: 8081
  - `staging` branch: 8082
  - `test` branch: 8083
  - Other branches: 8000-8099 (auto-assigned)

---

## Jenkins Installation & Setup

### Option 1: Jenkins via Docker (Recommended)

#### Step 1: Create Jenkins Docker Container

```bash
docker run -d \
  --name jenkins \
  --restart unless-stopped \
  -p 32768:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

**Explanation:**
- `-p 32768:8080` - Maps Jenkins web UI to port 32768
- `-p 50000:50000` - Maps Jenkins agent port
- `-v jenkins_home:/var/jenkins_home` - Persistent storage
- `-v /var/run/docker.sock:/var/run/docker.sock` - Docker socket access (for building images)

#### Step 2: Get Initial Admin Password

```bash
# On Linux/Mac
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# On Windows PowerShell
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

#### Step 3: Complete Initial Setup

1. Open browser: `http://localhost:32768`
2. Enter the initial admin password
3. Click **"Install suggested plugins"**
4. Wait for installation to complete
5. Create admin user (or skip and continue with admin)
6. Configure Jenkins URL: `http://localhost:32768`
7. Click **"Save and Finish"**

### Option 2: Jenkins Standalone Installation

#### Windows:
1. Download Jenkins: https://www.jenkins.io/download/
2. Run installer: `jenkins.msi`
3. Follow installation wizard
4. Access: `http://localhost:8080`

#### Linux:
```bash
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

#### Mac:
```bash
brew install jenkins-lts
brew services start jenkins-lts
```

---

## Jenkins Plugins Installation

### Required Plugins

1. **Git Plugin**
2. **GitHub Plugin**
3. **GitHub Branch Source Plugin**
4. **Multibranch Pipeline Plugin**
5. **Docker Pipeline Plugin**
6. **Pipeline Plugin**
7. **Timestamper Plugin**
8. **Build Timeout Plugin**
9. **HTML Publisher Plugin** (for test reports)

### Installation Steps

1. **Access Jenkins:**
   - URL: `http://localhost:32768` (or `http://localhost:8080` for standalone)
   - Login with admin credentials

2. **Navigate to Plugin Manager:**
   - Click **"Manage Jenkins"** (left sidebar)
   - Click **"Manage Plugins"**
   - Go to **"Available"** tab

3. **Install Plugins:**
   - Search for each plugin name
   - Check the box next to each plugin
   - Click **"Install without restart"** (or **"Download now and install after restart"**)

4. **Verify Installation:**
   - Go to **"Installed"** tab
   - Confirm all plugins are listed with green checkmarks

### Alternative: Install via Jenkins CLI

```bash
# List of plugin IDs
PLUGINS="git github github-branch-source workflow-aggregator docker-workflow timestamper build-timeout htmlpublisher"

# Install via Jenkins CLI
java -jar jenkins-cli.jar -s http://localhost:32768 install-plugin $PLUGINS
```

---

## Jenkins Credentials Configuration

### Step 1: Access Credentials Manager

1. In Jenkins, click **"Manage Jenkins"**
2. Click **"Manage Credentials"**
3. Click **"(global)"** under "Domains"
4. Click **"Add Credentials"** (left sidebar)

### Step 2: Configure Docker Hub Credentials

1. **Kind:** Select **"Username with password"**

2. **Scope:** Select **"Global"**

3. **Username:** Enter your Docker Hub username
   - Example: `jafar2001`

4. **Password:** Enter your Docker Hub access token
   - **NOT your password!** Use an access token
   - Generate token: Docker Hub → Settings → Security → New Access Token

5. **ID:** Enter `docker-hub-credentials`
   - **IMPORTANT:** This ID must match `DOCKER_CREDENTIALS_ID` in Jenkinsfile

6. **Description:** `Docker Hub credentials for image push/pull`

7. Click **"OK"**

### Step 3: Configure GitHub Credentials

1. Click **"Add Credentials"** again

2. **Kind:** Select **"Secret text"** or **"Username with password"**

3. **Scope:** Select **"Global"**

4. **Secret:** Enter your GitHub Personal Access Token
   - Generate token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Scopes needed: `repo`, `admin:repo_hook`

5. **ID:** Enter `github-credentials`
   - **IMPORTANT:** This ID must match `GITHUB_CREDENTIALS_ID` in Jenkinsfile

6. **Description:** `GitHub credentials for repository access`

7. Click **"OK"**

### Step 4: Verify Credentials

1. Go to **"Manage Credentials"**
2. Verify both credentials are listed:
   - `docker-hub-credentials`
   - `github-credentials`

---

## Jenkinsfile Creation & Structure

### Step 1: Create Jenkinsfile in Repository Root

The `Jenkinsfile` defines the entire CI/CD pipeline. It must be in the root of your Git repository.

### Step 2: Jenkinsfile Structure Explained

```groovy
pipeline {
    agent any                    // Run on any available agent
    
    options {
        timestamps()             // Add timestamps to console output
        buildDiscarder(...)      // Keep last 10 builds, 7 days
        timeout(time: 30, unit: 'MINUTES')
        retry(1)                 // Retry once on failure
    }
    
    environment {
        // Docker configuration
        DOCKER_IMAGE_NAME = "jafar2001/restaurant-webpage"
        DOCKER_REGISTRY = "docker.io"
        IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
        LATEST_TAG = "${env.BRANCH_NAME}-latest"
        
        // Credential IDs (must match Jenkins credentials)
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        GITHUB_CREDENTIALS_ID = "github-credentials"
        
        // Port mapping per branch
        CONTAINER_PORT = getPortForBranch("${env.BRANCH_NAME}")
        CONTAINER_NAME = "restaurant-${env.BRANCH_NAME}"
    }
    
    stages {
        // Pipeline stages defined here
    }
    
    post {
        // Post-build actions
    }
}
```

### Step 3: Key Components

#### Environment Variables

- `DOCKER_IMAGE_NAME`: Docker Hub repository name
- `IMAGE_TAG`: Unique tag for each build (`branch-buildnumber`)
- `LATEST_TAG`: Latest tag for branch (`branch-latest`)
- `CONTAINER_PORT`: Port assigned to branch (via `getPortForBranch()`)
- `CONTAINER_NAME`: Container name (`restaurant-branchname`)

#### Helper Function: Port Mapping

```groovy
def getPortForBranch(branchName) {
    def portMap = [
        'main': '8080',
        'master': '8080',
        'develop': '8081',
        'dev': '8081',
        'staging': '8082',
        'test': '8083'
    ]
    
    if (portMap.containsKey(branchName)) {
        return portMap[branchName]
    }
    
    // Generate consistent port for other branches (8000-8099)
    def port = 8000 + Math.abs(branchName.hashCode() % 100)
    return String.valueOf(port)
}
```

This function:
- Assigns fixed ports for common branches
- Generates consistent ports (8000-8099) for other branches using hash
- Ensures same branch always gets same port

### Step 4: Complete Jenkinsfile

See the full `Jenkinsfile` in your repository root. It includes:

1. **Checkout** - Git checkout
2. **Validate Repository** - Check required files exist
3. **Setup Python Environment** - Create venv and install dependencies
4. **Run Pytest Tests** - Execute test suite
5. **Build Application** - Validate HTML/CSS/JS
6. **Docker Build** - Build Docker image
7. **Docker Push** - Push to Docker Hub
8. **Docker Deploy** - Run container on host

---

## Multibranch Pipeline Creation

### Step 1: Create New Item

1. In Jenkins dashboard, click **"New Item"**
2. Enter job name: `restaurant-multi-2` (or your preferred name)
3. Select **"Multibranch Pipeline"**
4. Click **"OK"**

### Step 2: Configure Branch Sources

1. **Branch Sources** section:
   - Click **"Add source"**
   - Select **"GitHub"**

2. **Credentials:**
   - Click **"Add"** dropdown
   - Select **"Jenkins"**
   - Select **"github-credentials"** (or the ID you configured)
   - If not available, click **"Add"** to create new credential

3. **Repository HTTPS URL:**
   - Enter: `https://github.com/jafar90147677/Restuarant_Webpage`
   - Or use SSH: `git@github.com:jafar90147677/Restuarant_Webpage.git`

4. **Behaviors:**
   - Click **"Add"** → **"Discover branches"**
     - Strategy: **"All branches"** (or **"Exclude branches that are also filed as PRs"**)
   - Click **"Add"** → **"Discover pull requests from origin"**
     - Strategy: **"Merging the pull request with the current target branch revision"**
   - Click **"Add"** → **"Clean before checkout"**
   - Click **"Add"** → **"Check out to matching local branch"**

5. **Scan by hook:**
   - ✅ **Enable "Scan by hook"** (Critical for webhook triggering)
   - This allows GitHub webhooks to trigger builds immediately

### Step 3: Configure Build Configuration

1. **Build Configuration:**
   - **Mode:** Select **"by Jenkinsfile"**
   - **Script Path:** `Jenkinsfile` (default, leave empty if file is in root)

2. **Scan Multibranch Pipeline Triggers:**
   - ❌ **Uncheck "Periodically if not otherwise run"** (if you're using webhooks)
   - Or set to **"1 day"** minimum (to catch missed webhooks)

### Step 4: Configure Additional Settings

1. **Display Name:** Optional custom name
2. **Description:** Optional description
3. **Properties:**
   - Click **"Add property"** → **"GitHub project"**
   - Project URL: `https://github.com/jafar90147677/Restuarant_Webpage`

### Step 5: Save and Scan

1. Click **"Save"**
2. Jenkins will automatically scan for branches
3. You should see branches appear:
   - `main`
   - `develop`
   - Any other branches in repository

### Step 6: Verify Branch Detection

1. After scan completes, you should see:
   - **Branches:** List of detected branches
   - Each branch has its own build history
2. Click on a branch name to see its builds
3. Click **"Scan Multibranch Pipeline Now"** to manually trigger scan

### Step 7: Test Pipeline

1. Click on a branch (e.g., `main`)
2. Click **"Build Now"** (if available)
3. Watch build progress in console output
4. Verify all stages complete successfully

---

## GitHub Webhook Setup

### Step 1: Get Jenkins Public URL

#### Option A: Using ngrok (for local Jenkins)

1. **Install ngrok:**
   - Download: https://ngrok.com/download
   - Extract and add to PATH

2. **Start ngrok:**
   ```bash
   ngrok http 32768
   ```
   - Note the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)

3. **Jenkins URL:** Use the ngrok HTTPS URL

#### Option B: Using Public IP (if Jenkins is publicly accessible)

1. Find your public IP: `curl ifconfig.me`
2. Configure router port forwarding (8080 → your Jenkins port)
3. Use: `http://your-public-ip:32768`

### Step 2: Configure GitHub Webhook

1. **Navigate to GitHub Repository:**
   - Go to: `https://github.com/jafar90147677/Restuarant_Webpage`
   - Click **"Settings"** (top right)
   - Click **"Webhooks"** (left sidebar)
   - Click **"Add webhook"**

2. **Configure Webhook:**
   - **Payload URL:** `https://your-jenkins-url/github-webhook/`
     - Example: `https://abc123.ngrok-free.app/github-webhook/`
     - **IMPORTANT:** Must end with `/github-webhook/`
   - **Content type:** `application/json`
   - **Secret:** Leave empty (or create one if required)
   - **Which events:** Select **"Just the push event"** (for fastest triggering)
   - **Active:** ✅ Checked

3. **Click "Add webhook"**

### Step 3: Verify Webhook Configuration in Jenkins

1. In Jenkins, go to your multibranch pipeline job
2. Click **"Configure"**
3. Under **"Branch Sources"** → **"GitHub"**:
   - ✅ **Enable "Scan by hook"** (if not already enabled)
4. Click **"Save"**

### Step 4: Test Webhook

1. **Make a test commit:**
   ```bash
   git commit --allow-empty -m "Test webhook trigger"
   git push origin main
   ```

2. **Verify in GitHub:**
   - Go to: Repository → Settings → Webhooks
   - Click on your webhook
   - Scroll to **"Recent Deliveries"**
   - Should show green checkmark (200 OK)

3. **Verify in Jenkins:**
   - Build should start within **1-3 seconds** of push
   - Check Jenkins dashboard for new build

### Step 5: Troubleshooting Webhooks

#### Webhook not triggering?

1. **Check ngrok is running:**
   ```bash
   netstat -ano | findstr :4040  # Windows
   netstat -tuln | grep :4040    # Linux/Mac
   ```

2. **Verify webhook URL:**
   - Test in browser: `https://your-jenkins-url/github-webhook/`
   - Should return 200 OK or 404 (both are fine)

3. **Check Jenkins logs:**
   ```bash
   docker logs jenkins --tail 50 | grep -i webhook
   ```

4. **Verify GitHub credentials:**
   - Jenkins → Manage Jenkins → Credentials
   - Ensure `github-credentials` exists

#### Webhook returns 404?

- Ensure URL ends with `/github-webhook/`
- Verify GitHub plugin is installed
- Check Jenkins is accessible via webhook URL

#### Slow triggering?

- Use **"Just the push event"** instead of "Send me everything"
- Enable **"Scan by hook"** in multibranch pipeline
- Disable polling in Jenkins job configuration

---

## Docker Setup

### Step 1: Verify Docker Installation

```bash
docker --version
docker info
```

### Step 2: Configure Docker for Jenkins

#### If Jenkins is in Docker:

1. **Mount Docker socket:**
   ```bash
   docker run -d \
     --name jenkins \
     -v /var/run/docker.sock:/var/run/docker.sock \
     # ... other options
   ```

2. **Verify Docker access:**
   - In Jenkins, go to: **"Manage Jenkins"** → **"System Information"**
   - Look for Docker-related entries

#### If Jenkins is standalone:

- Docker must be installed on Jenkins agent
- Jenkins user must have Docker permissions
- On Linux: Add Jenkins user to docker group:
  ```bash
  sudo usermod -aG docker jenkins
  sudo systemctl restart jenkins
  ```

### Step 3: Create Dockerfile

The `Dockerfile` is already in your repository. Key components:

```dockerfile
FROM nginx:alpine AS production

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx files
RUN rm -rf ./*

# Copy website files
COPY index.html .
COPY styles.css .
COPY script.js .
# ... other files

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create health check file
RUN echo "healthy" > /usr/share/nginx/html/health

# Set permissions
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80 (HTTP only)
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s \
            --timeout=3s \
            --start-period=5s \
            --retries=3 \
            CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Step 4: Create nginx.conf

The `nginx.conf` is already in your repository. It configures:
- HTTP server on port 80
- Gzip compression
- Static asset caching
- Health check endpoint (`/health`)
- Error handling

### Step 5: Test Docker Build Locally

```bash
# Build image
docker build -t restaurant-webpage:test .

# Run container
docker run -d -p 8080:80 --name restaurant-test restaurant-webpage:test

# Test
curl http://localhost:8080

# Check health
curl http://localhost:8080/health

# Stop and remove
docker stop restaurant-test
docker rm restaurant-test
```

### Step 6: Push to Docker Hub

```bash
# Login
docker login

# Tag image
docker tag restaurant-webpage:test jafar2001/restaurant-webpage:test

# Push
docker push jafar2001/restaurant-webpage:test
```

---

## Network Access (WiFi)

### Overview

The project is configured for **HTTP-only** access on local WiFi network. No HTTPS/SSL certificates required.

### Access URLs

- **Local (same machine):** `http://localhost:8038`
- **WiFi Network:** `http://192.168.1.6:8038`
  - Replace `192.168.1.6` with your machine's local IP
  - Replace `8038` with the port assigned to your branch

### Find Your Local IP

#### Windows:
```powershell
ipconfig | findstr IPv4
```

#### Linux/Mac:
```bash
ip addr show | grep inet
# or
ifconfig | grep inet
```

### Configure Windows Firewall

#### PowerShell (Run as Administrator):

```powershell
# Allow port 8038 (or your branch port)
New-NetFirewallRule -DisplayName "Restaurant HTTP 8038" `
    -Direction Inbound -LocalPort 8038 -Protocol TCP -Action Allow

# Verify
Get-NetFirewallRule | Where-Object { $_.DisplayName -like "*Restaurant*" }
```

#### GUI Method:

1. Open **Windows Defender Firewall**
2. Click **"Advanced settings"**
3. Click **"Inbound Rules"** → **"New Rule"**
4. Select **"Port"** → **"Next"**
5. Select **"TCP"** → Enter port: `8038` → **"Next"**
6. Select **"Allow the connection"** → **"Next"**
7. Check all profiles → **"Next"**
8. Name: `Restaurant HTTP 8038` → **"Finish"**

### Verify Network Access

1. **Check container is running:**
   ```bash
   docker ps --filter name=restaurant-main
   ```

2. **Check port is listening:**
   ```bash
   # Windows
   netstat -ano | findstr :8038
   
   # Linux/Mac
   netstat -tuln | grep :8038
   ```

3. **Test from local machine:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:8038" -UseBasicParsing
   ```

4. **Test from another device (same WiFi):**
   - Open browser on device
   - Navigate to: `http://192.168.1.6:8038`
   - **IMPORTANT:** Use `http://` NOT `https://`

### Troubleshooting Network Access

#### Can't access from other devices?

1. **Verify both devices on same WiFi network**
2. **Check Windows Firewall:**
   ```powershell
   Get-NetFirewallRule | Where-Object { $_.DisplayName -like "*Restaurant*" }
   ```
3. **Check container is running:**
   ```bash
   docker ps --filter name=restaurant-main
   ```
4. **Verify port mapping:**
   ```bash
   docker ps --format "{{.Names}}: {{.Ports}}"
   ```
5. **Test from local machine first:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:8038" -UseBasicParsing
   ```

#### Browser shows SSL error?

- **Problem:** Browser is trying HTTPS automatically
- **Solution:** Type `http://` explicitly (not `https://`)
- **Alternative:** Clear browser cache or use incognito window

#### Port already in use?

- Check what's using the port:
  ```bash
  # Windows
  netstat -ano | findstr :8038
  # Find PID, then: tasklist | findstr <PID>
  
  # Linux/Mac
  lsof -i :8038
  ```
- Stop the conflicting service or change port in Jenkinsfile

---

## Pipeline Stages Explained

### Stage 1: Checkout

**Purpose:** Get code from Git repository

**Actions:**
- Checks out code from GitHub
- Uses branch name from multibranch pipeline
- Logs branch, build number, commit hash

**Output:**
```
Branch: main
Build Number: 42
Commit: abc1234
```

### Stage 2: Validate Repository

**Purpose:** Ensure required files exist

**Checks:**
- `index.html`
- `styles.css`
- `script.js`
- `Dockerfile`

**Failure:** Build stops if any file is missing

### Stage 3: Setup Python Environment

**Purpose:** Prepare Python testing environment

**Actions:**
1. Detects Python installation (tries multiple methods)
2. Creates virtual environment (`venv`)
3. Activates virtual environment
4. Upgrades pip
5. Installs dependencies from `requirements.txt`

**Dependencies installed:**
- pytest
- pytest-html
- pytest-cov
- beautifulsoup4
- requests
- etc.

**Failure:** Build stops if Python not found or venv creation fails

### Stage 4: Run Pytest Tests

**Purpose:** Execute test suite

**Actions:**
1. Activates virtual environment
2. Runs pytest on `tests/` directory
3. Generates reports:
   - `pytest-report.xml` (JUnit format)
   - `pytest-report.html` (HTML format)
   - `htmlcov/` (Coverage report)

**Test Files:**
- `test_html_validation.py`
- `test_css_validation.py`
- `test_javascript_validation.py`
- `test_integration.py`

**Failure:** Build stops if any test fails

**Post-actions:**
- Publishes test results to Jenkins
- Archives test reports as artifacts

### Stage 5: Build Application

**Purpose:** Validate application files

**Actions:**
1. Validates HTML files (checks for DOCTYPE)
2. Validates JavaScript syntax (if Node.js available)
3. Checks file sizes (warns if > 1MB)

**Output:** Warnings only (doesn't fail build)

### Stage 6: Docker Build

**Purpose:** Build Docker image

**Actions:**
1. Verifies Docker is installed and accessible
2. Logs into Docker Hub (using credentials)
3. Builds Docker image with tags:
   - `${IMAGE_TAG}`: `main-42` (branch-buildnumber)
   - `${LATEST_TAG}`: `main-latest` (branch-latest)
4. Adds labels: branch, build, commit

**Failure:** Build stops if Docker login or build fails

### Stage 7: Docker Push

**Purpose:** Push image to Docker Hub

**Actions:**
1. Logs into Docker Hub
2. Pushes `${IMAGE_TAG}` image
3. Pushes `${LATEST_TAG}` image

**Failure:** Build stops if push fails

**Common Issues:**
- Invalid credentials
- Repository doesn't exist
- Network connectivity

### Stage 8: Docker Deploy

**Purpose:** Run container on host

**Actions:**
1. Stops existing container (if running)
2. Removes old container
3. Runs new container:
   - Name: `restaurant-{branch}`
   - Port: `{CONTAINER_PORT}:80`
   - Health check enabled
   - Auto-restart enabled
4. Waits for health check

**Container Configuration:**
- Port mapping: `8038:80` (for main branch)
- Health check: `http://localhost/health`
- Restart policy: `unless-stopped`

**Output:**
```
✓ Container deployed successfully
Container ID: abc123...
HTTP URL: http://localhost:8038
Network HTTP: http://192.168.1.6:8038
```

### Post-Build Actions

#### Success:
- Displays summary with:
  - Branch name
  - Build number
  - Image tag
  - Container name
  - Access URLs

#### Failure:
- Displays error message
- Logs failure details

#### Always:
- Cleans up old Docker images (older than 1 hour)
- Cleans up old containers (older than 24 hours)
- Archives test reports

---

## Branch and Port Mapping

### Default Port Assignments

The `getPortForBranch()` function in Jenkinsfile assigns ports:

| Branch Name | Port | Container Name |
|------------|------|----------------|
| `main` | 8080 | `restaurant-main` |
| `master` | 8080 | `restaurant-master` |
| `develop` | 8081 | `restaurant-develop` |
| `dev` | 8081 | `restaurant-dev` |
| `staging` | 8082 | `restaurant-staging` |
| `test` | 8083 | `restaurant-test` |
| Other branches | 8000-8099 | `restaurant-{branch}` |

### Custom Port Assignment

To change port for a branch, edit `getPortForBranch()` in Jenkinsfile:

```groovy
def getPortForBranch(branchName) {
    def portMap = [
        'main': '8080',
        'feature-new-menu': '8084',  // Add custom branch
        'hotfix-bug': '8085'          // Add custom branch
    ]
    // ... rest of function
}
```

### Port Conflicts

If a port is already in use:

1. **Find what's using the port:**
   ```bash
   # Windows
   netstat -ano | findstr :8080
   
   # Linux/Mac
   lsof -i :8080
   ```

2. **Change port in Jenkinsfile:**
   - Edit `getPortForBranch()` function
   - Use a different port number

3. **Rebuild pipeline:**
   - Push changes to branch
   - Pipeline will rebuild with new port

### Multiple Branches Simultaneously

Each branch runs in its own container with its own port:
- `main` → `http://192.168.1.6:8080`
- `develop` → `http://192.168.1.6:8081`
- `staging` → `http://192.168.1.6:8082`

All containers can run simultaneously without conflicts.

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Pipeline Fails: "Python is not installed"

**Error:**
```
ERROR: Python is not installed or not in PATH
```

**Solution:**
- Install Python 3.7+ on Jenkins agent
- Ensure Python is in PATH
- Verify: `python --version` or `python3 --version`

#### 2. Pipeline Fails: "Docker is not installed"

**Error:**
```
ERROR: Docker is not installed or not in PATH
```

**Solution:**
- If Jenkins in Docker: Mount Docker socket:
  ```bash
  -v /var/run/docker.sock:/var/run/docker.sock
  ```
- If Jenkins standalone: Install Docker on agent
- Verify: `docker --version`

#### 3. Pipeline Fails: "Docker Hub login failed"

**Error:**
```
✗ ERROR: Docker Hub login failed
```

**Solution:**
- Check credentials in Jenkins: Manage Jenkins → Credentials
- Verify credential ID matches `DOCKER_CREDENTIALS_ID` in Jenkinsfile
- Use Docker Hub access token (not password)
- Verify token has correct permissions

#### 4. Pipeline Fails: "Tests failed"

**Error:**
```
✗ Tests failed (tests=10, failures=2, errors=0)
```

**Solution:**
- Check test output in Jenkins console
- View test reports: Build → Test Results
- Fix failing tests locally
- Push fixes to branch

#### 5. Container Fails: "Port already in use"

**Error:**
```
Error response from daemon: port is already allocated
```

**Solution:**
- Find and stop conflicting container:
  ```bash
  docker ps -a
  docker stop <container-name>
  docker rm <container-name>
  ```
- Or change port in Jenkinsfile

#### 6. Webhook Not Triggering

**Symptoms:**
- Push to GitHub, but Jenkins build doesn't start
- Webhook shows "Recent Deliveries" but no builds

**Solution:**
- Verify webhook URL is accessible
- Check "Scan by hook" is enabled in Jenkins job
- Verify GitHub plugin is installed
- Check Jenkins logs: `docker logs jenkins --tail 50`

#### 7. Network Access Not Working

**Symptoms:**
- Can't access `http://192.168.1.6:8038` from other devices

**Solution:**
- Verify both devices on same WiFi network
- Check Windows Firewall allows port 8038
- Verify container is running: `docker ps`
- Test locally first: `http://localhost:8038`
- Use `http://` NOT `https://`

#### 8. Browser Shows SSL Error

**Symptoms:**
- Browser shows "ERR_SSL_PROTOCOL_ERROR" or "Your connection is not private"

**Solution:**
- Type `http://` explicitly (not `https://`)
- Clear browser cache
- Use incognito/private window
- Verify nginx.conf doesn't have HTTPS redirects

#### 9. Build Times Out

**Error:**
```
Build timed out after 30 minutes
```

**Solution:**
- Increase timeout in Jenkinsfile:
  ```groovy
  timeout(time: 60, unit: 'MINUTES')
  ```
- Check for hanging tests
- Verify network connectivity

#### 10. Docker Image Push Fails: "denied"

**Error:**
```
denied: requested access to the resource is denied
```

**Solution:**
- Verify repository exists on Docker Hub
- Check you have write access to repository
- Verify Docker Hub credentials are correct
- Ensure image name matches repository name

---

## Quick Reference

### Jenkins URLs

- **Local:** `http://localhost:32768` (Docker) or `http://localhost:8080` (standalone)
- **Public:** `https://your-ngrok-url.ngrok-free.app` (via ngrok)

### Docker Commands

```bash
# List containers
docker ps -a

# View logs
docker logs restaurant-main -f

# Stop container
docker stop restaurant-main

# Remove container
docker rm restaurant-main

# List images
docker images jafar2001/restaurant-webpage

# Remove image
docker rmi jafar2001/restaurant-webpage:main-42
```

### Git Commands

```bash
# Clone repository
git clone https://github.com/jafar90147677/Restuarant_Webpage.git

# Create branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "Description"

# Push to GitHub
git push origin feature/new-feature
```

### PowerShell Commands (Windows)

```powershell
# Test HTTP access
Invoke-WebRequest -Uri "http://localhost:8038" -UseBasicParsing

# Check firewall rules
Get-NetFirewallRule | Where-Object { $_.DisplayName -like "*Restaurant*" }

# Find local IP
ipconfig | findstr IPv4
```

### Port Mapping Quick Reference

| Branch | Port | URL |
|--------|------|-----|
| main | 8080 | `http://192.168.1.6:8080` |
| develop | 8081 | `http://192.168.1.6:8081` |
| staging | 8082 | `http://192.168.1.6:8082` |
| test | 8083 | `http://192.168.1.6:8083` |

### Credential IDs

- **Docker Hub:** `docker-hub-credentials`
- **GitHub:** `github-credentials`

### Important Files

- `Jenkinsfile` - Pipeline definition
- `Dockerfile` - Docker image definition
- `nginx.conf` - Nginx configuration
- `requirements.txt` - Python dependencies
- `pytest.ini` - Pytest configuration

### Contact Information

- **Repository:** https://github.com/jafar90147677/Restuarant_Webpage
- **Docker Hub:** https://hub.docker.com/r/jafar2001/restaurant-webpage

---

## Additional Resources

### Jenkins Documentation
- Official Jenkins Docs: https://www.jenkins.io/doc/
- Pipeline Syntax: https://www.jenkins.io/doc/book/pipeline/syntax/
- Multibranch Pipelines: https://www.jenkins.io/doc/book/pipeline/multibranch/

### Docker Documentation
- Docker Docs: https://docs.docker.com/
- Dockerfile Reference: https://docs.docker.com/reference/dockerfile/

### Nginx Documentation
- Nginx Docs: https://nginx.org/en/docs/
- Nginx Configuration: https://nginx.org/en/docs/http/ngx_http_core_module.html

### Pytest Documentation
- Pytest Docs: https://docs.pytest.org/
- Pytest Best Practices: https://docs.pytest.org/en/stable/goodpractices.html

---

**End of Guide Book**

*This guide covers all aspects of setting up and maintaining the Restaurant Webpage CI/CD pipeline. For additional support, refer to the troubleshooting section or check Jenkins logs.*

