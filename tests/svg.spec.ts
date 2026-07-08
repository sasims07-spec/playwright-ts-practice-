//SVG will support css selector and xpath
//CSS selector: normal way to select element by id, class, tag name, attribute, etc.
//XPath: regulare xpath will not work, but we can use svg specific xpath to select element by id, class, tag name, attribute, etc.
//Here we have use function local-name() or name()
//Famous interview question: Can we use xpath to select element in svg? Yes, we can, but we need to use svg specific xpath, which is different from regular xpath.
import { Page, chromium, Browser, test, Locator } from "@playwright/test";
test("Flipkart SVG Search Icon test", async ({ page }) => {
  test.skip(!!process.env.CI, "External site (Flipkart) blocks headless CI traffic");
  await page.goto("https://www.flipkart.com/");
  await page.getByRole("textbox", { name: "Search for Products, Brands" }).fill("Macbook Pro");
  //await page.getByRole("button", { name: "Search for Products, Brands and More" }).locator('svg[fill="none"]').click();
  await page.getByRole("button", { name: "Search for Products, Brands and More" }).locator("//*[local-name()='svg']").click(); //here we are using the function local-name() to select the svg element, because regular xpath will not work for svg elements

  // await page.pause();
});

test("SVG Graph element test", async ({ page }) => {
  await page.goto("https://petdiseasealerts.org/forecast-map");
  await page.waitForTimeout(5000);
  //await page.frameLocator('//iframe[contains(@id,"map-instance")]'); //here we are using the function contains() to select the iframe element, because the id of the iframe is dynamic and it contains the string "map-instance"
  let frame = page.frameLocator('iframe[id*="map-instance"]'); //here we are using the css selector with attribute selector to select the iframe element, because the id of the iframe is dynamic and it contains the string "map-instance"
  let allRegions: Locator[] = await frame.locator("g.region").all(); //here we are using the css selector to select all the g elements with class name "region", because in svg, the g element is used to group other elements together and it has the class name "region"
  console.log("Total number of regions:", allRegions.length);

  for (let reg of allRegions) {
    //await reg.hover(); //here we are using the hover() method to hover over the g element, because in svg, when we hover over the region, it will show the tooltip with the name of the region
    //but the above hover() method  failed because of uneven shape of the region in the map
    // so use boundingBox() method to get the coordinates of the region and then use mouse.move() method to move the mouse to the center of the region
    let box = await reg.boundingBox();
    let CenterX = box!.x + box!.width / 2;
    let CenterY = box!.y + box!.height / 2;
    await page.mouse.move(CenterX, CenterY);

    let regionName = await reg.getAttribute("id"); //here we are using the getAttribute() method to get the value of the id attribute of the g element, because in svg, the id attribute is used to identify the region
    console.log(regionName);
    await page.waitForTimeout(500);
  }

  //await page.pause();
});
