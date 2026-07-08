import { Page, chromium, Browser, test, Locator, expect } from "@playwright/test";

test("calendar pagination test", async ({ page }) => {
  await page.goto("http://seleniumpractise.blogspot.com/2016/08/how-to-handle-calendar-in-selenium.html");
  await page.locator("#datepicker").click();
  let month = await page.locator("span.ui-datepicker-month").textContent();
  let year = await page.locator("span.ui-datepicker-year").textContent();
  console.log(`Current month: ${month}, Current year: ${year}`);
  let currentMonthYear = `${month?.trim()} ${year?.trim()}`; // ? is used to handle potential null values from textContent()
  console.log(`Current month and year: ${currentMonthYear}`);
  let targetMonthYear = "December 2026";
  while (true) {
    if (currentMonthYear === targetMonthYear) {
      //await page.locator(".ui-datepicker-calendar").getByRole("cell", { name: "15" }).click();
      await page.getByRole("link", { name: "15", exact: true }).click();
      console.log(`Selected date: 15 ${month} ${year}`);
      break;
    } else {
      await page.locator(".ui-datepicker-next").click();
      month = await page.locator("span.ui-datepicker-month").textContent();
      year = await page.locator("span.ui-datepicker-year").textContent();
      currentMonthYear = `${month?.trim()} ${year?.trim()}`;
      console.log(`Current month and year after clicking next: ${currentMonthYear}`);
    }
  }
  // await page.pause();
});
