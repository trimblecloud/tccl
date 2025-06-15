# TCCL Website Navigation Tests

This directory contains automated tests for validating the navigation functionality of the TCCL website.

## Test Structure

- `navigation/navigation.spec.js`: Tests for validating all navigation menu items and their functionality.

## Running Tests

To run the navigation tests:

```bash
# Install dependencies (if not already installed)
npm install

# Run all tests
npm run test:e2e

# Run specific tests
npx playwright test tests/navigation

# Run tests with UI mode
npx playwright test --ui

# Generate and view test report
npx playwright show-report
```

## Test Coverage

The navigation tests validate:

1. Presence of all navigation menu items
2. Navigation to each page
3. Content verification on each page
4. Dark mode toggle functionality

## Additional Notes

- These tests run against the deployed site at `https://trimblecloud.github.io/tccl`
- The tests are configured to run on Chromium, Firefox, and WebKit browsers
- Screenshots are taken on test failures
