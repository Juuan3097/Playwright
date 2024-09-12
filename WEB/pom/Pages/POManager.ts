import { Page } from "@playwright/test";
import { Register } from "./RegisterPage";

export class POManager {
  page: Page;
  register: Register;
  constructor(page: Page) {
    this.page = page;
    this.register = new Register(this.page);
    this.loginPage = new LoginPage(this.page);
  }

  getRegister() {
    return this.register;
  }
}
