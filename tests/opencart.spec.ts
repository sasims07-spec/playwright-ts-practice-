import { test, Page, chromium, Browser, expect } from "@playwright/test";

test.use({ storageState: 'storageState.json' });
/*test('Open Cart Home Page Test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
    await page.waitForTimeout(10000);

});*/


test('Open Cart Home Page Test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector("img[title = 'naveenopencart']");
    //await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('Open Cart Cart Page Test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector("img[title = 'naveenopencart']");
});
