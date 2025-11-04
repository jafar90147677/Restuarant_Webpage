pipeline {
    agent any
    
    options {
        timestamps()
        buildDiscarder(logRotator(
            numToKeepStr: '10',
            daysToKeepStr: '7'
        ))
        timeout(time: 30, unit: 'MINUTES')
        retry(1)
    }
    
    environment {
        // Docker configuration
        DOCKER_IMAGE_NAME = "jafar2001/restaurant-webpage"
        DOCKER_REGISTRY = "docker.io"
        IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
        LATEST_TAG = "${env.BRANCH_NAME}-latest"
        
        // Credential IDs (configured in Jenkins)
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        GITHUB_CREDENTIALS_ID = "github-credentials"
        
        // Port mapping per branch
        CONTAINER_PORT = getPortForBranch("${env.BRANCH_NAME}")
        CONTAINER_NAME = "restaurant-${env.BRANCH_NAME}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "=========================================="
                    echo "Branch: ${env.BRANCH_NAME}"
                    echo "Build Number: ${env.BUILD_NUMBER}"
                    echo "Commit: ${env.GIT_COMMIT.take(7)}"
                    echo "=========================================="
                    checkout scm
                }
            }
        }
        
        stage('Validate Repository') {
            steps {
                script {
                    echo "Validating repository structure..."
                    def requiredFiles = [
                        'index.html',
                        'styles.css',
                        'script.js',
                        'Dockerfile'
                    ]
                    
                    requiredFiles.each { file ->
                        if (!fileExists(file)) {
                            error("Required file missing: ${file}")
                        }
                    }
                    echo "✓ Repository structure validated"
                }
            }
        }
        
        stage('Setup Python Environment') {
            steps {
                script {
                    echo "Setting up Python virtual environment..."
                    sh '''
                        python3 --version || python --version
                        python3 -m venv venv || python -m venv venv
                        source venv/bin/activate || . venv/bin/activate || venv\\Scripts\\activate
                        pip install --upgrade pip --quiet
                        pip install -r requirements.txt --quiet
                        echo "✓ Python environment ready"
                    '''
                }
            }
        }
        
        stage('Run Pytest Tests') {
            steps {
                script {
                    echo "Running pytest for branch: ${env.BRANCH_NAME}"
                    sh '''
                        source venv/bin/activate || . venv/bin/activate || venv\\Scripts\\activate
                        pytest tests/ \
                            -v \
                            --tb=short \
                            --junitxml=pytest-report.xml \
                            --html=pytest-report.html \
                            --self-contained-html \
                            --cov=. \
                            --cov-report=html \
                            --cov-report=xml \
                            || true
                    '''
                }
            }
            post {
                always {
                    junit testResultsPattern: 'pytest-report.xml'
                    publishHTML([
                        reportDir: '.',
                        reportFiles: 'pytest-report.html',
                        reportName: 'Pytest HTML Report'
                    ])
                    archiveArtifacts artifacts: 'pytest-report.xml, pytest-report.html', 
                                    allowEmptyArchive: true
                    archiveArtifacts artifacts: 'htmlcov/**/*', 
                                    allowEmptyArchive: true
                }
                success {
                    echo "✓ All tests passed"
                }
                failure {
                    echo "✗ Some tests failed (check reports)"
                }
            }
        }
        
        stage('Build Application') {
            steps {
                script {
                    echo "Building application for branch: ${env.BRANCH_NAME}"
                    sh '''
                        echo "=== Build Validation ==="
                        
                        # HTML validation
                        echo "Validating HTML files..."
                        find . -name "*.html" -type f ! -path "./venv/*" ! -path "./.git/*" | while read file; do
                            echo "  Checking: $file"
                            if ! grep -q "<!DOCTYPE html" "$file" 2>/dev/null; then
                                echo "  ⚠ Warning: $file may not have proper DOCTYPE"
                            fi
                        done
                        
                        # JavaScript syntax check (if Node.js available)
                        if command -v node &> /dev/null; then
                            echo "Validating JavaScript files..."
                            find . -name "*.js" -type f ! -path "./venv/*" ! -path "./node_modules/*" ! -path "./.git/*" | while read file; do
                                echo "  Checking: $file"
                                node --check "$file" 2>/dev/null || echo "  ⚠ Warning: $file may have syntax issues"
                            done
                        else
                            echo "Node.js not available, skipping JS validation"
                        fi
                        
                        # File size check
                        echo "Checking file sizes..."
                        find . -type f \\( -name "*.html" -o -name "*.css" -o -name "*.js" \\) \\
                            ! -path "./venv/*" ! -path "./.git/*" | while read file; do
                            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo "0")
                            if [ "$size" -gt 1048576 ]; then
                                echo "  ⚠ Warning: $file is large ($size bytes)"
                            fi
                        done
                        
                        echo "=== Build Complete ==="
                        echo "✓ Application built successfully"
                    '''
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    echo "Building Docker image for branch: ${env.BRANCH_NAME}"
                    withCredentials([usernamePassword(
                        credentialsId: "${DOCKER_CREDENTIALS_ID}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo "Logging into Docker Hub..."
                            echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                            
                            echo "Building image: ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}"
                            docker build \
                                --tag ${DOCKER_IMAGE_NAME}:${IMAGE_TAG} \
                                --tag ${DOCKER_IMAGE_NAME}:${LATEST_TAG} \
                                --label "branch=${env.BRANCH_NAME}" \
                                --label "build=${env.BUILD_NUMBER}" \
                                --label "commit=${env.GIT_COMMIT.take(7)}" \
                                .
                            
                            echo "✓ Docker image built successfully"
                            docker images ${DOCKER_IMAGE_NAME}:${IMAGE_TAG} --format "{{.Repository}}:{{.Tag}} - {{.Size}}"
                        """
                    }
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    echo "Pushing Docker image to registry..."
                    withCredentials([usernamePassword(
                        credentialsId: "${DOCKER_CREDENTIALS_ID}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                            docker push ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}
                            docker push ${DOCKER_IMAGE_NAME}:${LATEST_TAG}
                            echo "✓ Image pushed to registry"
                        """
                    }
                }
            }
        }
        
        stage('Docker Deploy') {
            steps {
                script {
                    echo "Deploying container for branch: ${env.BRANCH_NAME}"
                    sh """
                        # Stop existing container if running
                        if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}\$"; then
                            echo "Stopping existing container: ${CONTAINER_NAME}"
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true
                        fi
                        
                        # Run new container
                        echo "Starting container: ${CONTAINER_NAME}"
                        docker run -d \\
                            --name ${CONTAINER_NAME} \\
                            --restart unless-stopped \\
                            -p ${CONTAINER_PORT}:80 \\
                            --health-cmd="wget --quiet --tries=1 --spider http://localhost/health || exit 1" \\
                            --health-interval=30s \\
                            --health-timeout=3s \\
                            --health-retries=3 \\
                            --label "branch=${env.BRANCH_NAME}" \\
                            --label "build=${env.BUILD_NUMBER}" \\
                            ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}
                        
                        echo "✓ Container deployed successfully"
                        echo "Container ID: \$(docker ps -q -f name=${CONTAINER_NAME})"
                        echo "Access URL: http://localhost:${CONTAINER_PORT}"
                        
                        # Wait for health check
                        echo "Waiting for container to be healthy..."
                        sleep 5
                        docker inspect --format='{{.State.Health.Status}}' ${CONTAINER_NAME} || echo "Health check not available"
                    """
                }
            }
        }
    }
    
    post {
        success {
            script {
                echo """
                ==========================================
                ✓ Pipeline SUCCESS
                ==========================================
                Branch: ${env.BRANCH_NAME}
                Build: ${env.BUILD_NUMBER}
                Image: ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}
                Container: ${CONTAINER_NAME}
                Port: ${CONTAINER_PORT}
                URL: http://localhost:${CONTAINER_PORT}
                ==========================================
                """
            }
        }
        failure {
            echo """
            ==========================================
            ✗ Pipeline FAILED
            ==========================================
            Branch: ${env.BRANCH_NAME}
            Build: ${env.BUILD_NUMBER}
            Check logs above for details
            ==========================================
            """
        }
        always {
            script {
                // Cleanup
                sh '''
                    echo "Cleaning up..."
                    # Remove dangling images older than 1 hour
                    docker image prune -f --filter "until=1h" || true
                    
                    # Remove old containers (optional)
                    docker container prune -f --filter "until=24h" || true
                '''
                
                // Archive build artifacts
                archiveArtifacts artifacts: 'pytest-report.xml, pytest-report.html', 
                                allowEmptyArchive: true
            }
        }
    }
}

// Helper function to assign ports per branch
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

