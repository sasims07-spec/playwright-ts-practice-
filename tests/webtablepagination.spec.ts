import { Page, chromium, Browser, test, Locator, expect } from "@playwright/test";

//Find a specific user across paginated table and select the checkbox
test("webtable pagination test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable-pagination.html");
  let count = 0;
  let user = "pat_murphy";
  while (true) {
    let userPresent = await page.getByRole("cell", { name: user, exact: true }).first().isVisible();
    if (userPresent) {
      ++count;
      await page.locator("#dataTable tr").filter({ hasText: user }).first().locator('input[type = "checkbox"]').check();
      console.log(`The user "${user}" found in the page no: ${count}`);
      break;
    } else {
      let nextButton = await page.getByRole("button", { name: "›" });
      await page.waitForTimeout(2000);
      let isDisabled = await nextButton.isDisabled();
      await nextButton.click();
      if (isDisabled) {
        console.log("Pagination ended");
        break;
      }
    }
  }
  // await page.pause();
});

//Add five users and verify they appear in the 11th paginated web table
test("add userwebtable pagination test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable-pagination.html");
  let users = ["Sri_ram", "Sri_kumar", "Jaya_ram", "Sunil_kumar", "Sukumar"];
  let emails = ["sri_ram@example.com", "sri_kumar@example.com", "jaya_ram@example.com", "sunil_kumar@example.com", "sukumar@example.com"];
  let companies = ["CTS", "TCS", "CTS", "HCL", "Wipro"];
  let cities = ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Kerala"];
  for (let i = 0; i < users.length; i++) {
    await page.getByRole("textbox", { name: "Username" }).fill(users[i]);
    await page.getByRole("textbox", { name: "Email" }).fill(emails[i]);
    await page.getByRole("textbox", { name: "Company" }).fill(companies[i]);
    await page.getByRole("textbox", { name: "City" }).fill(cities[i]);
    await page.getByRole("button", { name: "Add Row" }).click();
  }
  for (let user of users) {
    let userPresent = await page.getByRole("cell", { name: user, exact: true }).isVisible();
    await expect(userPresent).toBeTruthy();
    await expect(page.getByRole("button", { name: "11" })).toBeVisible();
  }
  // await page.pause();
});

//Traverse all pages, select matching specific user and report total occurrences
test("find user in each page webtable test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable-pagination.html");
  let count = 0;
  let user = "john_doe";
  while (true) {
    let allUserChecks = await page.locator("#dataTable tr").filter({ hasText: user }).first().locator('input[type = "checkbox"]').all();
    if (allUserChecks.length > 0) {
      count = count + allUserChecks.length;
      for (let checkbox of allUserChecks) {
        await checkbox.check();
      }
    }
    let nextButton = await page.getByRole("button", { name: "›" });
    let isDisabled = await nextButton.isDisabled();
    if (isDisabled) {
      console.log("Pagination ended");
      break;
    }
    await nextButton.click();
  }
  console.log(`The user "${user}" found ${count} times in the table.`);

  // await page.pause();
});
