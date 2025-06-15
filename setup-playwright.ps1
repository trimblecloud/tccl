# Install Playwright and its dependencies
npm install -D @playwright/test
npx playwright install

# Set up test directories if they don't exist
if (-not (Test-Path -Path "tests\navigation")) {
    New-Item -ItemType Directory -Force -Path "tests\navigation"
}

Write-Host "Playwright test environment set up successfully!" -ForegroundColor Green
Write-Host "Run tests with: npm run test:e2e" -ForegroundColor Yellow
