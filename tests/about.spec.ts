// saucelabs.com
import { test, expect } from '@playwright/test';
import { loginUsers } from '../src/data/loginUsers';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { url } from 'node:inspector';

// validate login behavior for the current test user
test('About page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login(loginUsers[0].username, loginUsers[0].password);

  await productsPage.burgerButton.click({ force: true });
  await productsPage.aboutBtn.click();
  await expect(page).toHaveURL('https://saucelabs.com/');
});
