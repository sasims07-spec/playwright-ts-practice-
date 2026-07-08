import { test, Page, chromium, Browser } from "@playwright/test";

test('google title test', async ({ page }) => {
    await page.goto('https://google.com');
    //await page.pause();
    let title: string = await page.title();
    console.log(title); // Output: Google
    let pageUrl: string = page.url();
    console.log(pageUrl);
    await page.waitForTimeout(5000);
});