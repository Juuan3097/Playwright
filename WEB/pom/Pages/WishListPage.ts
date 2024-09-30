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
  cartBtn: Locator;
  checkOutBtn: Locator;
  newAddressCheck: Locator;
  wishedBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator("div.row >> div.product-layout");
    //   this.addToWishList = page.locator("button.btn-wishlist");
    this.addToWishList = page.getByRole("button", { name: "" });
    this.wishedBtn = page.locator("button.wished");
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
    this.row = this.table.locator("tr");
    this.removeMsg = page.getByText("Success: You have modified");
    this.cartBtn = page
      .locator(".cart-icon")
      .locator("div")
      .locator("svg")
      .first();
    this.checkOutBtn = page.getByRole("button", { name: " Checkout" });
    this.newAddressCheck = page
      .locator("#payment-address")
      .getByText("I want to use a new address");
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
      const checkAddToWishlist = await this.addToWishList.getAttribute("class");
      console.log("La clase es: " + checkAddToWishlist);

      if (!(checkAddToWishlist?.includes("wished"))) {
        await this.addToWishList.click();
      }
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
    await this.page.waitForLoadState("networkidle");
    const rowCountFirst = await this.row;
    console.log("La cantidad de rows son: " + (await rowCountFirst.count()));
    await rowCountFirst.last().waitFor({ state: "visible" });
    for (let i = await rowCountFirst.count(); i > 0; i--) {
      console.log("El numero de iteracion es: " + (i - 1));
      const column = await rowCountFirst.nth(i - 1).locator("td");
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

    await this.verifyProducts();
  }

  async verifyProducts() {
    const rowCountSecond = await this.row;
    await rowCountSecond.last().waitFor({ state: "visible" });
    const rowCountVerifyProducts = await rowCountSecond.count();
    console.log(
      "Cantidad de rows en el metodo verifyProducts: " +
        (await rowCountVerifyProducts)
    );
    for (let i = 0; i < (await rowCountSecond.count()); i++) {
      const column = await rowCountSecond.nth(i).locator("td");
      const stock = await column.nth(3).textContent();
      const productTitle = await column.nth(1).textContent();
      if (await this.table) {
        expect((await stock) === productTitle!).toBeFalsy();
        console.log("No se encontraron productos out of stock");
      } else {
        console.log("No hay productos agregados a whishList");
      }
    }
  }

  async addToCart() {
    await this.table.waitFor({ state: "visible" });
    const rowCountThird = await this.row;
    console.log("La cantidad de rows son: " + (await rowCountThird.count()));
    await rowCountThird.last().waitFor({ state: "visible" });

    for (let i = 0; i < (await rowCountThird.count()); i++) {
      console.log("El numero de iteracion es: " + i);
      const column = await rowCountThird.nth(i).locator("td");
      if (this.table) {
        const addToCartBtn = await column.nth(5).locator("button").first();
        const addToCartBtnCount = await addToCartBtn.count();
        console.log(
          "La cant de locators encontrados son: " + addToCartBtnCount
        );
        await addToCartBtn.click();
      }
    }
  }

  async goToCart() {
    await this.cartBtn.waitFor({ state: "visible" });
    await this.cartBtn.click();
    await this.checkOutBtn.click();
  }
}
