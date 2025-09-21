import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://banve.vexere.com/login?redirect=%2F');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).click();
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin.xtl');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).press('Tab');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Adminvxr@2019');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).press('Enter');
  await page.getByRole('link', { name: 'Tổng quan' }).click();
  await page.goto('https://banve.vexere.com/marketing/marketing-tool/last-minute');
  await page.getByRole('button', { name: 'Tạo chương trình mới' }).click();
 

   // Khai báo ngày tháng
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
  await page.getByRole('textbox', { name: 'Ngày bắt đầu' }).click();

  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 1);
  const startDay = today.getDate().toString();
  const endDay = endDate.getDate().toString();
  const currentMonth = today.getMonth(); // 0 = Jan
  const endMonth = endDate.getMonth();

  // ✅ Chọn ngày bắt đầu (ở tháng hiện tại)
  await page.getByRole('cell', { name: new RegExp(`^${startDay}\\b`) }).first().click();
  // ✅ Chọn ngày kết thúc
  await page.getByRole('cell', { name: new RegExp(`^${endDay}\\b`) }).nth(1).click();
  const name = `Hậu test Automation ${getFormattedDateTime()}`;
  await page.getByRole('textbox', { name: 'Nhập tên chương trình' }).click();
  await page.getByRole('textbox', { name: 'Nhập tên chương trình' }).fill(name);
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.locator('.ant-select-selection-item').first().click();
  await page.getByText('Cao Bằng ---- Cà Mau').click();
  await page.locator('.ant-select-selection-overflow').click();
  await page.getByText('Tất cả chuyến').click();
  await page.getByText('Tất cả chuyến+ 0').click();
  await page.locator('input[name="before_departure_time"]').click();
  await page.locator('input[name="before_departure_time"]').fill('12');
  await page.locator('input[name="min_fill_rate"]').click();
  await page.locator('input[name="min_fill_rate"]').fill('0');
  await page.locator('input[name="fill_rate"]').click();
  await page.locator('input[name="fill_rate"]').fill('100');
  await page.getByText('Tất cả chặng và nhóm ghế').click();
  await page.getByText('Chi tiết từng chặng và nhóm').click();
  await page.getByText('Tất cả nhóm ghế').click();
  await page.getByText('Limouisne 22 phòng đơn/đôi c').click();
  await page.locator('div').filter({ hasText: /^Trả CB 101%%%%$/ }).getByPlaceholder('0').first().click();
  await page.locator('div').filter({ hasText: /^Trả CB 101%%%%$/ }).getByPlaceholder('0').first().fill('10');
  await page.locator('.ant-col.ant-col-8').first().click();
  await page.locator('div').filter({ hasText: /^Trả CB 101%%%%$/ }).getByPlaceholder('0').nth(1).click();
  await page.locator('div').filter({ hasText: /^Trả CB 101%%%%$/ }).getByPlaceholder('0').nth(1).fill('15');
  await page.locator('div:nth-child(2) > .ant-row > .ant-col.ant-col-8').first().click();
  await page.locator('div').filter({ hasText: /^Trả CB 101%%%%$/ }).getByPlaceholder('0').nth(2).click();
  await page.locator('div').filter({ hasText: /^Trả CB 101%%%%$/ }).getByPlaceholder('0').nth(2).fill('20');
  await page.locator('div:nth-child(3) > .ant-row > .ant-col.ant-col-8').first().click();
  await page.locator('div').filter({ hasText: /^Trả CB 101%%%%$/ }).getByPlaceholder('0').nth(3).click();
  await page.locator('div').filter({ hasText: /^Trả CB 101%%%%$/ }).getByPlaceholder('0').nth(3).fill('25');
  await page.locator('.ant-input-number.ant-input-number-focused > .ant-input-number-input-wrap > .ant-input-number-input').click();
  await page.locator('div:nth-child(4) > .ant-row > .ant-col.ant-col-8').first().click();
  await page.getByText('Nơi đi→Nơi đếnNhóm ghế').click();
  await page.getByRole('button', { name: 'loading Tiếp tục' }).click();
  await page.getByRole('button', { name: 'loading Tiếp tục' }).click();
  // Check hiện thông báo thành công
  await page.locator('.ant-message-notice-content').first().click();
  await page.locator('.sc-ijDOKB').first().click();
  await page.getByText('Xem thông tin chương trình').click();
});
