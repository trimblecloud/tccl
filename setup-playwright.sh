#!/bin/bash

# Install Playwright and its dependencies
npm install -D @playwright/test
npx playwright install

# Set up test directories if they don't exist
mkdir -p tests/navigation

echo "Playwright test environment set up successfully!"
echo "Run tests with: npm run test:e2e"
