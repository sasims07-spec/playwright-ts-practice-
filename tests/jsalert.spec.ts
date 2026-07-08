import { Page, chromium, Browser, test, Locator } from "@playwright/test";
test("Javascript alert pop up handle test", async ({ page }) => {
  test.skip(!!process.env.CI, "External demo site (herokuapp) can be slow/unresponsive in CI");
  //1. listner no1: Alert - Just accept it..
  page.once("dialog", async (popup) => {
    //page.on registers a persistent event listener for all dialogs, while page.once handles only the next dialog and then removes itself. once is preferred when only a single popup is expected to avoid unintended side effects.
    if (popup.type() === "alert") {
      // alert, confirm or prompt
      console.log("Alert message:", popup.message());
      await popup.accept();
    }
  });
  //2. listner no2: Confirm - Accept or Dismiss it..
  page.on("dialog", async (popup) => {
    if (popup.type() === "confirm") {
      // alert, confirm or prompt
      console.log("Confirm message:", popup.message());
      await popup.accept();
      //await popup.dismiss();
    }
  });
  //3. listner no3: Prompt - Accept with value or Dismiss it..
  page.on("dialog", async (popup) => {
    if (popup.type() === "prompt") {
      // alert, confirm or prompt
      console.log("Prompt message:", popup.message());
      await popup.accept("Some value");
      //await popup.dismiss();
    }
  });

  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  await page.getByRole("button", { name: "Click for JS Alert" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Click for JS Confirm" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Click for JS Prompt" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Click for JS Alert" }).click();
  // await page.pause();
});
