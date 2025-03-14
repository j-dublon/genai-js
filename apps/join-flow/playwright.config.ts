import { defineConfig, devices } from "@playwright/test";

const CI_PORT = 3004;
const DEV_PORT = 3000;

export default defineConfig({
  testDir: "./e2e",
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.CI
      ? `http://localhost:${CI_PORT}`
      : `http://localhost:${DEV_PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  ...(process.env.CI
    ? {
        webServer: {
          command: "next start -p " + CI_PORT,
          url: `http://localhost:${CI_PORT}/api/health`,
          reuseExistingServer: false,
        },
      }
    : {}),
});
