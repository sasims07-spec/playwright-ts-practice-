import { test, Page, chromium, Browser, Locator } from "@playwright/test";

test("jquery dropdown selection test", async ({ page }) => {
  test.skip(!!process.env.CI, "External site (jqueryscript.net) shows a consent overlay that intercepts clicks in headless CI");
  await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/");
  await page.locator("#justAnInputBox").click();
  await selectChoice(page, ["choice 1", "choice 2", "choice 2 3", "choice 6 2"]);
  // await page.pause();
});

async function selectChoice(page: Page, choice: string[]): Promise<void> {
  for (let e of choice) {
    await page.locator("span.comboTreeItemTitle").filter({ hasText: e }).first().click();
    // here we are using filter method to filter the elements based on the text and then we are clicking on the first element because there are multiple elements with the same text.
  }
}
