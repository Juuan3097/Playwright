import { Page } from "@playwright/test";
import { Register } from "./RegisterPage";
import { LoginPage } from "./LoginPage";
import { ChangeInfo } from "./ChangeInfoPage";
import { BuyProducts } from "./BuyProducts";
import { Checkout } from "./CheckoutPage";
import { WishList } from "./wishListPage";

export class POManager {
  page: Page;
  register: Register;
  loginPage: LoginPage;
  changeInfo: ChangeInfo;
  buyProducts: BuyProducts;
  checkout: Checkout;
  wishList: WishList;

  constructor(page: Page) {
    this.page = page;
    this.register = new Register(this.page);
    this.loginPage = new LoginPage(this.page);
    this.changeInfo = new ChangeInfo(this.page);
    this.buyProducts = new BuyProducts(this.page);
    this.checkout = new Checkout(this.page);
    this.wishList = new WishList(this.page);
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

  getCheckoutForm() {
    return this.checkout;
  }

  getWishList() {
    return this.wishList;
  }
}
