import { Page } from "@playwright/test";

export class DeleteAccountPage{
    readonly page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    async deleteTestAccountForm(){
        await this.page.goto('https://studio.softr.io/user/profile');
        await this.page.getByRole('button', { name: 'Delete account'}).click();
        await this.page.locator('#reason_list_1_checkbox_9').dispatchEvent("click");
        await this.page.locator('[type="text"]').nth(2).fill('test account');
        await this.page.getByText('Next').click();
        await this.page.locator('#confirmCheck').dispatchEvent("click");
        await this.page.getByRole('button', { name: 'Yes, delete my account'}).click();
    }
}
