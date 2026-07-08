import { test, Page, chromium, Browser, Locator } from "@playwright/test";

test("google search test", async ({ page }) => {
  test.skip(!!process.env.CI, "External site (Google) triggers captcha / consent wall in headless CI");
  await page.goto("https://www.google.com/");
  await page.getByRole("combobox", { name: "Search" }).fill("Naveen Automation Labs");
  await page.locator("div.wM6W7d span").filter({ hasText: "github" }).click();
  // await page.pause();
});

test("amazon search test", async ({ page }) => {
  await page.goto("https://www.amazon.com/");
  await page.getByRole("searchbox", { name: "Search Amazon" }).fill("Macbook Pro");
  await page.locator("div.s-suggestion span").filter({ hasText: "16 inch" }).click(); 
  // span.s-suggestion is the locator for the search suggestions and then we are filtering the suggestions based on the text and then clicking on the first element because there are multiple elements with the same text. 
//await page.getByRole('button',{name:'mackbook pro', exact: true}).click(); 
// here we are using exact: true to click on the exact match of the button because there are multiple buttons with the same text. if we don't use exact: true then it will click on the first button which is not the desired one. so it's better to use exact: true for better readability and maintainability of the test. 
// await page.pause();
});
