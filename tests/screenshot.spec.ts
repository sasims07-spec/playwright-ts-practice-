import { test, expect, Browser, Page, Locator } from "@playwright/test";

/* ==========================================================================
 * SCREENSHOTS & ATTACHMENTS — Revision Notes
 * --------------------------------------------------------------------------
 * KEY CONCEPTS to remember:
 *
 * 1) page.screenshot() vs locator.screenshot()
 *      - page.screenshot()        -> entire page (or viewport)
 *      - locator.screenshot()     -> only the target element (auto-scrolls into view)
 *
 * 2) Where the screenshot goes
 *      - { path: "..." }          -> writes a file to disk (relative to CWD/project root)
 *      - no `path`                -> returns a Buffer in memory (use it for attach())
 *
 * 3) Test fixtures vs TestInfo
 *      - The 1st arg `{ page }` is the FIXTURES object (page, browser, context, request...)
 *      - The 2nd arg `testInfo`  is the TestInfo object (title, retries, attach(), etc.)
 *      - `test.info()` (static) and the destructured `testInfo` (param) are EQUIVALENT.
 *        Prefer `testInfo` when you already have it — clearer and avoids the static lookup.
 *
 * 4) attach() — adds artifacts to the HTML report
 *      - body can be: Buffer | string
 *      - contentType decides how the report renders it (image/png, text/plain, application/json...)
 * ========================================================================== */

test("screenshot test", async ({ page }, testInfo) => {
  // NOTE: 2nd parameter `testInfo` is destructured from the test runner — it carries
  //       per-test metadata (title, retries, outputDir, attach(), annotations, ...).

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
  );

  // --- (A) FULL-PAGE SCREENSHOT ------------------------------------------------
  // fullPage: true   -> captures the ENTIRE scrollable page (not just the viewport)
  await page.screenshot({ path: "RRegisterPage.png", fullPage: true });

  // --- (B) VIEWPORT-ONLY SCREENSHOT -------------------------------------------
  // default (no fullPage) -> only the currently visible part of the page
  await page.screenshot({ path: "RegisterPage1.png" });

  // --- (C) ELEMENT SCREENSHOT --------------------------------------------------
  // locator.screenshot() captures ONLY that element (auto-scrolls + auto-waits).
  await page.getByAltText("naveenopencart").screenshot({ path: "Logo.png" });

  // --- (D) ADVANCED SCREENSHOT OPTIONS ----------------------------------------
  // GOTCHA: `clip` and `fullPage` together is contradictory — `fullPage` is ignored
  //         when `clip` is set. Pick one in real tests.
  // GOTCHA: `omitBackground` (transparent BG) only works for PNG, ignored for JPEG.
  await page.screenshot({
    path: "RegisterPage2.jpeg",
    fullPage: true,
    type: "jpeg",
    quality: 80,           // JPEG only: 0-100 (higher = better quality, bigger file)
    omitBackground: true,  // PNG only:  transparent background
    clip: { x: 0, y: 0, width: 500, height: 300 }, // capture a specific rectangle
  });

  // --- (E) IN-MEMORY SCREENSHOT + ATTACH TO HTML REPORT -----------------------
  // No `path` -> returns a Buffer. Useful when you don't need a file on disk,
  // only the artifact in the report.
  const screenshot = await page.screenshot();

  // test.info().attach(...) attaches the buffer as an artifact in the HTML report.
  // CONCEPT: `test.info()` is the static accessor for TestInfo of the current test.
  await test.info().attach("screenshot.png", {
    body: screenshot,                 // Buffer (binary content)
    contentType: "image/png",         // tells the report to render it as an image
  });

  // --- (F) ATTACH CUSTOM LOGS / TEXT DATA TO REPORT ---------------------------
  // CONCEPT: same attach() API works for plain text, JSON, CSV, anything.
  // Useful for: business data, request/response dumps, computed values, etc.
  // Here we use the destructured `testInfo` (equivalent to test.info()).
  await testInfo.attach("logs", {
    body: "User:Naveen, Cart: 3 Items, Total Price: $150",
    contentType: "text/plain",
  });

  // --- BONUS examples to remember ---------------------------------------------
  // JSON attachment:
  //   await testInfo.attach("payload", {
  //     body: JSON.stringify({ user: "Naveen", items: 3 }, null, 2),
  //     contentType: "application/json",
  //   });
  //
  // Attach an existing file from disk:
  //   await testInfo.attach("server.log", { path: "logs/server.log" });
});

/* ==========================================================================
 * QUICK REVISION CHECKLIST
 * --------------------------------------------------------------------------
 * [ ] Difference between page.screenshot() and locator.screenshot()
 * [ ] What `fullPage`, `clip`, `quality`, `omitBackground`, `type` do
 * [ ] When does screenshot() return a Buffer vs write a file? (presence of `path`)
 * [ ] How to access TestInfo: 2nd test arg `testInfo`  OR  static `test.info()`
 * [ ] testInfo.attach() — body (Buffer|string) + contentType
 * [ ] Common contentTypes: image/png, image/jpeg, text/plain, application/json
 * ========================================================================== */
