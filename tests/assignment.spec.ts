import { test, Page, chromium, Browser, Locator } from "@playwright/test";

test("Assignment fill form test", async ({ page }) => {
  await page.goto("https://www.magupdate.co.uk/magazine-subscription/phrr");
  await page.getByRole("radio", { name: "I do not wish to receive FREE copies of HR Magazine regularly." }).click();
  await page.getByRole("textbox", { name: "Title" }).first().fill("Mr");
  await page.getByRole("textbox", { name: "Initials" }).fill("A");
  await page.getByRole("textbox", { name: "Forename" }).fill("Robert");
  await page.getByRole("textbox", { name: "Surname" }).fill("Nicholas");
  await page.getByRole("textbox", { name: "Internal Routing Code" }).fill("A123");
  await page.getByRole("textbox", { name: "Direct Email" }).fill("Robert.Nicholas@example.com");
  await page.getByRole("textbox", { name: "Direct Telephone" }).fill("1234567890");
  await page.getByRole("textbox", { name: "Job Title" }).fill("HR Manager");
  await page.getByRole("textbox", { name: "Company Name" }).fill("AA Limited");
  await page.getByRole("textbox", { name: "Address Line 1" }).fill("25, ABC Street");
  await page.getByRole("textbox", { name: "Address Line 2" }).fill("XYZ Area");
  await page.getByRole("textbox", { name: "Address Line 3" }).fill("ABC City");
  await page.getByRole("textbox", { name: "Town / City" }).fill("Chennai");
  await page.locator("#Contact_CountryCode").selectOption({ label: "India" });
  await page.getByRole("textbox", { name: "Postcode / Zipcode" }).fill("600001");
  await page.getByRole("textbox", { name: "Company Telephone Number" }).fill("1234567890");
  await page.getByRole("textbox", { name: "Company Website" }).fill("www.aalimited.com");
  await page.locator("#Question-100034").selectOption({ label: "Both" });
  await page.locator("#Question-758").selectOption({ label: "Other" });
  await page.locator("#Question-875").fill("Testing");
  await page.locator("#Question-759").selectOption({ label: "Other" });
  await page.locator("#Question-876").fill("Information Technology");
  await page.getByRole("checkbox", { name: "Recruitment" }).check();
  await page.getByRole("checkbox", { name: "Relocation" }).check();
  await page.getByRole("checkbox", { name: "Talent" }).check();
  await page.locator("#Question-874").fill("100");
  await page.locator("#Question-762").selectOption({ label: "10-24" });
  await page.locator("#Question-763").selectOption({ label: "Less than £100,000" });
  await page.locator("#Question-639").fill("JO");
  // await page.pause();
});

//select all the options in the dropdown and click all choice checkboxes
test("jquery dropdown all selection and check test", async ({ page }) => {
  await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/");
  await page.getByRole("button", { name: "Do not consent" }).click();
  await page.locator("#justAnInputBox").click();
  await checkAllChoices(page);
  // await page.pause();
});

async function checkAllChoices(page: Page): Promise<void> {
  const choices = await page.locator("span.comboTreeItemTitle").all();
  for (let i = 0; i < 14; i++) {
    await choices[i].click();
  }
}
/*async function checkAllChoices(page: Page): Promise<void> {
  const choices = page.locator("span.comboTreeItemTitle");
  const count = await choices.count();
  for (let i = 0; i < count; i++) {
    const choice = choices.nth(i);
    if (await choice.isVisible()) {
      await choice.click();
    }
  }
}*/
