import { Page, chromium, Browser, test, Locator, expect } from "@playwright/test";

test("expect assertions test", async ({ page }) => {
  // Define a test block – page is injected automatically

  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register"); // Open the Register Account page in the browser

  expect(page.url()).toContain("account/register"); // Sync check – URL must contain this string (no await)

  let header = page.getByRole("heading", { name: "Register Account" }); // Find heading by its ARIA role and visible name

  await expect(header).toBeVisible(); // Wait for heading to appear on screen
  await expect(header).toHaveText("Register Account"); // Check the heading text matches exactly

  await expect(page.locator("aside#column-right a")).toHaveCount(13); // Count all <a> links inside the right sidebar – should be 13

  await page.locator("#input-firstname").fill("Naveen Automation"); // Type into the first name field
  await expect(page.locator("#input-firstname")).toHaveValue("Naveen Automation"); // Verify the field now contains what we typed

  await page.goto("https://naveenautomationlabs.com/opencart/ui/data-testid-page.html"); // Navigate to the second test page

  await expect(page.getByTestId("country-select").locator("option")).toHaveCount(6); // Find the dropdown by data-testid, count its options – should be 6

  await page.getByTestId("country-select").selectOption("India"); // Select "India" from the country dropdown
  await expect(page.getByTestId("country-select")).toHaveValue("in"); // After selecting India, value should be "in" (country code)
});

test("expect assertions for element attributes test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/elementstate.html");

  // Check the type attribute of the first name input
  await expect(page.locator("#firstname")).toHaveAttribute("type", "text"); // HTML: type="text"

  // Check the placeholder hint text attribute
  await expect(page.locator("#firstname")).toHaveAttribute("placeholder", "Enter first name"); // HTML: placeholder="Enter first name"

  // Check username has the readonly attribute (value is empty string)
  await expect(page.locator("#username")).toHaveAttribute("readonly", ""); // readonly="" means the attribute exists with no value

  // Check element id using a data-test selector
  await expect(page.locator('[data-test="firstname"]')).toHaveId("firstname"); // Locate by data-test attr, then verify its id
});
