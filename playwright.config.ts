import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',   // chỉ test trong thư mục tests
  testMatch: ['**/*.spec.ts'],
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});
