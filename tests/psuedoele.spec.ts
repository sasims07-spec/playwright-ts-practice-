import { Page, chromium, Browser, test, Locator } from "@playwright/test";

test("pseudo element test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  //window.getComputedStyle(document.querySelector('label[for="input-firstname"]'), '::before').getPropertyValue('content');
  let content = await page.evaluate(() => {
    return window.getComputedStyle(document.querySelector('label[for="input-firstname"]')!, "::before").getPropertyValue("content");
  });

  let color = await page.evaluate(() => {
    return window.getComputedStyle(document.querySelector('label[for="input-firstname"]')!, "::before").getPropertyValue("color");
  });

  console.log("Pseudo content:", content);
  console.log("Pseudo color:", color);
  // await page.pause();
});
