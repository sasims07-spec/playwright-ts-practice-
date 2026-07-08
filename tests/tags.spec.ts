import { test } from "@playwright/test";

// 🔹 Sanity Test
test("title test @sanity", async () => {
  console.log("title test");
});

// 🔹 Regression Test
test("url test @regression", async () => {
  console.log("url test");
});

// 🔹 Regression Test
test("login test @regression", async () => {
  console.log("login test");
});

// 🔹 Sanity Test
test("payment test @sanity", async () => {
  console.log("payment test");
});

// 🔥 New way (Playwright 1.45+ recommended)

test("home page test", { tag: "@home" }, async () => {
  console.log("home page test");
});

test("cart page test", { annotation: { type: "issue", description: "https://jira.abc.com/BUG-123" } }, async () => {
  console.log("cart page test with bug 123");
});

test(
  "cart page multi annotation test",
  {
    tag: ["@cart", "@regression"],
    annotation: [
      { type: "issue", description: "https://jira.abc.com/BUG-123" },
      { type: "flaky", description: "This test is getting failed 4/10 times" },
      { type: "note", description: "flaky test" },
      { type: "bug", description: "known issue" },
    ],
  },
  async () => {
    console.log("cart page multiple annotations test");
  },
);
