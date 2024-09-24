import { Page } from "@playwright/test";
import { Register } from "./RegisterPage";
import { LoginPage } from "./LoginPage";
import { ChangeInfo } from "./ChangeInfo";
import { BuyProducts } from "./BuyProducts";
import { CheckoutForm } from "./CheckoutForm";

export class POManager {
  page: Page;
  register: Register;
  loginPage: LoginPage;
  changeInfo: ChangeInfo;
  buyProducts: BuyProducts;
  checkoutForm: CheckoutForm;

  constructor(page: Page) {
    this.page = page;
    this.register = new Register(this.page);
    this.loginPage = new LoginPage(this.page);
    this.changeInfo = new ChangeInfo(this.page);
    this.buyProducts = new BuyProducts(this.page);
    this.checkoutForm = new CheckoutForm(this.page);
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

  getBuyProducts() {
    return this.buyProducts;
  }

  getCheckoutForm(){
    return this.checkoutForm
  }

}
