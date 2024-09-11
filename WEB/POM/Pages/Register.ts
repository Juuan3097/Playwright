import {test,expect, Locator, Page} from '@playwright/test'

export class Register {
    page: Page;
    firstName: Locator ;
    lastName: Locator;
    email: Locator;
    phone: Locator;
    password: Locator;
    passwordConfirmation: Locator;
    registerPlan: Locator;

    constructor(page:Page){
        this.page = page;
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.email = page.getByPlaceholder('E-Mail');
        this.phone = page.getByPlaceholder('Telephone');
        this.password = page.getByPlaceholder('Password', { exact: true });
        this.passwordConfirmation = page.getByPlaceholder('Password Confirm');
        this.registerPlan = page.getByRole('link', { name: 'Register' });
    }

    async goTo(){
        await this.page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home")
    }
    
    async register(firstName: string , lastName: string , email: string , phone: string , password: string , passwordConfirmation: string){
        this.firstName.fill(firstName);
        this.lastName.fill(lastName);
        this.email.fill(email);
        this.phone.fill(phone);
        this.password.fill(password);
        this.passwordConfirmation.fill(passwordConfirmation);

    }
}