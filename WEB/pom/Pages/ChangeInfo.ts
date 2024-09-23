import { test, expect, Locator, Page } from "@playwright/test";

export class ChangeInfo {
  page: Page;
  myInfoBtn: Locator;
  firstName: Locator;
  lastName: Locator;
  email: Locator;
  phone: Locator;
  confirmChangesBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myInfoBtn = page.getByRole("link", { name: " Edit your account" });
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.email = page.getByPlaceholder("E-Mail");
    this.phone = page.getByPlaceholder("Telephone");
    this.confirmChangesBtn = page.getByRole("button", { name: "Continue" });
  }

  async confirmChanges() {
    // await this.page.goto(process.env.MYACCOUNT_URL!);
    // await this.page.pause();
    await this.myInfoBtn.click();
    await this.firstName.fill(process.env.FIRST_NAME2!);
    await this.lastName.fill(process.env.LAST_NAME2!);
    await this.email.fill(process.env.EMAIL2!);
    await this.phone.fill(process.env.PHONE2!);
    await this.confirmChangesBtn.click();
  }

  async verifyChanges() {
    await this.myInfoBtn.click();

    await expect(this.firstName).toHaveValue(process.env.FIRST_NAME2!);
    await expect(this.lastName).toHaveValue(process.env.LAST_NAME2!);
    await expect(this.email).toHaveValue(process.env.EMAIL2!);
    await expect(this.phone).toHaveValue(process.env.PHONE2!);
  }
}
