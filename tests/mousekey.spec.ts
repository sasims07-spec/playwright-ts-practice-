import { Page, chromium, Browser, test, Locator } from "@playwright/test";

test("right click or context click test", async ({ page }) => {
  await page.goto("http://swisnl.github.io/jQuery-contextMenu/demo.html");
  await page.getByText("right click me", { exact: true }).click({ button: "right" });
  // await page.pause();
  page.getByText("Copy", { exact: true }).click();
  // await page.pause();
});

test("hover and right menu click test", async ({ page }) => {
  test.skip(!!process.env.CI, "External site (SpiceJet) — layout drift & bot detection in headless CI");
  await page.goto("https://www.spicejet.com/");
  await page.getByText("Travel Policies", { exact: true }).hover();
  await page.getByText("Passenger Rights", { exact: true }).waitFor({ state: "visible" });
  await page.getByText("Passenger Rights", { exact: true }).click();
  // await page.pause();
});

test("hover and four level of right menu click test", async ({ page }) => {
  test.skip(!!process.env.CI, "External site (BigBasket) — dynamic menu IDs & bot detection in headless CI");
  await page.goto("https://www.bigbasket.com/");
  await page.getByText("Shop by", { exact: true }).nth(1).click(); //Level1
  //below locatore chaining is recommended by codegen, because single locator is not able to find the element, because of the dynamic nature of the website, so we are using the locator chaining to find the element, because it will first find the parent element and then it will find the child element, this is more reliable than using a single locator to find the element
  await page.locator('[id="headlessui-menu-items-:R15d956:"]').getByRole("link", { name: "Beverages" }).hover(); //Level2
  await page.locator('[id="headlessui-menu-items-:R15d956:"]').getByRole("link", { name: "Tea" }).hover(); //Level3
  await page.locator('[id="headlessui-menu-items-:R15d956:"]').getByRole("link", { name: "Green Tea" }).click(); //Level4

  // await page.pause();
});

test("drag and drop handling test", async ({ page }) => {
  await page.goto("https://jqueryui.com/resources/demos/droppable/default.html");
  let source = page.locator("#draggable");
  let target = page.locator("#droppable");
  await source.dragTo(target);
  // await page.pause();
});

test("keyboard Enter handling test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  let searchBox = page.getByRole("textbox", { name: "Search" });
  await searchBox.fill("Macbook");
  //press keyboard enter key
  await searchBox.press("Enter");
  // await page.pause();
});

test("keyboard Tab Sequence Accessibility form test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  let firstName = page.getByRole("textbox", { name: "First Name" });
  await firstName.fill("John"); // first name
  //press keyboard tab key to navigate through the form fields
  await page.keyboard.press("Tab");
  await page.keyboard.type("Doe"); // last name
  await page.keyboard.press("Tab");
  await page.keyboard.type("'john@gmailc.om"); // email
  await page.keyboard.press("Tab");
  await page.keyboard.type("1234567890"); // phone
  await page.keyboard.press("Tab");
  await page.keyboard.type("Password@123");
  await page.keyboard.press("Tab");
  await page.keyboard.type("Password@123"); // confirm password
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowRight"); // subscribe yes. No arrowleft
  // await page.pause();
  await page.keyboard.press("Tab"); //privacy policy link
  await page.keyboard.press("Tab"); //checkbox
  await page.keyboard.press("Space"); //click on the checkbox
  await page.keyboard.press("Enter"); //press enter - submit the form
  // await page.pause();
});

test("keyboard copy paste test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  let firstName = page.getByRole("textbox", { name: "First Name" });
  await firstName.fill("John"); // first name
  //press keyboard tab key to navigate through the form fields
  await page.keyboard.press("Control+A"); // select all text in the first name field
  await page.keyboard.press("Control+C"); // copy the selected text
  await page.keyboard.press("Tab"); // move to the last name field
  await page.keyboard.press("Control+V"); // paste the copied text
  await page.waitForTimeout(3000);
  await firstName.press("Control+A");
  await firstName.press("Backspace");
  //hard refersh: Control+Shift+R
  await page.keyboard.press("Control+Shift+R");
  //open in new tab or window:
  await page.getByRole("link", { name: "Forgotten Password", exact: true }).click({ modifiers: ["Control"] }); // open in new tab
  //await page.keyboard.press("Control+N");
  // await page.pause();
});
