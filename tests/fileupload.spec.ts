import { Page, chromium, Browser, test, Locator } from "@playwright/test";
import path from "path";

const FIXTURE_1 = path.join(__dirname, "fixtures", "fileupload-test.txt");
const FIXTURE_2 = path.join(__dirname, "fixtures", "fileupload-test1.txt");
const FIXTURE_3 = path.join(__dirname, "fixtures", "fileupload-test2.txt");

test("single file upload test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");
  await page.locator("#single-file").setInputFiles(FIXTURE_1);
  // await page.pause();
});

test("multiple file upload test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");
  await page.locator("#multi-file").setInputFiles([FIXTURE_1, FIXTURE_2, FIXTURE_3]);
  // await page.pause();
  //clear the uploaded files
  await page.locator("#multi-file").setInputFiles([]);
  // await page.pause();
});

test("assign single file upload test", async ({ page }) => {
  test.skip(!!process.env.CI, "External demo site (practice.expandtesting.com) can throttle/reject headless CI traffic");
  await page.goto("https://practice.expandtesting.com/upload");
  await page.locator("#fileInput").setInputFiles(FIXTURE_1);
  await page.getByRole("button", { name: "Upload" }).click();
  // await page.pause();
  //clear the uploaded file
  await page.locator("#fileInput").setInputFiles([]);
  // await page.pause();
});

//What if type="file" attribute not availble in the html code, then we can use the below code to upload the file
test("file upload if type file is not present test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");
  let [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"), //wait for the file chooser event, this is predefined in the playwright library.
    page.getByRole("button", { name: "Choose Files" }).click(), //click on the button which will open the file chooser
  ]);
  await fileChooser.setFiles([FIXTURE_1, FIXTURE_2, FIXTURE_3]);
  // await page.pause();
  // await fileChooser.setFiles([]); //to clear the selected files, we can pass an empty array to the setFiles() method
  await fileChooser.setFiles([FIXTURE_1, FIXTURE_2]);
  // await page.pause();
});
