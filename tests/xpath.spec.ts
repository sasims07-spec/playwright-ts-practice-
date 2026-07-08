import { test, Page, chromium, Browser } from "@playwright/test";

test("xpath test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  await page.locator("//input[@id='input-firstname']").fill("naveen");
  //textContent() will capture empty spaces and new line characters as well.
  //let header = await page.locator("//h1[text()='Register Account']").textContent();
  //innerText() will ignore those and give you the text as it is visible on the UI, it is the preferable method to capture the text.
  let header = await page.locator("//h1[text()='Register Account']").innerText();
  console.log(header);
  // await page.pause();
});
