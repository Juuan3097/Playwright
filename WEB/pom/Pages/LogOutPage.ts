import { test, expect, Locator, Page } from "@playwright/test";

export class LogOut {
  page: Page;
  myAccount: Locator;
  logOutBtn: Locator;
  logOutMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccount = page.getByRole("button", { name: " My account" });
    this.logOutBtn = page.getByRole("link", { name: "Logout" });
    this.logOutMsg = page.getByRole("heading", { name: " Account Logout" });
  }

  async LogOut() {
    await this.myAccount.waitFor({ state: "visible" });
    await this.myAccount.hover();
    await this.logOutBtn.click();
    await expect(await this.logOutMsg).toBeVisible();
  }
}
