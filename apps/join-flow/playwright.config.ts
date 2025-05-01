import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // controls whether Playwright will fail if it encounters tests marked with .only.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3005",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  // run all tests except lighthouse and core as those are handled in the config below
  testMatch: /^(?!.*(lighthouse|core)\.spec\.ts$).*\.spec\.ts$/,
  projects: process.env.CI
    ? [
        // TODO: update this to only run full app journey test when they are written
        {
          name: "mobile-chrome",
          use: { ...devices["Pixel 5"] },
          testMatch: /content\.spec\.ts$/,
        },
      ]
    : [
        // Lighthouse tests only on desktop chrome
        {
          name: "lighthouse",
          use: {
            ...devices["Desktop Chrome"],
            launchOptions: { args: ["--remote-debugging-port=9222"] },
          },
          testMatch: /lighthouse\.spec\.ts$/,
        },
        {
          name: "mobile-chrome",
          use: { ...devices["Pixel 5"] },
        },
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },
        {
          name: "webkit",
          use: { ...devices["Desktop Safari"] },
        },
        {
          name: "mobile-safari",
          use: { ...devices["iPhone 12"] },
        },
        {
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
        },
        {
          name: "edge",
          use: { ...devices["Desktop Edge"] },
        },
      ],
  webServer: {
    command: "npm run start:e2e",
    url: "http://localhost:3005/join-flow",
    reuseExistingServer: !process.env.CI,
  },
});
