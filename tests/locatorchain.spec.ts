import { test, expect, Page, chromium, Browser } from "@playwright/test";
test("locator chain test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  await page.locator("form").getByRole("textbox", { name: "First Name" }).fill("naveen");
  await page.locator("form").getByRole("checkbox").click();
  await page.locator("#column-right").getByRole("link", { name: "Login" }).click();
  // await page.pause();
});

test("webtable checkbox button click test", async ({ page }) => {
  await page.goto("https://qavbox.github.io/demo/webtable/");
  await page.locator("#table01").locator("tr").filter({ hasText: "Selenium" }).getByRole("checkbox").click();
  await page.locator("#table01").locator("tr").filter({ hasText: "Selenium" }).getByRole("button", { name: "Delete" }).click();
  // await page.pause();
});

test("webtable column value test", async ({ page }) => {
  await page.goto("https://qavbox.github.io/demo/webtable/");
  let age = await page.locator("#cont").locator("tr").filter({ hasText: "Ashton Cox" }).locator("td").nth(3).innerText();
  console.log("Age of Ashton Cox is: " + age);
  // await page.pause();
});

test("webtable user data test", async ({ page }) => {
  await page.goto("https://qavbox.github.io/demo/webtable/");
  //let userData: string[] = await page.locator('#table02').locator('tr').filter({ hasText: "Ashton Cox" }).locator("td").allInnerTexts(); //allInnterTexts() always returns the string array
  let userData: string[] = await page.locator("#table02 tr").filter({ hasText: "Ashton Cox" }).locator("td").allInnerTexts(); //allInnterTexts() always returns the string array
  //console.log("User data of Ashton Cox is: " + userData.join(","));
  for (let e of userData) {
    console.log(e);
  }
  // await page.pause();
});

test("webtable total rows and columns test", async ({ page }) => {
  await page.goto("https://qavbox.github.io/demo/webtable/");
  let totalRows = await page.locator("#table01 tr").count();
  let totalColumns = await page.locator("#table01 th").count();
  console.log("Rows Count: " + totalRows);
  console.log("Columns Count: " + totalColumns);
  // await page.pause();
});

test("webtable full data", async ({ page }) => {
  await page.goto("https://www.w3schools.com/html/html_tables.asp");
  let fullData = await page.locator("table").first().locator("tr td").allInnerTexts(); // without header
  //let fullData = await page.locator("table").first().locator("tr").allInnerTexts(); // with header
  for (let e of fullData) {
    console.log(e);
  }
  // await page.pause();
});

/*
//Naveen given method but it's not working for me, may be because of delays
test("webtable all checkbox click", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable.html");
  let checkBoxes = await page.locator("table tr td").getByRole("checkbox").all();
  for (let e of checkBoxes) {
    await e.click();
    await page.waitForTimeout(500);
  }
  // await page.pause();
}); */

test("webtable all checkbox click", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable.html");
  const checkboxes = page.locator("table tr td").getByRole("checkbox");
  const count = await checkboxes.count();

  for (let i = 0; i < count; i++) {
    await checkboxes.nth(i).click();
  }
});
