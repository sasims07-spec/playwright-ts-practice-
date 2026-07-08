import { Page, chromium, Browser, test } from "@playwright/test";

test('element with placeholder test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    await page.getByAltText('naveenopencart').highlight(); //getByAltText() for the images
    await page.waitForTimeout(2000);
    await page.getByAltText('naveenopencart').click();
    // await page.pause();
});