import { Page, chromium, Browser, test, Locator, expect } from "@playwright/test";
import * as fs from "fs";

test("file download test", async ({ page }) => {
  test.skip(!!process.env.CI, "External demo site (herokuapp) can throttle/reject headless CI traffic");
  await page.goto("https://the-internet.herokuapp.com/download");

  let [download] = await Promise.all([
    page.waitForEvent("download"), //wait for the download event, this is predefined in the playwright library.
    page.getByRole("link", { name: "inputdata.json" }).click(), //click on the link which will start the download
  ]);
  //during downloads no errors should throw
  expect(await download.failure()).toBeNull(); //to check if the download is successful or not, if the download is successful then the failure() method will return null, otherwise it will return the error message

  //Get the file name of the downloaded file
  console.log("File name:", download.suggestedFilename());
  //Here we are saving the downloaded file to the downloads folder in our project directory, and we are using the suggested file name for the downloaded file.
  let filePath = "./downloads/" + download.suggestedFilename();
  await download.saveAs(filePath);

  //verify the file exists
  expect(fs.existsSync(filePath)).toBeTruthy(); //to check if the file exists or not, we are using the existsSync() method from the fs module, which returns true if the file exists, otherwise it returns false

  //verify the file size is greater than 0
  let fileSize = fs.statSync(filePath).size; //to get the file size, we are using the statSync() method from the fs module, which returns the file statistics, and we are accessing the size property of the file statistics to get the file size
  console.log("File size in bytes:", fileSize);
  expect(fileSize).toBeGreaterThan(0); //to check if the file size is greater than 0
  // await page.pause();
});
