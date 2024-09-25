import { Page } from "@playwright/test";
import { Register } from "./RegisterPage";
import { LoginPage } from "./LoginPage";
import { ChangeInfo } from "./ChangeInfoPage";
import { BuyProducts } from "./BuyProducts";
import { Checkout } from "./CheckoutPage";
import { WishList } from "./WishListPage";
import { Review } from "./ReviewPage";
import { LogOut } from "./LogOutPage";

export class POManager {
  page: Page;
  register: Register;
  loginPage: LoginPage;
  changeInfo: ChangeInfo;
  buyProducts: BuyProducts;
  checkout: Checkout;
  wishList: WishList;
  review: Review;
  logOut: LogOut;

  constructor(page: Page) {
    this.page = page;
    this.register = new Register(this.page);
    this.loginPage = new LoginPage(this.page);
    this.changeInfo = new ChangeInfo(this.page);
    this.buyProducts = new BuyProducts(this.page);
    this.checkout = new Checkout(this.page);
    this.wishList = new WishList(this.page);
    this.review = new Review(this.page);
    this.logOut = new LogOut(this.page);
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

  getReview() {
    return this.review;
  }

  getLogOut() {
    return this.logOut;
  }
}
