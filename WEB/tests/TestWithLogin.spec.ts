// pages navega registra etc
//Checker verifica cada accion del page (exitoso)

import { test, expect, chromium, Page } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

test.describe.only("@Web Test with Login", () => {
  test.beforeAll(async ({}) => {
    // Step 1: Launch browser and create context
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Step 2: Login using Page Object Manager
    const poManager = new POManager(page);
    const loginPage = await poManager.getLoginPage();
    await loginPage.navigateToLogin(); // Navigate to the login page
    await loginPage.loginStorage(); // Perform login action

    // Step 3: Save the storage state (cookies and session data)
    await context.storageState({ path: "web/context/storageState.json" });

    // Close the browser after saving session
    await browser.close();
  });
  test.use({ storageState: "web/context/storageState.json" });

  test.skip("@Web Modificar información de la cuenta", async ({ page }) => {
    await page.goto(process.env.MYACCOUNT_URL!);
    const poManager = new POManager(page);
    const changeInfo = await poManager.getChangeInfo();
    await changeInfo.confirmChanges();
    await expect(page.getByText(" Success: Your account has")).toBeVisible();
    await page.pause();
    await changeInfo.verifyChanges();
  });

  test.skip("@Web Generar una orden exitosa de multiples productos", async ({
    page,
  }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const buyProducts = await poManager.getBuyProducts();
    const checkoutForm = await poManager.getCheckoutForm();
    await buyProducts.addCart();
    await buyProducts.goToCheckout();
    buyProducts.getValues();
    const totalItem = buyProducts.totalItem;
    const totalCart = buyProducts.totalCart;
    await expect(totalItem).toEqual(totalCart);
    await checkoutForm.completeForm();
    await checkoutForm.confirmOrder();
  });

  test.skip("@Web Agregar multiples productos a Wish list y eliminar los que no tengan stock", async ({
    page,
  }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const wishList = await poManager.getWishList();
    await wishList.addWishList();
    await wishList.goToWishList();
    await wishList.removeItem();
    await wishList.verifyProducts();
  });

  test.skip("@Web Dejar unaReview para un producto", async ({ page }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const review = await poManager.getReview();
    await review.goToProduct();
    await review.writeAndSubmitReview();
    await page.pause();
  });

  test.only("@Web Con una sesión iniciada, clickear el botón Logout", async ({
    page,
  }) => {
    await page.goto(process.env.URL!);
    const poManager = new POManager(page);
    const logOut = await poManager.getLogOut();
    await logOut.LogOut();
  });
});

test.describe.skip("@Web Test without Login", () => {
  test.skip("@Web Inicio de sesión invalido", async ({ page }) => {
    const poManager = new POManager(page);
    const login = await poManager.getLoginPage();
    //CREAR
    await login.navigateToLogin();
  });

  test.skip("@Web Registro valido de nuevo usuario", async ({ page }) => {
    const poManager = new POManager(page);
    const register = await poManager.getRegister();
    await register.goTo();
    await register.registerUser();
  });
});
