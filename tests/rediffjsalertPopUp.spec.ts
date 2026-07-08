import { Page, chromium, Browser, test, Locator } from "@playwright/test";
test("rediff js alert pop up handle test", async ({ page }) => {
  test.skip(!!process.env.CI, "External site (rediff.com) is slow/unresponsive in headless CI");
  page.once("dialog", async (popup) => {
    if (popup.type() === "alert") {
      console.log("Alert message:", popup.message());
      await popup.accept();
    }
  });

  await page.goto("https://mail.rediff.com/cgi-bin/login.cgi/config/ma");
  await page.getByRole("button", { name: "Log In" }).click();

  // await page.pause();
});
