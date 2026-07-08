import { Page, chromium, Browser, test, Locator, expect } from "@playwright/test";

test("expect assertions for element attributes test", async ({ page }) => {
  let url = "https://www.iciciprulife.com/insurance-guide/financial-planning-tools-calculators/power-compounding-calculator.html";
  await page.goto(url, { timeout: 90000, waitUntil: "domcontentloaded" }); // Open the calculator page with extended timeout and wait for DOM content to load
  //await page.waitForURL(/.*.power-compounding-calculator.html.*/);
  // Find all dot data points on the chart
  let element = page.locator(".highcharts-markers .highcharts-point"); // Locate all SVG circles
  let out = await element.all(); // Convert to array so we can loop

  let count = 1; // Counter for display – starts at 1

  for (let c of out) {
    // Loop: c = each dot element

    await c.hover(); // Hover mouse over this dot – triggers tooltip
    // NOTE: hover() triggers the tooltip element to appear in the DOM

    // Get position of the dot
    let box = await c.boundingBox(); // Get dot's x, y, width, height on screen
    let x = box!.x + box!.width / 2; // Calculate horizontal centre of dot
    let y = box!.y + box!.height / 2; // Calculate vertical centre of dot

    // Move mouse to exact centre
    await page.mouse.move(x, y); // Precisely position mouse on dot centre

    // Read and print the tooltip
    console.log(count, ":", await page.locator(".highcharts-tooltip").textContent()); // Print counter and tooltip value

    await page.waitForTimeout(200); // Brief pause so tooltip fully renders
    count++; // Move to next count
  }

  // await page.pause(); // Pause at end to inspect final state
});
