import { test, expect, Page, chromium, Browser } from "@playwright/test";
test("get attribute test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  let firstNameAttribute = await page.getByRole("textbox", { name: "First Name" }).getAttribute("placeholder");
  console.log(firstNameAttribute);
  let hrefValue = await page.getByRole("link", { name: "Forgotten Password" }).getAttribute("href");
  console.log(hrefValue);
});
