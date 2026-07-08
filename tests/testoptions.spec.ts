import { test, expect } from "@playwright/test";

// Normal test
test("title test", async () => {
  console.log("title test");
});

// Skip test (will not run)
test.skip("url test", async () => {
  console.log("url test");
});

//  Only test (uncomment to run only this test)
// test.only('only test', async () => {
//   console.log('only test running');
// });

// Fixme test (known issue - skipped intentionally)
test("payment test", async () => {
  test.fixme("Known issue - will fix later");
  console.log("payment test");
});

// Fail test (expected to fail)
test("search test", async () => {
  test.fail("Known bug - expected failure");
  expect(1).toBe(2); // will fail → but treated as PASS
});

// Grouping tests using describe
test.describe("Login related test cases", () => {
  test("login test", async () => {
    console.log("login test");
  });

  test("login forgot pwd test", async () => {
    console.log("login forgot password test");
  });
});

// Another normal test
test("cart test", async () => {
  console.log("cart test");
});
