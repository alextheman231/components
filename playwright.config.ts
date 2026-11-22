import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  retries: process.env.CI ? 2 : 0,
  testDir: "./tests/end-to-end",
  testMatch: "*.test.ts",
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  workers: process.env.CI ? 1 : undefined,
});
