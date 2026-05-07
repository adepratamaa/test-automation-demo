# Test Automation Demo

This project is an automated UI test framework for Sauce Demo using Playwright

## Framework Structure

- `playwright.config.ts` contains Playwright test configuration.
- `src/pages` contains Page Object Model classes.
- `src/data` contains test data loaded from environment variables.
- `tests` contains the test specifications.
- `.env` stores the base URL, usernames, and password.

## Test Scenarios

- Login validation
- Add product to cart
- Checkout product

## Install Dependencies

```bash
npm install
```

## Install Playwright Browser

```bash
npx playwright install
```

## Run Tests

```bash
npm run test
```

## Run Tests in Headed Mode

```bash
npm run test:headed
```

## Open HTML Report

```bash
npm run report
```

## Open HTML report using Allure

```bash
npx allure open ./allure-results
```

## Next improvement

- Integrate with CI/CD
