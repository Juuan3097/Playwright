// pages navega registra etc
//Checker verifica cada accion del page (exitoso)

import { test, expect } from "@playwright/test";
import { POManager } from "../pom/Pages/POManager";

test("@Web Registro valido de nuevo usuario", async ({ page }) => {
  await page.goto(process.env.URL!);
    
  const poManager = new POManager(page);
  const register = poManager.getRegister();
  await register.goTo();
  await register.registerUser();
  await page.pause();
});
