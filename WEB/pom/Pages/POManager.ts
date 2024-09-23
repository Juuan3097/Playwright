import { Page } from "@playwright/test";
import { Register } from "./RegisterPage";
import { LoginPage } from "./LoginPage";
import { ChangeInfo } from "./ChangeInfo";

export class POManager {
  page: Page;
  register: Register;
  loginPage: LoginPage;
  changeInfo: ChangeInfo;

  constructor(page: Page) {
    this.page = page;
    this.register = new Register(this.page);
    this.loginPage = new LoginPage(this.page);
    this.changeInfo = new ChangeInfo(this.page);
  }

  getRegister() {
    return this.register;
  }

  getLoginPage() {
    return this.loginPage;
  }

  getChangeInfo() {
    return this.changeInfo;
  }
}
