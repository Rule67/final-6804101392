# Playwright Final Exam

## Project Overview

This project contains automated tests for the SauceDemo website using Playwright and TypeScript.

## Test Cases

### Unit Tests
- **UT-01:** Login Form Validation
- **UT-02:** Add to Cart → Remove → Add to Cart

### Integration Tests
- **IT-01:** Real Login with Stub Inventory
- **IT-02:** Driver Login State with Real Inventory and Cart

### System Tests
- **ST-01:** Complete Purchase of Two Products
- **ST-02:** Checkout Validation and Recovery

## Technologies

- Node.js
- TypeScript
- Playwright
- Chromium

## How to Run Tests

Install dependencies:

```bash
npm install
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Test Reports

- HTML Report: `playwright-report/index.html`
- JSON Report: `reports/results.json`
- Test Summary: `reports/test-summary.md`
