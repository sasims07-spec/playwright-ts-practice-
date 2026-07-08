import { Page, test, Browser, chromium } from "@playwright/test";

test("css test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  );
  await page.locator("#input-firstname").fill("naveen"); //only id selector
  await page.locator("input#input-email").fill("naveen@gmail.com"); //tag and id selector
  // await page.pause();
});
