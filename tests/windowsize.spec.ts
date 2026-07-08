import { Page, chromium, Browser, test, Locator } from "@playwright/test";
//test .use is used to set the viewport size for all the tests in this file, so that we can test the responsive design of the website,
// and also to test the behavior of the website on different screen sizes, and also to test the behavior of the website on different devices, like mobile, tablet, and desktop, so that we can ensure that our website is working fine on all the devices and screen sizes.

test.use({
  viewport: { width: 800, height: 600 }, // Set the viewport size to 800x600
});

test("right click or context click test", async ({ page }) => {
  await page.goto("http://swisnl.github.io/jQuery-contextMenu/demo.html");
  // await page.pause();
});
