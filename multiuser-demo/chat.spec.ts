import { test, expect, chromium } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

/**
 * Naveen AutomationLabs — Playwright Multi-User Browser Context Demo
 *
 * This test demonstrates how to use separate browser contexts
 * to simulate multiple independent users in the same test.
 *
 * Key concept: Each browserContext is completely isolated —
 * separate cookies, localStorage, sessions. Same browser, different "users".
 */

test.describe('Multi-User Chat — Browser Context Demo', () => {

  /**
   * TEST 1: Two users join and chat with each other
   * Demonstrates: Two browser contexts = two independent users
   */
  test('two users can join and exchange messages', async ({ browser }) => {

    // --- Setup: Create isolated contexts for Alice and Bob ---
    const aliceContext = await browser.newContext();
    const bobContext   = await browser.newContext();

    const alicePage = await aliceContext.newPage();
    const bobPage   = await bobContext.newPage();

    // Navigate both users to the app
    await alicePage.goto(BASE_URL);
    await bobPage.goto(BASE_URL);

    // --- Alice joins ---
    await alicePage.getByTestId('username-input').fill('alice');
    await alicePage.getByTestId('join-btn').click();
    await expect(alicePage.getByTestId('you-badge')).toHaveText('alice');

    // --- Bob joins ---
    await bobPage.getByTestId('username-input').fill('bob');
    await bobPage.getByTestId('join-btn').click();
    await expect(bobPage.getByTestId('you-badge')).toHaveText('bob');

    // --- Alice sends a message ---
    await alicePage.getByTestId('message-input').fill('Hey Bob! Can you see this?');
    await alicePage.getByTestId('send-btn').click();

    // --- Bob should see Alice's message (polling every 1s) ---
    await expect(
      bobPage.locator('[data-testid="chat-message"][data-user="alice"]')
    ).toBeVisible({ timeout: 5000 });

    await expect(
      bobPage.locator('[data-testid="chat-message"][data-user="alice"] [data-testid="message-text"]')
    ).toHaveText('Hey Bob! Can you see this?');

    // --- Bob replies ---
    await bobPage.getByTestId('message-input').fill('Yes Alice, I see you!');
    await bobPage.getByTestId('send-btn').click();

    // --- Alice sees Bob's reply ---
    await expect(
      alicePage.locator('[data-testid="chat-message"][data-user="bob"] [data-testid="message-text"]')
    ).toHaveText('Yes Alice, I see you!', { timeout: 5000 });

    // --- Cleanup ---
    await aliceContext.close();
    await bobContext.close();
  });


  /**
   * TEST 2: Three users — verify all see each other online
   * Demonstrates: Multiple contexts scaling to 3+ users
   */
  test('three users can see each other in the online list', async ({ browser }) => {

    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
    ]);
    const [aliceCtx, bobCtx, charlieCtx] = contexts;

    const [alicePage, bobPage, charliePage] = await Promise.all([
      aliceCtx.newPage(),
      bobCtx.newPage(),
      charlieCtx.newPage(),
    ]);

    await Promise.all([
      alicePage.goto(BASE_URL),
      bobPage.goto(BASE_URL),
      charliePage.goto(BASE_URL),
    ]);

    // All three join
    for (const [page, name] of [[alicePage, 'alice2'], [bobPage, 'bob2'], [charliePage, 'charlie']]) {
      await page.getByTestId('username-input').fill(name);
      await page.getByTestId('join-btn').click();
      await expect(page.getByTestId('you-badge')).toHaveText(name);
    }

    // Charlie should see all 3 users in the online list
    await expect(charliePage.locator('[data-testid="online-user"]')).toHaveCount(3, { timeout: 5000 });

    // Verify all names are present
    await expect(charliePage.locator('[data-testid="online-user"][data-username="alice2"]')).toBeVisible();
    await expect(charliePage.locator('[data-testid="online-user"][data-username="bob2"]')).toBeVisible();
    await expect(charliePage.locator('[data-testid="online-user"][data-username="charlie"]')).toBeVisible();

    // Cleanup
    await Promise.all(contexts.map(c => c.close()));
  });


  /**
   * TEST 3: Username conflict — same username rejected
   * Demonstrates: Contexts are isolated; server state is shared
   */
  test('duplicate username is rejected', async ({ browser }) => {

    const ctx1 = await browser.newContext();
    const ctx2 = await browser.newContext();

    const page1 = await ctx1.newPage();
    const page2 = await ctx2.newPage();

    await page1.goto(BASE_URL);
    await page2.goto(BASE_URL);

    // First user joins as "naveen"
    await page1.getByTestId('username-input').fill('naveen');
    await page1.getByTestId('join-btn').click();
    await expect(page1.getByTestId('you-badge')).toHaveText('naveen');

    // Second user tries same username — should fail
    await page2.getByTestId('username-input').fill('naveen');
    await page2.getByTestId('join-btn').click();

    // Error should be shown, login screen still visible
    await expect(page2.locator('#errorMsg')).toHaveText('Username already taken');
    await expect(page2.getByTestId('join-btn')).toBeVisible(); // still on login

    await ctx1.close();
    await ctx2.close();
  });


  /**
   * TEST 4: User leave — others see them go offline
   * Demonstrates: Real-time state sync across contexts
   */
  test('leaving user disappears from online list', async ({ browser }) => {

    const aliceCtx = await browser.newContext();
    const bobCtx   = await browser.newContext();

    const alicePage = await aliceCtx.newPage();
    const bobPage   = await bobCtx.newPage();

    await alicePage.goto(BASE_URL);
    await bobPage.goto(BASE_URL);

    await alicePage.getByTestId('username-input').fill('alice3');
    await alicePage.getByTestId('join-btn').click();

    await bobPage.getByTestId('username-input').fill('bob3');
    await bobPage.getByTestId('join-btn').click();

    // Both should see each other
    await expect(bobPage.locator('[data-testid="online-user"][data-username="alice3"]')).toBeVisible({ timeout: 5000 });

    // Alice leaves
    await alicePage.getByTestId('leave-btn').click();

    // Bob should no longer see Alice
    await expect(bobPage.locator('[data-testid="online-user"][data-username="alice3"]')).not.toBeVisible({ timeout: 5000 });

    // Leave message should appear
    await expect(bobPage.locator('[data-testid="system-message"]').last()).toHaveText('alice3 left the chat', { timeout: 5000 });

    await aliceCtx.close();
    await bobCtx.close();
  });

});


/**
 * BONUS: Full standalone example using chromium directly
 * Run this with: npx playwright test --grep "standalone"
 */
test('standalone — alice and bob chat from scratch', async () => {
  const browser = await chromium.launch();

  // Reset server state
  await fetch(`${BASE_URL}/api/reset`, { method: 'POST' });

  const aliceContext = await browser.newContext();
  const bobContext   = await browser.newContext();
  const alicePage = await aliceContext.newPage();
  const bobPage   = await bobContext.newPage();

  await alicePage.goto(BASE_URL);
  await bobPage.goto(BASE_URL);

  await alicePage.getByTestId('username-input').fill('alice');
  await alicePage.getByTestId('join-btn').click();

  await bobPage.getByTestId('username-input').fill('bob');
  await bobPage.getByTestId('join-btn').click();

  await alicePage.getByTestId('message-input').fill('Hello from Alice!');
  await alicePage.getByTestId('send-btn').click();

  await expect(
    bobPage.locator('[data-testid="message-text"]').first()
  ).toHaveText('Hello from Alice!', { timeout: 5000 });

  console.log('✅ Multi-user chat working — Alice and Bob communicated successfully!');

  await browser.close();
});
