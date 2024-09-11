// pages navega registra etc
//Checker verifica cada accion del page (exitoso)

import {test, expect} from '@playwright/test';

test('@Web Registro valido de nuevo usuario', async ({page}) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
    await page.getByRole('button', { name: ' My account' }).hover()
    

    await page.getByText('I have read and agree to the').check();
    await page.getByRole('button', { name: 'Continue' }).click();
})