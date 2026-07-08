import { test, Page, chromium, Browser, Locator } from "@playwright/test";

test("All links text on the page", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  let allLinks: string[] = await page.locator("//a[@href]").allInnerTexts();
  //let allLinks: string[] = await page.locator("//a[@href]").allTextContents(); // this will give us the text of the link including the hidden text. if we want to get only the visible text we can use innerText method.
  for (let e of allLinks) {
    console.log(e);
  }
});
