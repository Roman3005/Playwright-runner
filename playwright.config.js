import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 50000, // ⏱ Thời gian tối đa cho mỗi test (50 giây)

  use: {
    headless: false,
    slowMo: 2000, // 🐢 Chậm 2 giây sau mỗi thao tác
    actionTimeout: 20000, // ⏱ Timeout mặc định cho mỗi action
    navigationTimeout: 30000, // ⏱ Timeout cho điều hướng
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
