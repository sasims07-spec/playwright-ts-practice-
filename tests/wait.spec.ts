import { test, Page, chromium, Browser, Locator, expect, ElementHandle } from "@playwright/test";
// 👉 Import Playwright modules (ElementHandle is important here)

test("wait test", async ({ page }) => {
  // 👉 Test block with Playwright page object

  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  // 👉 Open the webpage

  let firstNameElement: ElementHandle<SVGElement | HTMLElement> = await page.waitForSelector("#input-firstname");
  // 👉 waitForSelector():
  // 👉 waits for element and RETURNS ElementHandle (static reference)
  // 👉 ElementHandle = snapshot of element at that moment (DOM 1)

  await firstNameElement.fill("Naveen");
  // 👉 Use stored element to type value
  // ❗ Risk: If DOM changes → this reference becomes invalid (stale-like issue)

  await page.getByRole("heading", { name: "Register Account", level: 1 }).waitFor({ timeout: 5000, state: "visible" });
  // 👉 Locator-based wait
  // 👉 getByRole() = Playwright locator (dynamic)
  // 👉 waitFor() ensures element is visible

  await page.locator("#input-lastname").waitFor({ timeout: 5000, state: "visible" });
  // 👉 Another locator-based wait
  // 👉 Locator re-evaluates DOM every time (safe)
  //Wait until the element is visible on the screen
  await page.locator("#input-lastname").waitFor({ timeout: 5000, state: "attached" });
  //Wait until element is present in DOM, Element may be hidden, Not necessarily visible
  //await page.locator("#input-lastname").waitFor({ timeout: 5000, state: "detached" });

  // NOTE: 'detached' and 'hidden' waits below are illustrative only — the #input-lastname
  // field stays in the DOM and visible on this page, so those assertions would time out.
  // Kept as commented reference for teaching; uncomment against a page where the element
  // is actually removed/hidden after some action.
  // await page.locator("#input-lastname").waitFor({ timeout: 5000, state: "detached" });
  //Wait until element is removed from DOM , After delete action, After navigation, Loading spinner disappears (removed)
  // await page.locator("#input-lastname").waitFor({ timeout: 5000, state: "hidden" });
  //Wait until element is not visible
  // await page.pause();
  // 👉 Debugging (opens Playwright Inspector)
});
