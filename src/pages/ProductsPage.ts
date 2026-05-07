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
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.title).toHaveText('Products');
  }

  async addProductToCart(productName: string) {
    const product = this.getProductByName(productName);

    await expect(product).toBeVisible();
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  getProductByName(productName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
  }

  async getProductName(productName: string) {
    const product = this.getProductByName(productName);
    const name = await product.getByTestId('inventory-item-name').textContent();

    if (!name) {
      throw new Error(`Unable to read product name for ${productName}`);
    }

    return name;
  }

  async openCart() {
    await this.cartLink.click();
  }
}
