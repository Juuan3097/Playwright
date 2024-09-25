import { test, expect, Locator, Page } from "@playwright/test";

export class Review {
  page: Page;
  categoryMenu: Locator;
  category: Locator;
  product: Locator;
  productTitle: Locator;
  reviewBox: Locator;
  submitReview: Locator;
  pointReview: Locator;
  SuccessfullReview: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryMenu = page.getByRole("button", { name: "Shop by Category" });
    this.category = page.getByRole("link", { name: "Desktops and Monitors" });
    this.product = page.locator("div.row >> div.product-layout");
    this.productTitle = page.locator("div.product-layout h4.title a");
    this.reviewBox = page.getByPlaceholder("Your Review");
    this.submitReview = page.getByRole("button", { name: "Write Review" });
    this.pointReview = page
      .locator("#form-review")
      .getByText("5", { exact: true });
    this.SuccessfullReview = page.getByText(
      "Thank you for your review. It has been submitted to the webmaster for approval."
    );
  }

  async goToProduct() {
    await this.categoryMenu.click();
    await this.category.click();
    await this.page.waitForLoadState("networkidle");
    await this.product.nth(7).click();
  }

  async writeAndSubmitReview() {
    await this.pointReview.click();
    await this.reviewBox.fill("Review de prueba del producto");
    await this.submitReview.click();
    expect(await this.SuccessfullReview).toBeVisible();
  }
}
