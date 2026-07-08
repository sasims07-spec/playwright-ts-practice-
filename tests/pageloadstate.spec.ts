import { Page, test, chromium, Browser } from "@playwright/test";

test("pageloadstate test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register", { waitUntil: "load" });
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register", { waitUntil: "networkidle" });
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register", { waitUntil: "domcontentloaded" });
});
