import { test, expect, Page, chromium, Browser } from "@playwright/test";

test("select dropdown value test", async ({ page }) => {
  test.skip(!!process.env.CI, "External site (orangehrm.com) shows consent overlay & is slow in headless CI");
  await page.goto("https://orangehrm.com/contact-sales");
  //let defaultValue = await page.getByRole("combobox", { name: "Country" }).inputValue();
  //console.log("Default selected value is: " + defaultValue);
  await page.getByRole("combobox", { name: "Country" }).selectOption({ label: "Andorra" });
  //here lable: is visible text in the dropdown
  await page.waitForTimeout(2000);
  await page.getByRole("combobox", { name: "Country" }).selectOption("India ");
  //here we can also directly pass the visible text without using label: but it should be an exact match with the visible text in the dropdown. if there is any extra space or case difference then it will not work. so it's better to use label: for better readability and maintainability of the test.
  await page.waitForTimeout(2000);
  await page.getByRole("combobox", { name: "Country" }).selectOption({ value: "Argentina" });
  //here value: is the DOM value attribute of the option
  await page.waitForTimeout(2000);
  await page.getByRole("combobox", { name: "Country" }).selectOption({ index: 10 });
  //here index: is the index of the option in the dropdown starting from 0. Not preferred because if the dropdown options are changed then the index will also change and it will break the test.
  let currentValues = await page.getByRole("combobox", { name: "Country" }).inputValue();
  console.log("Current selected value is: " + currentValues);
  // await page.pause();
});

/*test("multi select dropdown value test", async ({ page }) => {
  await page.goto("https://selenium08.blogspot.com/2019/11/dropdown.html", {
    waitUntil: "domcontentloaded",
  });
  await page.locator('[name="Month"]').selectOption(["January", "March", "May"]);
  // await page.pause();
}); */
