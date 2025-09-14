import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
 //Khai báo
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0]; // yyyy-mm-dd
  const programName = `Hậu test automation - ${dateStr}`;

  const endDate = new Date();
  endDate.setDate(today.getDate() + 30);

  const startDay = today.getDate().toString();
  const endDay = endDate.getDate().toString();

  const currentMonth = today.getMonth();
  const endMonth = endDate.getMonth();

  await page.goto('https://banve.vexere.com/login?redirect=%2F');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin.xtl');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).press('Tab');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Adminvxr@2019');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
 await page.getByRole('link', { name: 'Tổng quan' }).click();
  await page.goto('https://banve.vexere.com/marketing/marketing-tool/discount');
  await page.getByRole('button', { name: 'Tạo chương trình mới' }).click();

  function getFormattedDateTime() {
  const d = new Date();
  const date = [
    String(d.getDate()).padStart(2, '0'),
    String(d.getMonth() + 1).padStart(2, '0'),
    d.getFullYear()
  ].join('/');
  const time = [
    String(d.getHours()).padStart(2, '0'),
    String(d.getMinutes()).padStart(2, '0'),
    String(d.getSeconds()).padStart(2, '0')
  ].join(':');
  return `${date} ${time}`;
}
  // 👉 Chọn ngày bắt đầu / kết thúc
  await page.getByRole('textbox', { name: 'Ngày bắt đầu' }).click();
  await page.getByRole('cell', { name: new RegExp(`^${startDay}\\b`) }).first().click();
  await page.getByRole('cell', { name: new RegExp(`^${endDay}\\b`) }).nth(1).click();

  const name = `Hậu test Automation ${getFormattedDateTime()}`;
  await page.getByRole('textbox', { name: 'Nhập tên chương trình' }).click();
  await page.getByRole('textbox', { name: 'Nhập tên chương trình' }).fill(name);
  await page.getByRole('textbox', { name: 'Nhập tên chương trình' }).press('Enter');
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  // 👉 Điền thông tin chặng và cấu hình tiếp
  await page.locator('.ant-select-selection-item').first().click();
  await page.getByText('Cao Bằng ---- Cà Mau').click();
  await page.locator('.ant-select-selection-overflow').click();
  await page.getByText('Tất cả chuyến').click();
  await page.getByText('Giảm so với giá gốc (%)').click();
  await page.getByText('Giảm so với giá gốc (VNĐ)').click();
  await page.getByRole('spinbutton', { name: 'Nhập giá trị' }).click();
  await page.getByRole('spinbutton', { name: 'Nhập giá trị' }).fill('25000');
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
 //Check hiện thông báo thành công
  await page.locator('.ant-message-notice-content').first().click();
  await page.locator('td:nth-child(9) > div').first().click();
  await page.getByText('Xem thông tin chương trình').click();
});
