import { test, expect } from '@playwright/test';
import faker from 'faker';
import { SignupPage } from '../pageObject/signupPage'
import { DeleteAccountPage } from '../pageObject/deleteAccountPage';
import { PricingPage } from '../pageObject/pricingPage'; 

var user = {
  name: (faker.name.findName as any)(),
  email: (`valid.email+${faker.lorem.word(5)}@gmail.com`),
  password: faker.lorem.word(10)
};

test.beforeEach(async ({ page }) => {
  // go to base page
  await page.goto('https://www.softr.io/');

  const signupToSoftr = new SignupPage(page)
  // sign up
  await signupToSoftr.signupFormPage(user.name, user.email, user.password)
  // perform setup
  await signupToSoftr.basicTestSetupPage()

  // selectPlan
  const selectTrialPlan = new PricingPage(page)
  await selectTrialPlan.selectTrialPlan()
});

test.afterEach(async ({ page }) => {
  // perform accounr deletion using UI
  const deleteSoftrAccount = new DeleteAccountPage(page)
  await deleteSoftrAccount.deleteTestAccountForm()
  page.waitForURL('https://studio.softr.io/auth/signin', { timeout: 10000 })
});

  test('verify creating application', async ({ page }) => {
  await page.getByTestId('blank-app-btn').click();
  await page.getByRole('button', { name: 'Create application'}).click();
  // Closing this modal is highly unstable and I would recommend adding data-testId to ensure stability
  await page.getByText('No thanks').click();
  // I decided not to publish the app in this automated test. 
  // It is because it would require logging into email client and fetching the link form the confirmation email which extend the definition on the "Simple test".
  // Additionaly, if Gmail is used to sign up, Google will prevent a test user from logging in using the browser controlled through software automation.
  // However in extended scope retrieving confirmation link can be achieved by imlementing sollution like https://testmail.app/ or internal tooling.
  await page.getByTestId('preview-button').click();
  expect(page).toHaveTitle('Softr Studio');
});
