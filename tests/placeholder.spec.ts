import { Page, chromium, Browser, test } from "@playwright/test";

test('element with placeholder test', async ({ page }) => {
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    await page.getByPlaceholder('First Name').fill('Naveen');
    await page.getByPlaceholder('Last Name').fill('Auto');
    await page.getByPlaceholder('E-Mail').fill('sss@gmail.com');
    await page.getByPlaceholder('Telephone').fill('1234567890');
    await page.getByPlaceholder('Password', { exact: true }).fill('123456');
    await page.getByPlaceholder('Password Confirm', { exact: true }).fill('123456');
    await page.getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    // await page.pause();
});