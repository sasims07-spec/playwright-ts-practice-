import { test, Page, chromium, Browser, Locator } from "@playwright/test";

/*test("Total links on the page", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  //links: <a> tag
  //image: <img> tag
  // using codegen we tried to find all the links in the page xpath and css are generated the same numbers.
  // Finally we use css selector to get all the links on the page. all() method will return the array of locators.
  let allLinks: Locator[] = await page.locator("a[href]").all();
  //let allLinks: Locator[] = await page.locator("//a[@href]").all(); // xpath
  // let allLinks: Locator[] = await page.locator("a").all(); // this will give us all the links on the page including the ones which do not have href attribute.
  let totalLinks = allLinks.length;
  console.log("Total links on the page: " + totalLinks);
  for (let e of allLinks) {
    let linkText = await e.innerText(); // this will give us the text of the link. if we want to get the href value we can use getAttribute method.
    let hrefValue = await e.getAttribute("href");
    console.log(linkText + " : " + hrefValue);
  }
}); */

test("Total links on the page", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  //links: <a> tag
  //image: <img> tag
  // using codegen we tried to find all the links in the page xpath and css are generated the same numbers.
  // Finally we use css selector to get all the links on the page. all() method will return the array of locators.
  let allLinks: Locator[] = await page.locator("a[href]").all();
  //let allLinks: Locator[] = await page.locator("//a[@href]").all(); // xpath
  // let allLinks: Locator[] = await page.locator("a").all(); // this will give us all the links on the page including the ones which do not have href attribute.
  let totalLinks = allLinks.length;
  console.log("Total links on the page: " + totalLinks);
  for (let e of allLinks) {
    let linkText = await e.innerText(); // this will give us the text of the link. if we want to get the href value we can use getAttribute method.
    let hrefValue = await e.getAttribute("href");
    console.log(linkText + " : " + hrefValue);
  }
});

test("Total images on the page", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  let allImages: Locator[] = await page.locator("img").all();
  let totalImages = allImages.length;
  console.log("Total images on the page: " + totalImages);

  for (let k of allImages) {
    let imageSrc = await k.getAttribute("src");
    let imageAlt = await k.getAttribute("alt");
    console.log("ImageAlt:" + imageAlt);
    console.log("ImageSrc:" + imageSrc);
  }
});

test("Total links on the page count method", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  let totalLinks: number = await page.locator("a").count();
  console.log("Total links on the page: " + totalLinks);
});

test("iterate links and click with break", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  let allLinks: Locator[] = await page.locator("a.list-group-item").all();
  for (let e of allLinks) {
    await e.highlight();
    let linkText = (await e.innerText()).trim();
    console.log(linkText);
    //await page.waitForTimeout(2000);
    if (linkText === "Transactions") {
      await e.click();
      break;
    }
  }
  // await page.pause();
});
