import { test, expect, Locator, Page } from "@playwright/test";

export class Checkout {
  page: Page;
  firstName: Locator;
  lastName: Locator;
  address: Locator;
  city: Locator;
  postCode: Locator;
  country: string;
  state: string;
  agreeTerms: Locator;
  goToConfirmOrderBtn: Locator;
  confirmOrderBtn: Locator;
  successfulCheckout: Locator;
  newAddress: Locator;
  checkoutCart: Locator;
  table: Locator;
  row: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByRole("textbox", { name: "First Name*" });
    this.lastName = page.getByRole("textbox", { name: "Last Name*" });
    this.address = page.getByRole("textbox", { name: "Address 1*" });
    this.city = page.getByRole("textbox", { name: "City*" });
    this.postCode = page.getByRole("textbox", { name: "Post Code" });
    this.country = "#input-payment-country";
    this.state = "#input-payment-zone";
    this.agreeTerms = page.getByText(
      "I have read and agree to the Terms & Conditions"
    );
    this.goToConfirmOrderBtn = page.getByRole("button", { name: "Continue " });
    this.confirmOrderBtn = page.getByRole("button", {
      name: "Confirm Order ",
    });
    this.successfulCheckout = page.getByRole("heading", {
      name: " Your order has been placed!",
    });
    this.newAddress = page
      .locator("#payment-address")
      .getByText("I want to use a new address");
    this.checkoutCart = page.locator("#checkout-cart");
    this.table = this.checkoutCart.locator("table.table").locator("tbody");
    this.row = this.table.locator("tr");
  }

  async cleanCart() {
    if (await this.table) {
      const rowCount = await this.row;
      console.log("La cantidad de rows son: " + (await rowCount.count()));
      await rowCount.last().waitFor({ state: "visible" });
      for (let i = await rowCount.count(); i > 0; i--) {
        await this.page.pause();
        console.log("El numero de iteracion es: " + (i - 1));
        const column = await rowCount.nth(i - 1).locator("td");
        const removeBtn = await column
          .nth(2)
          .locator("div.input-group")
          .locator("div.input-group-append")
          .locator("button")
          .nth(1)
          .first();
        const btnCount = await removeBtn.count();
        console.log("Los botones encontrados son: " + btnCount);
        //await removeBtn.waitFor({ state: "visible" });
        await removeBtn.click();
        console.log("El producto ha sido removido");
      }
    } else {
      return;
    }
  }

  async completeForm() {
    await this.newAddress.check();
    await this.firstName.fill(process.env.FIRST_NAME!);
    await this.lastName.fill(process.env.LAST_NAME!);
    await this.address.fill(process.env.ADDRESS!);
    await this.city.fill(process.env.CITY!);
    await this.postCode.fill(process.env.POSTCODE!);
    await this.page.selectOption(this.country, { label: "Argentina" });
    await this.page.selectOption(this.state, { label: "Buenos Aires" });
    await this.agreeTerms.check();
    await this.goToConfirmOrderBtn.click();
  }

  async confirmOrder() {
    await this.confirmOrderBtn.waitFor({ state: "visible" });
    await this.confirmOrderBtn.click();
    await this.successfulCheckout.waitFor({ state: "visible" });
    expect(await this.successfulCheckout).toBeVisible();
  }
}
