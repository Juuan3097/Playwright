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

  test("@Web Modificar información de la cuenta", async ({ page }) => {
    await page.goto(process.env.LOGIN_URL!);
    const poManager = new POManager(page);
    const changeInfo = await poManager.getChangeInfo();
    await changeInfo.confirmChanges();
    await expect(page.getByText(" Success: Your account has")).toBeVisible();
    await page.pause();
    await changeInfo.verifyChanges();
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
