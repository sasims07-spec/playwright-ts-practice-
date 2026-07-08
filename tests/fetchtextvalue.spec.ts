import { test, Page, chromium, Browser } from "@playwright/test";

test("fetch text value test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  await page.getByRole("textbox", { name: "First Name" }).fill("naveen");
  let firstNameValue = await page.getByRole("textbox", { name: "First Name" }).inputValue();
  console.log(firstNameValue);
  // await page.pause();
});
