import { Browser, chromium, FullConfig } from "@playwright/test";

async function globalSetup(_config: FullConfig): Promise<void> {
    const browser: Browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('adam@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('adad');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForSelector("img[title = 'naveenopencart']");
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;
