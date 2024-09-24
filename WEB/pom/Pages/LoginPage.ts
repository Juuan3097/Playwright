import { test, expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  email: Locator;
  password: Locator;
  myAccountMenu: Locator;
  loginLink: Locator;
  loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.email = page.getByPlaceholder("E-Mail Address");
    this.password = page.getByPlaceholder("Password");
    this.myAccountMenu = page.getByRole("button", { name: " My account" });
    this.loginBtn = page.getByRole("button", { name: "Login" });
  }

  async loginStorage() {
    if (await this.loginBtn.isVisible()) {
      await this.email.fill(process.env.EMAIL2!);
      await this.password.fill(process.env.PASSWORD!);
      await this.loginBtn.click();

      await this.page
        .context()
        .storageState({ path: "web/context/storageState.json" });
    }
  }

  async navigateToLogin() {
    await this.page.goto(process.env.LOGIN_URL!);
  }
}
