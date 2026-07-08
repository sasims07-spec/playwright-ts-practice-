import { test, Page, chromium, Browser } from '@playwright/test';

/*test('testid test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/ui/data-testid-page.html');
    //DOM should have data-testid - mandatory to have this attribute
    await page.getByTestId('email-input').fill('sss@gmail.com');
    // await page.pause();
}); */

test('testid test', async ({ page }) => {
    test.skip(!!process.env.CI, "External site (HubSpot) blocks headless CI / data-testid may drift");
    await page.goto('https://app.hubspot.com/signup-hubspot/crm');
    //DOM should have data-testid - mandatory to have this attribute
    await page.getByTestId('EMAIL').fill('sss@gmail.com');
    // await page.pause();
});