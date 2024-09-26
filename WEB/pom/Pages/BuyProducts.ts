import { test, expect, Locator, Page } from "@playwright/test";

export class BuyProducts {
  page: Page;
  categoryMenu: Locator;
  category: Locator;
  products: Locator;
  cartBtn: Locator;
  addToCart: Locator;
  checkoutBtn: Locator;
  productTitle: Locator;
  element: Locator;
  totalSum: number;
  subTotal: number;
  totalItem: number;
  totalCartLocator: Locator;
  totalCart: number;
  flatRate: Locator;
  flatRateValue: number;
  table: Locator;
  row: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryMenu = page.getByRole("button", { name: "Shop by Category" });
    this.category = page.getByRole("link", { name: "Desktops and Monitors" });
    this.products = page.locator("div.row >> div.product-layout");
    this.productTitle = page.locator("div.product-layout h4.title a");
    this.addToCart = page.locator("button[title='Add to Cart']");
    this.cartBtn = page.locator("div.cart-icon >> div.svg-icon").first();
    this.checkoutBtn = page.getByRole("button", { name: " Checkout" });
    this.element = page
      .locator("div#checkout-cart")
      .locator("table.table")
      .locator("tbody")
      .locator("tr");

    this.totalSum = 0;
    this.subTotal = 0;
    this.flatRate = page.getByText("Flat Shipping Rate - $");
    this.flatRateValue = 0;
    this.totalItem = 0;
    this.table = page.locator("div#checkout-cart").locator("table.table");
    this.row = this.table.locator("tbody").locator("tr");
    this.totalCartLocator = page
      .locator("table#checkout-total")
      .locator("tbody")
      .locator("tr")
      .last()
      .locator("td")
      .nth(1)
      .locator("strong");
    this.totalCart = 0;
  }

  async searchProduct(productName: string, i: number) {
    if (productName === "HTC Touch HD" || productName === "iPod Nano") {
      await this.products.nth(i).hover();
      await this.addToCart.nth(i).waitFor({ state: "visible" });
      await this.addToCart.nth(i).click();
    }
  }

  async addCart() {
    await this.categoryMenu.click();
    await this.category.click();
    await this.products.nth(1).waitFor({ state: "visible" });

    for (let i = 0; i < 9; i++) {
      const productName = await this.productTitle.nth(i).innerText();
      console.log(productName);
      await this.searchProduct(productName, i);
      const notificationBox = await this.page
        .locator("#notification-box-top")
        .locator("div.toast.m-3.fade.show")
        .first();
      await notificationBox.waitFor({ state: "visible" });
      expect(notificationBox).toHaveAttribute("role", "alert");
      // toHaveAttribute toma como primer parametro el tipo de propiedad y segundo el valor
    }
  }


  async goToCheckout() {
    await this.page.on("dialog", (dialog) => dialog.dismiss());
    await this.cartBtn.click();
    await this.checkoutBtn.click();
    await this.flatRate.waitFor({ state: "visible" });
  }


  async getValues() {
    this.totalSum = 0; //Reiniciamos el valor para evitar acumulaciones previas
    const rowCount = await this.row;
    console.log("La cantidad de filas son: " + (await rowCount.count()));

    //Get quantityValue and priceValue of each product
    for (let i = 0; i < (await rowCount.count()); i++) {
      const column = await rowCount.nth(i).locator("td");
      const quantityValueString = await column
        .nth(2)
        .locator("div.input-group")
        .locator('input[type="number"]')
        .getAttribute("value");
      const quantityValue = parseInt(quantityValueString!);
      console.log("El quantityValue es: " + quantityValue);
      const priceValueString = await column.nth(3).innerText();
      const priceValue = parseFloat(priceValueString.replace("$", "").trim());
      console.log("El precio es: " + priceValue);
      const subTotal = quantityValue * priceValue;
      this.totalSum = this.totalSum + subTotal;
    }

    //get Flat shipping rate value
    const flatRateText = await this.flatRate.innerText();
    this.flatRateValue = parseFloat(
      flatRateText.replace("Flat Shipping Rate - $", "").trim()
    );

    //get total cart value
    const totalCartString = await this.totalCartLocator.innerText();
    const totalCartValue = parseInt(totalCartString.replace("$", "").trim());
    this.totalCart = totalCartValue;

    //TotalItem
    this.totalItem = this.totalSum + this.flatRateValue;
    console.log("El valor de this.totalSum es:" + this.totalSum);

    return this.totalSum;
  }
}
