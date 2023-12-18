import { Page } from "@playwright/test";

export class SignupPage{
    readonly page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    async signupFormPage(name: any, email: any, password: any){
        await this.page.getByText('Sign up for free').click();
        await this.page.getByPlaceholder('Full Name').fill(name);
        await this.page.getByPlaceholder('Email').fill(email);
        await this.page.getByPlaceholder('Password').fill(password); 
        await this.page.getByRole('button', { name: 'Sign up for free' }).click();
    }

    async basicTestSetupPage(){
          // checkbox is pseudo elements which is why .check won't work here 
        await this.page.locator('#accept-terms').dispatchEvent("click");
        await this.page.getByRole('button', { name: 'Sign up for free' }).click();
        await this.page.getByText('For fun').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.getByText('Other').click();
        await this.page.getByPlaceholder('Type your answer...').fill('Test automation');
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.getByText('Other').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.getByText('Just starting out').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.getByText('None of the above ').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.getByText('Other').click();
        await this.page.getByPlaceholder('Type your answer...').fill('Test automation');
        await this.page.getByRole('button', { name: 'Done' }).click();
    }

}
