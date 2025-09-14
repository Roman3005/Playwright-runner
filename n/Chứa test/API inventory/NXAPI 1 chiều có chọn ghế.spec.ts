import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://vexere.com/');
  await page.getByText('Nơi xuất phát').click();
  await page.getByTestId('SearchWidget.from').fill('cao bằng');
  await page.getByText('Cao Bằng', { exact: true }).click();
  await page.getByTestId('SearchWidget.to').fill('cà mau');
  await page.getByRole('listitem').filter({ hasText: /^Cà Mau$/ }).click();
  await page.getByText('Ngày đi').click();
  // Bước 1: Tính ngày hiện tại + 7
  
const today = new Date();
const targetDate = new Date(today);
targetDate.setDate(today.getDate() + 7);

const day = targetDate.getDate();
const month = targetDate.getMonth() + 1;
const year = targetDate.getFullYear();
const paddedMonth = month.toString().padStart(2, '0');
const calendarId = `${paddedMonth}-${year}`;

await page.getByText('Ngày đi').click();

// Cách 1: Click phần tử đầu tiên nếu có trùng
await page.locator(`[id="${calendarId}"]`).getByText(`${day}`, { exact: true }).first().click();

// Hoặc Cách 2: Lọc cụ thể nếu bạn biết cấu trúc HTML
// await page.locator(`[id="${calendarId}"] td`, { hasText: `${day}` }).click();
  //await page.getByText('Thêm ngày về').click();
  //await page.getByText('20', { exact: true }).nth(1).click();
  await page.getByTestId('SearchWidget.search').click();
  
  //filter chuyến
  await page.getByText('Nhà xekeyboard_arrow_down').click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).fill('xe ty le');
  await page.getByRole('checkbox', { name: 'Xe Ty Le (198) 4.4 star_rate' }).check();
  //Chọn chuyến
  await page.locator('.ant-btn.btn-booking').first().click();
  await page.getByRole('button', { name: 'Tôi đã đọc và đồng ý' }).click();
  //const agree1 = page.getByRole('button', { name: 'Tôi đã đọc và đồng ý' });
  //const agree2 = page.getByRole('button', { name: 'Đã hiểu' });
  //if (await page.getByText('QĐ Quang trọngXe phục vụ mục').isVisible()) {
  //await page.getByRole('button', { name: 'Tôi đã đọc và đồng ý' }).click();
 //}
 // if (await agree2.isVisible()) {
  //await agree2.click();
  //}

  const availableSeats = page.locator('div[data-disabled="false"].seat-container');
  const count = await availableSeats.count();
  const randomIndex = Math.floor(Math.random() * count);
  const seat = availableSeats.nth(randomIndex);
  await seat.click();
  console.log(`:white_check_mark: Đã chọn ghế index ${randomIndex}`);
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  //await page.locator('.ant-btn.btn-booking').first().click();
  //const availableSeats2 = page.locator('div[data-disabled="false"].seat-container');
  //const count2 = await availableSeats2.count();
  //const randomIndex2 = Math.floor(Math.random() * count2);
  //const seat2 = availableSeats2.nth(randomIndex);
  //await seat2.click();
  //await page.getByRole('button', { name: 'Tiếp tục' }).click();
  //await page.getByRole('button', { name: 'Tiếp tục' }).click();

  await page.locator('label').filter({ hasText: 'Tên người đi *' }).click();
  await page.getByRole('textbox', { name: 'Tên người đi *' }).fill('Hậu test VXR');
  await page.locator('label').filter({ hasText: 'Số điện thoại *' }).click();
  await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0393988533');
  await page.getByText('Email để nhận thông tin đặt').click();
  await page.getByRole('textbox', { name: 'Email để nhận thông tin đặt' }).fill('hau.vo@vexere.com');
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('radio', { name: 'TRANSFER_VA QR chuyển khoản/' }).check();
  await page.getByRole('button', { name: 'Tôi đã chuyển khoản' }).click();
  //await page.goto('https://vexere.com/vi-VN/payment-result?code=6JB8TBK&status=1&value=1000000');
  //Xem thông tin vé
  await page.getByText('Chi tiết').click();
  
});