import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  fullyParallel: false,
  workers: 1,
  retries: 1,
  timeout: 30000,
  reporter: [["list"], ["html", { open: "never", outputFolder: "../playwright-qa-report" }]],
  use: {
    baseURL: "https://supracloud.co.uk",
    screenshot: "on",
    ignoreHTTPSErrors: false,
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"], viewport: { width: 375, height: 812 } },
    },
  ],
});
