//hooks: before(setup), after(teardown), beforeEach, afterEach
//4 simple hooks in playwright test framework, they are before, after, beforeEach, afterEach

import { test, expect } from "@playwright/test";

//Run once before all tests in the file
test.beforeAll(async () => {
  console.log("before all tests -- Connect to DB");
});

//Runs before each test in the file
test.beforeEach(async () => {
  console.log("before each test -- Login to app");
});

//Runs after each test in the file
test.afterEach(async () => {
  console.log("after each test -- Logout from app");
});

//Run once after all tests in the file
test.afterAll(async () => {
  console.log("after all tests -- Disconnect from DB");
});

test("title test", async () => {
  console.log("title test");
});

// 🔹 Regression Test
test("url test", async () => {
  console.log("url test");
});

// 🔹 Regression Test
test("login test", async () => {
  console.log("login test");
});

// 🔹 Sanity Test
test("payment test", async () => {
  console.log("payment test");
});
