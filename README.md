# Test Automation Demo

This project is an automated UI test framework for Sauce Demo using Playwright and write in TypeScript. This framework is using the Page Object Model pattern to keep page selectors and page actions separate from the test scenarios.

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

## Install Playwright

```bash
npx playwright install
```

## Run Tests

```bash
npm run test
```

## Open report

```bash
npm run report
```

## Run GitHub Actions

This project runs tests automatically when new changes are pushed to the `main` branch.

To run the workflow manually:

1. Open the repository on GitHub.
2. Go to the `Actions` tab.
3. Select the `Test` workflow.
4. Click `Run workflow`.
5. Select the `main` branch, then click `Run workflow`.

Before running in GitHub Actions, make sure these repository secrets are configured:

- `BASE_URL`
- `PASSWORD`
- `STANDARD_USERNAME`
- `LOCKED_OUT_USERNAME`
- `PROBLEM_USERNAME`
- `PERFORMANCE_GLITCH_USERNAME`
- `ERROR_USERNAME`
- `VISUAL_USERNAME`

Download the uploaded artifacts to view the reports.

## Next improvement

- Add more test cases
- Integrate with any tools
