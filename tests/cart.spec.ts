import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CartPage } from '../src/pages/CartPage';
import { LoginPage } from '../src/pages/LoginPage';
import { getEnv } from '../src/config/env';
import { ProductsPage } from '../src/pages/ProductsPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login(getEnv('STANDARD_USERNAME'), getEnv('PASSWORD'));
  await productsPage.expectLoaded();
});

test.describe('Cart', () => {
  test('User can add one product to cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    const productsPage = new ProductsPage(page);

    const productName = await productsPage.getFirstProductName();

    await productsPage.addProductToCart(productName);
    await productsPage.openCart();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.cartItem).toHaveCount(1);
    await expect(cartPage.quantity).toHaveText('1');
    await expect(cartPage.itemName).toHaveText(productName);
  });

  test('User can checkout the cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    const productsPage = new ProductsPage(page);

    const productName = await productsPage.getFirstProductName();

    await productsPage.addProductToCart(productName);
    await productsPage.openCart();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.title).toHaveText('Your Cart');

    await cartPage.checkoutButton.click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(cartPage.title).toHaveText('Checkout: Your Information');

    await cartPage.firstNameInput.pressSequentially(faker.person.firstName(), {
      delay: 100,
    });
    await cartPage.lastNameInput.pressSequentially(faker.person.lastName(), {
      delay: 100,
    });
    await cartPage.postalCodeInput.pressSequentially(faker.location.zipCode(), {
      delay: 100,
    });

    await cartPage.continueButton.click();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(cartPage.title).toHaveText('Checkout: Overview');

    await cartPage.finishButton.click();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(cartPage.title).toHaveText('Checkout: Complete!');
    await expect(cartPage.completeHeader).toHaveText(
      'Thank you for your order!',
    );

    await cartPage.backHomeButton.click();
    await productsPage.expectLoaded();
  });
});
