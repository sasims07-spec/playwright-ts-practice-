/*i
mport { test, expect, Page, chromium, Browser, webkit } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// Custom test: demonstrates using the 'browser' fixture directly
// instead of the default 'page' fixture, giving us manual control over page creation
test('google test', async ({ browser }) => {

  // 'browser' is a Playwright Browser instance injected by the test fixture.
  // We manually create a new Page from it — this is equivalent to opening a new tab.
  // Type annotation 'Page' (imported from @playwright/test) gives us full IntelliSense support.
  let page: Page = await browser.newPage();

  // Navigate the newly created page to Google's homepage.
  // 'await' is required because goto() is asynchronous — it waits until the page is fully loaded.
  await page.goto('https://google.com');

  // page.title() reads the <title> tag of the current page.
  // For Google, this returns the string "Google".
  let title: string = await page.title();

  // Print the page title to the console — useful for quick debugging.
  console.log(title); // Output: Google

  // page.url() returns the current URL of the page as a string.
  // Note: the result is not stored or asserted here, so this line has no visible effect.
  // To make it useful, you could do: console.log(page.url()) or expect(page.url()).toContain('google')
  page.url();
})

// APPROACH 2: Manually launching your own browser instance (no fixtures used)
// Use this when you need full control — e.g., custom browser settings, specific Chrome channel,
// or when running tests outside of Playwright's managed fixture lifecycle.
test('google test1', async ({ }) => {
  // Empty destructure { } — we intentionally opt out of all Playwright fixtures (page, browser, context).
  // We are responsible for creating and managing everything ourselves.

  // chromium.launch() starts a real browser process — similar to 'new ChromeDriver()' in Selenium.
  // channel: 'chrome' uses your locally installed Google Chrome (not Playwright's bundled Chromium).
  // headless: false means the browser window will be visible on screen (headed mode).
  let browser: Browser = await chromium.launch({ channel: 'chrome', headless: false });

  // browser.newPage() opens a blank tab in the browser we just launched.
  // This page is NOT managed by Playwright fixtures — we must close it manually if needed.
  let page: Page = await browser.newPage();

  // Navigate to Google. 'await' ensures we wait until the page finishes loading before moving on.
  await page.goto('https://google.com');

  // Read the <title> tag from the loaded page. Returns "Google" as a string.
  let title: string = await page.title();

  // Log the title to the terminal for verification/debugging.
  console.log(title); // Output: Google

  // Returns the current URL as a string, but result is not used here.
  // Useful if stored: let url = page.url(); or asserted: expect(page.url()).toContain('google')
  page.url();
})

// SUMMARY — When to use each approach:
// ✅ Use fixture destructuring  ({ page }) or ({ browser })  → Playwright manages setup/teardown automatically.
//    Best for most tests: cleaner, shorter, and more reliable.
// ✅ Use manual launch  chromium.launch()  → You control everything yourself.
//    Best for: custom browser channels, multi-user scenarios, or tests needing isolated browser instances.

// Using 'context' fixture instead of 'browser' fixture.
// 'context' is the Playwright-managed BrowserContext — it inherits all settings from
// playwright.config.ts including screenshot, video, and trace configurations.
// This is why screenshots and videos appear in the test report.
test('google test2', async ({ }) => {
  // Manually launching WebKit browser — no fixtures used.
  // webkit is Apple's browser engine (used in Safari).
  //let browser: Browser = await webkit.launch({ headless: false });
  let browser: Browser = await chromium.launch({ channel: 'chrome', headless: false });
  let page: Page = await browser.newPage();
  await page.goto('https://google.com');
  let title: string = await page.title();
  console.log(title);
  // page.url() returns the current URL. Storing it in a variable so we can assert against it.
  let pageUrl: string = page.url();
  // Assert that the URL contains 'google' — this is an actual test assertion.
  // If this fails, the test is marked as failed in the report.
  expect(pageUrl).toContain('google');
  // Explicitly close the page. Good practice when you manually created the page.
  await page.close();
  // Explicitly close the browser. Good practice when you manually created the browser.
  await browser.close();
})
*/