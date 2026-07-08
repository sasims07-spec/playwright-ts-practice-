//I really wanted to enter the value like real user enters, so I have used the fill method with delay option, which will enter the value with the delay of 100ms between each character.
import { Page, test, Browser, chromium } from '@playwright/test';

test('fill with delay test', async ({ page }) => {

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    await page.getByRole('textbox', { name: 'First Name' }).pressSequentially('Sasirekha', { delay: 500 });
    //await page.pause();
})
