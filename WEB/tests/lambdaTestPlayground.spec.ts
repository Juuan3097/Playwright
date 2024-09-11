// pages navega registra etc
//Checker verifica cada accion del page (exitoso)

import {test, expect} from '@playwright/test';

test('@Web Registro valido de nuevo usuario', async ({page}) => {
    const firstName = ;
    const lastName = ;
    const email = ;
    const phone = ;
    const password = ;

    page.getByPlaceholder('First Name');
    page.getByPlaceholder('Last Name');
    page.getByPlaceholder('E-Mail');
    page.getByPlaceholder('Telephone');
    page.getByPlaceholder('Password', { exact: true });
    page.getByPlaceholder('Password Confirm');

    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
    await page.getByRole('button', { name: ' My account' }).hover()
    await page.getByRole('link', { name: 'Register' }).click();

    await page.getByText('I have read and agree to the').check();
    await page.getByRole('button', { name: 'Continue' }).click();
})