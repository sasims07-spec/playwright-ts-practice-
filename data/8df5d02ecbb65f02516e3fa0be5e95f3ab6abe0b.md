# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: retry.spec.ts >> cart test
- Location: tests/retry.spec.ts:22:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 1
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | // 🔹 Group with retry override
  4  | test.describe("search related test cases", () => {
  5  |   // 🔥 Override retry at describe level
  6  |   test.describe.configure({ retries: 2 });
  7  | 
  8  |   test("search product test", async () => {
  9  |     // ❌ intentionally failing — demonstrates describe-level retries
  10 |     test.fail(true, "Teaching example: intentional failure to demo retry behavior");
  11 |     console.log("search product test");
  12 |     expect(1).toBe(2);
  13 |   });
  14 | 
  15 |   test("search default test", async () => {
  16 |     console.log("search default test");
  17 |     expect(1).toBe(1); // ✅ pass
  18 |   });
  19 | });
  20 | 
  21 | // 🔹 Individual test override
  22 | test("cart test", async ({}, testInfo) => {
  23 |   // ❌ intentionally failing — demonstrates test-level retry attempt index
  24 |   test.fail(true, "Teaching example: intentional failure to demo retry behavior");
  25 |   testInfo.retry; /* current retry attempt index 0 on first run */
  26 |   console.log("cart test, attempt:", testInfo.retry);
> 27 |   expect(1).toBe(2);
     |             ^ Error: expect(received).toBe(expected) // Object.is equality
  28 | });
  29 | // retries are still configured at project/describe/global level
  30 | 
  31 | // 🔹 No retry test
  32 | test("title test", async () => {
  33 |   console.log("title test");
  34 |   expect(1).toBe(1);
  35 | });
  36 | 
```