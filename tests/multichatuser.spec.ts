import { Page, test, BrowserContext } from "@playwright/test";

test('multi chat user', async ({ browser }) => {
    test.skip(!!process.env.CI, "Depends on a local chat server at http://localhost:3000 — not available in CI");
    let ctx1: BrowserContext = await browser.newContext();
    let ctx2: BrowserContext = await browser.newContext();
    let page1: Page = await ctx1.newPage();
    let page2: Page = await ctx2.newPage();
    await page1.goto('http://localhost:3000/');
    await page2.goto('http://localhost:3000/');
    await page1.locator('[data-testid="username-input"]').fill('Naveen');
    await page1.locator('[data-testid="join-btn"]').click();
    // Wait for the chat UI to appear on page1 before trying to send a message.
    // Without this, Playwright tries to fill message-input while it's still hidden (join screen showing).
    await page1.locator('[data-testid="message-input"]').waitFor({ state: 'visible' });

    await page2.locator('[data-testid="username-input"]').fill('Ankita');
    await page2.locator('[data-testid="join-btn"]').click();
    // Same wait for page2 — Ankita's chat UI must be visible before sending her message.
    await page2.locator('[data-testid="message-input"]').waitFor({ state: 'visible' });

    await page1.locator('[data-testid="message-input"]').fill('Hi Ankita how are you?');
    await page1.locator('[data-testid="send-btn"]').click();
    await page2.locator('[data-testid="message-input"]').fill('Hello Naveen, I am Good, how are you?');
    await page2.locator('[data-testid="send-btn"]').click();
    await page1.waitForTimeout(5000);
})