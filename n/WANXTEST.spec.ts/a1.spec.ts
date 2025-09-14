import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://webso1.vexere.net/');
  await page.getByRole('textbox', { name: 'Nhập nơi đi' }).click();
  await page.getByText('Cà Mau').nth(1).click();
  await page.getByRole('textbox', { name: 'Nhập nơi đến' }).click();
  await page.getByText('Cao Bằng').nth(1).click();
  const today = new Date();
  const target = new Date();
  target.setDate(today.getDate() + 7); // Tự động nhảy sang tháng sau nếu cần
  const day = target.getDate();
  // Mở lịch
  await page.locator('#vxr_departDatePicker').click();
  // Chọn ngày (chỉ số ngày, chưa xử lý tháng)
  await page.getByRole('link', { name: String(day) }).click();
  await page.getByRole('button', { name: 'Tìm vé xe' }).click();
  //Chọn chuyến
  await page.locator('.btn-label').first().click();
  await page.getByRole('button', { name: 'Tôi đã đọc và đồng ý' }).click();
  // Chọn tất cả ghế trống
  const availableSeats = page.locator('.seat-code-label-container');
  const count = await availableSeats.count();
  await availableSeats.first().click();
  const randomIndex = Math.floor(Math.random() * count);

  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();

  await page.locator('div').filter({ hasText: /^Danh sách hành kháchHành khách 1Họ và tên\(\*\)Năm sinh\(\*\)$/ }).getByPlaceholder('Họ tên').click();
  await page.locator('div').filter({ hasText: /^Danh sách hành kháchHành khách 1Họ và tên\(\*\)Năm sinh\(\*\)$/ }).getByPlaceholder('Họ tên').fill('Test');
  await page.getByRole('textbox', { name: '2003' }).click();
  await page.getByRole('textbox', { name: '2003' }).fill('2000');
  await page.getByRole('textbox', { name: 'Số điện thoại' }).click();
  await page.getByRole('textbox', { name: 'Số điện thoại' }).fill('0111122223');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('hautest@mail.com');
  await page.getByRole('textbox', { name: 'Vui lòng nhập Quốc tịch & Giớ' }).click();
  await page.getByRole('textbox', { name: 'Vui lòng nhập Quốc tịch & Giớ' }).fill('test');
  await page.getByRole('button', { name: 'Chọn chỗ' }).click();

});