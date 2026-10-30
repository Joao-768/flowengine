import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end test against the real stack. The API now runs in the
 * api-joao-caetano host (https://github.com/Joao-768/api-joao-caetano), which
 * must already be running on port 4400 with Postgres and Redis behind it.
 * The frontend is started here unless it is already running.
 */
export default defineConfig({
    testDir: './e2e',
    timeout: 60_000,
    use: {
        baseURL: 'http://localhost:5176',
        trace: 'retain-on-failure',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: [
        { command: 'npm run dev', url: 'http://localhost:5176', reuseExistingServer: true },
    ],
})
