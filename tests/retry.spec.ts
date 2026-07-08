import { test, expect } from "@playwright/test";

// 🔹 Group with retry override
test.describe("search related test cases", () => {
  // 🔥 Override retry at describe level
  test.describe.configure({ retries: 2 });

  test("search product test", async () => {
    // ❌ intentionally failing — demonstrates describe-level retries
    test.fail(true, "Teaching example: intentional failure to demo retry behavior");
    console.log("search product test");
    expect(1).toBe(2);
  });

  test("search default test", async () => {
    console.log("search default test");
    expect(1).toBe(1); // ✅ pass
  });
});

// 🔹 Individual test override
test("cart test", async ({}, testInfo) => {
  // ❌ intentionally failing — demonstrates test-level retry attempt index
  test.fail(true, "Teaching example: intentional failure to demo retry behavior");
  testInfo.retry; /* current retry attempt index 0 on first run */
  console.log("cart test, attempt:", testInfo.retry);
  expect(1).toBe(2);
});
// retries are still configured at project/describe/global level

// 🔹 No retry test
test("title test", async () => {
  console.log("title test");
  expect(1).toBe(1);
});
