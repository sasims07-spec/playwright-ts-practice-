import { test, Page, Browser, chromium } from "@playwright/test";

/*test('google title test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    await page.getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('radio', { name: 'No' }).click();
    await page.getByRole('checkbox').check(); //but here getByRole is not preferrable, because if another checkbox added in future then it will not work
    // await page.pause();
})*/

test('google title test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=42');
    let address = `101, NFC
    New col,
    KK nagar, Chennai.
    Chennai, 6250004`;
    await page.getByRole('textbox', { name: '* Textarea' }).fill(address);
    // await page.pause();
})