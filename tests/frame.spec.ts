import { test, Page, chromium, Browser, Locator, Frame, FrameLocator, expect } from "@playwright/test";

test("iframe element test", async ({ page }) => {
  await page.goto("https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/");
  await page.getByTitle("Vehicle-Registration-Forms-and-Examples").click();
  let frameLocator: FrameLocator = page.frameLocator("#frame-one748593425");
  await frameLocator.getByRole("textbox", { name: "Proposal title" }).fill("My Title");
  await frameLocator.getByRole("textbox", { name: "Location" }).fill("Chennai");
  let header = await page.locator(".details__form-preview-title").innerText();
  console.log(header);
  // await page.pause();
});

// If more than one frame is availble in the page
test("frame test", async ({ page }) => {
  await page.goto("https://www.londonfreelance.org/courses/frames/index.html");
  let header = await page.frameLocator('[name="main"]').getByRole("heading", { level: 2 }).innerText();
  console.log(header);
  let footer = await page.frameLocator('[name="bot"]').getByRole("heading", { level: 2 }).innerText();
  console.log(footer);
  // await page.pause();
});

//Important interview question: How to get the total number of frames available in the page and how to get the name and URL of each frame?
test("total number frame test", async ({ page }) => {
  await page.goto("https://www.londonfreelance.org/courses/frames/index.html");
  //In the below frames method, it will collect the frames locators available in the Frame[] array in frameCount variable and then we are printing the length of the array which is the total number of frames available in the page.
  let allFrames: Frame[] = page.frames();
  let frameCount = allFrames.length;
  console.log(`Total number of frames: ${frameCount}`);
  for (let fr of allFrames) {
    let frameName = fr.name();
    console.log(`Frame name: ${frameName}`);
    let frameUrl = fr.url();
    console.log(`Frame URL: ${frameUrl}`);
  }
  // await page.pause();
});

test("nested frame test", async ({ page }) => {
  await page.goto("https://www.dezlearn.com/nested-iframes-example/");
  let parentFrame = page.frameLocator('[name="demo_parent_iframe"]');
  let childFrame = parentFrame.frameLocator("#iframe1");

  await childFrame.getByRole("button", { name: "Click Here" }).click();
  let childMsg = await childFrame.locator("#processing").innerText();
  console.log(childMsg);
  expect(childMsg).toBe("Hooray..! You clicked the button from iframe 2");
  await parentFrame.getByRole("button", { name: "Click Here" }).click();

  let parentMsg = await parentFrame.locator("#processing").innerText();
  console.log(parentMsg);
  expect(parentMsg).toBe("Hooray..! You clicked the button from iframe 1");
  // await page.pause();
});
