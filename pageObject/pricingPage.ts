import { Page } from "@playwright/test";

export class PricingPage{
    readonly page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    async selectTrialPlan(){
        // additional waiter required
        await this.page.waitForTimeout(3000)
        if (await this.page.locator('.plan-period-switcher').isVisible()) {
            await this.page.getByText('Start').first().click();
          } else {
            await this.page.getByRole('button', { name: "Let’s go!" }).click();
          }
    }
}
