import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.title).toHaveText('Products');
  }

  async addProductToCart(productName: string) {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await expect(product).toBeVisible();
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getFirstProductName() {
    const name = await this.page
      .getByTestId('inventory-item-name')
      .first()
      .textContent();

    if (!name) {
      throw new Error('Unable to read the first product name');
    }

    return name.trim();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
