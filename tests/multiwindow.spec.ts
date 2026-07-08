import { Page, chromium, Browser, test, Locator } from "@playwright/test";
test("Two window handle test", async ({ browser }) => {
  // we are destructuring the browser object from the test function, because we need to create a new context and a new page in this test, so we cannot use the page object from the test function
  let context = await browser.newContext(); //create a new context
  let page = await context.newPage(); //create a new page in the context
  await page.goto("https://orangehrm.com/contact-sales");

  let [childWindowPage] = await Promise.all([
    //here I'm waiting for two events to happen simultaneously, first is the new page to open and second is the click action on the link which will open the new tab, so I'm using Promise.all() method to wait for both the events to happen simultaneously
    context.waitForEvent("page"), //wait for the new page to open
    page.getByRole("link", { name: "About US" }).click(), //click on the link which will open the new tab
  ]);
  await childWindowPage.waitForLoadState();
  let allPages = context.pages();
  console.log("Total number of pages:", allPages.length);
  console.log("Child window page title:", await childWindowPage.title());

  await childWindowPage.bringToFront(); //bring the child window to front, because by default the focus will be on the parent window
  await childWindowPage.close(); //close the child window

  await page.bringToFront(); //bring the parent window to front
  console.log("Parent window page title:", await page.title());

  // await page.pause();
});

test("Multiple window handle test", async ({ browser }) => {
  let context = await browser.newContext(); //create a new context
  let page = await context.newPage(); //create a new page in the context
  await page.goto("https://orangehrm.com/contact-sales");

  let links: Locator[] = [
    page.getByRole("link", { name: "About US" }),
    page.getByRole("link", { name: "Become a Partner" }),
    page.getByRole("link", { name: "Contact Us" }),
    page.getByRole("link", { name: "Press Releases" }),
  ];

  let childWindowPages: Page[] = []; // create an array to store the child window pages

  for (let link of links) {
    let [childWindowPage] = await Promise.all([
      context.waitForEvent("page"), //wait for the new page to open
      link.click(), //click on the link which will open the new tab
    ]);
    await childWindowPage.waitForLoadState();
    childWindowPages.push(childWindowPage); //push the child window page to the array
  }

  for (let i = 0; i < childWindowPages.length; i++) {
    let child = childWindowPages[i];
    await child.bringToFront(); //bring the child window to front, because by default the focus will be on the parent window
    console.log(`Child window ${i + 1} page title:`, await child.title());
    await child.waitForTimeout(1000);
    await child.close(); //close the child window
  }

  await page.bringToFront(); //bring the parent window to front
  console.log("Parent window page title:", await page.title());
  console.log("Remaining Pages:", context.pages().length);
  // await page.pause();
});
