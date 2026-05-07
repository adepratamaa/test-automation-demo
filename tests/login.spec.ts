import { test, expect } from '@playwright/test';
import { loginUsers } from '../src/data/loginUsers';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';

for (let i = 0; i < loginUsers.length; i++) {
  const user = loginUsers[i];

  test(`${user.label} login validation`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.login(user.username, user.password);

    if (!user.canLogin) {
      await expect(loginPage.errorMessage).toHaveText(
        user.expectedError ?? 'Unknkown error',
      );
    } else {
      await expect(loginPage.page).toHaveURL('/inventory.html');
      await expect(productsPage.title).toHaveText('Products');
    }
  });
}
