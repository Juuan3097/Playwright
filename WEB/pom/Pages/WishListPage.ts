import { test, expect, Locator, Page } from "@playwright/test";

export class WishList {
  page: Page;
  products: Locator;
  addToWishList: Locator;
  categoryMenu: Locator;
  category: Locator;
  backToCategory: Locator;
  productTitle: Locator;
  wishListBtn: Locator;
  wishListHeader: Locator;
  productAction: Locator;
  table: Locator;
  row: Locator;
  removeMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator("div.row >> div.product-layout");
    //    this.addToWishList = page.locator("button.btn-wishlist").locator("i");
    this.addToWishList = page.getByRole("button", { name: "" });
    this.productAction = page.locator(".product-action");
    this.categoryMenu = page.getByRole("button", { name: "Shop by Category" });
    this.category = page.getByRole("link", { name: "Desktops and Monitors" });
    this.backToCategory = page.getByRole("link", {
      name: "Monitors",
      exact: true,
    });
    this.productTitle = page.locator("div.product-layout h4.title a");
    this.wishListBtn = page.getByLabel("Wishlist");
    this.wishListHeader = page.getByRole("heading", { name: "My Wish List" });
    this.table = page
      .locator(".table-responsive")
      .locator("table.table")
      .locator("tbody");
    this.row = page
      .locator(".table-responsive")
      .locator("table.table")
      .locator("tbody")
      .locator("tr");
    this.removeMsg = page.getByText("Success: You have modified");
  }

  async searchProduct(productName: string, i: number) {
    if (
      productName === "HTC Touch HD" ||
      productName === "iPod Nano" ||
      productName === "Palm Treo Pro" ||
      productName === "iPod Touch"
    ) {
      await this.products.nth(i).hover();
      await this.products.nth(i).click();
      await this.addToWishList.waitFor({ state: "visible" });
      const btnCount = await this.addToWishList.count();
      console.log("La cantidad de btn son: " + btnCount);
      await this.addToWishList.click();
      await this.page.waitForLoadState("networkidle");
      await this.backToCategory.waitFor({ state: "visible" });
      await this.backToCategory.click();
    }
  }

  async addWishList() {
    await this.categoryMenu.click();
    await this.category.click();
    await this.page.waitForLoadState("networkidle");
    await this.productTitle.nth(0).waitFor({ state: "visible" });

    for (let i = 0; i < 9; i++) {
      const productName = await this.productTitle.nth(i).innerText();
      await this.searchProduct(productName, i);
    }
  }

  async goToWishList() {
    await this.wishListBtn.waitFor({ state: "visible" });
    await this.wishListBtn.click();
    await this.page.locator(
      "getByLabel('breadcrumb').getByText('My Wish List')"
    );
    await this.wishListHeader.waitFor({ state: "visible" });
  }

  async removeItem() {
    const rowCount = await this.row;
    console.log("La cantidad de rows son: " + (await rowCount.count()));
    await rowCount.last().waitFor({ state: "visible" });

    for (let i = await rowCount.count(); i > 0; i--) {
      console.log("El numero de iteracion es: " + (i - 1));
      const column = await rowCount.nth(i - 1).locator("td");
      const stock = await column.nth(3).textContent();
      const productTitle = await column.nth(1).textContent();
      const removeBtn = await column.nth(5).locator("a");
      if (stock === "Out Of Stock") {
        await removeBtn.waitFor({ state: "visible" });
        await removeBtn.click();
        await this.removeMsg.waitFor({ state: "visible" });
        console.log("El producto " + productTitle + " ha sido removido");
      }
    }
  }

  async verifyProducts() {
    const rowCount = await this.row;
    await rowCount.last().waitFor({ state: "visible" });

    for (let i = 0; i < (await rowCount.count()); i++) {
      const column = await rowCount.nth(i).locator("td");
      const stock = await column.nth(3).textContent();
      const productTitle = await column.nth(1).textContent();
      if (this.table) {
        expect((await stock) === productTitle!).toBeFalsy();
        console.log("No se encontraron productos out of stock");
      } else {
        console.log("No hay productos agregados a whishList");
      }
    }
  }
}
