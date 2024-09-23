import { test, expect, Locator, Page } from "@playwright/test";

export class Register {
  page: Page;
  firstName: Locator;
  lastName: Locator;
  email: Locator;
  phone: Locator;
  password: Locator;
  passwordConfirmation: Locator;
  registerBtn: Locator;
  myAccountMenu: Locator;
  agreePolicy: Locator;
  confirmRegistration: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.email = page.getByPlaceholder("E-Mail");
    this.phone = page.getByPlaceholder("Telephone");
    this.password = page.getByPlaceholder("Password", { exact: true });
    this.passwordConfirmation = page.getByPlaceholder("Password Confirm");
    this.myAccountMenu = page.getByRole("button", { name: " My account" });
    this.registerBtn = page.getByRole("link", { name: "Register" });
    this.agreePolicy = page.getByText("I have read and agree to the");
    this.confirmRegistration = page.getByRole("button", { name: "Continue" });
  }

  async goTo() {
    await this.page.goto(process.env.URL!);
  }

  async registerUser() {
    await this.myAccountMenu.hover();
    await this.registerBtn.click();
    await this.firstName.fill(process.env.FIRST_NAME!);
    await this.lastName.fill(process.env.LAST_NAME!);
    await this.email.fill(process.env.EMAIL!);
    await this.phone.fill(process.env.PHONE!);
    await this.password.fill(process.env.PASSWORD!);
    await this.passwordConfirmation.fill(process.env.PASSWORD!);
    await this.agreePolicy.check();
    await this.confirmRegistration.click();
  }
}
