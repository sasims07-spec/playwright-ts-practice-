import { test, Page, chromium, Browser, Locator } from "@playwright/test";

test("shadow dOM element test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  //await page.getByRole("button", { name: "Click Me" }).click();
  //or the below there is no manual things to do for shadow DOM elements we can directly use the locator for the shadow DOM element in playwright and it will automatically handle the shadow DOM elements for us.
  await page.locator("#shadow-btn").click();
  await page.locator("#username").fill("Naveen");
  await page.getByRole("button", { name: "Submit" }).click();
  //2 level shadow DOM
  await page.locator("#inner-input").fill("I love Playwright");
  //Closed shadow DOM we cannot access the elements inside the closed shadow DOM because the shadow root is closed and we cannot access the elements inside it. so we cannot automate the closed shadow DOM elements.
  //await page.locator('#closed-input').fill("I love Playwright");
  // await page.pause();
});
