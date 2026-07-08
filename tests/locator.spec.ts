import { test, Page, chromium, Browser } from '@playwright/test';

/*test('register page test', async ({ page }) => {
    page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    await page.getByRole('textbox', { name: 'First Name' }).fill('Naveen'); //fill returns promise so await
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Auto');
    await page.getByRole('textbox', { name: 'E-Mail' }).fill('sss@gmail.com');
    await page.getByRole('textbox', { name: 'Telephone' }).fill('1234567890');
    // await page.pause();
    //await page.getByRole('textbox', { name: 'Password', exact: true }).fill('123456');
    //await page.getByRole('textbox', { name: 'Password Confirm', exact: true }).fill('123456');
    // Password field
    await page.locator('#input-password').fill('yourpassword');
    // Password Confirm field  
    await page.locator('#input-confirm').fill('yourpassword');
    await page.getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    // await page.pause();
}); */

test('login page test', async ({ page }) => {
    page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    //await page.getByRole('link', { name: 'Forgotten Password' }).first().click();
    //await page.getByRole('link', { name: 'Forgotten Password' }).last().click();
    await page.getByRole('link', { name: 'Forgotten Password' }).nth(1).click();
    // await page.pause();
});
