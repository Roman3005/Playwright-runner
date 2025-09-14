import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://vexere.com/');
  await page.getByText('Nơi xuất phát').click();
  await page.getByTestId('SearchWidget.from').fill('miền tây');
  await page.getByRole('listitem').filter({ hasText: /^Bến xe Miền Tây$/ }).click();
  await page.getByTestId('SearchWidget.to').click();
  await page.getByTestId('SearchWidget.to').fill('vũng tàu');
  await page.getByText('Bến xe Vũng Tàu').click();
  await page.getByText('Ngày đi').click();
  
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + 10);
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  const year = targetDate.getFullYear();
  const paddedMonth = month.toString().padStart(2, '0');
  const calendarId = `${paddedMonth}-${year}`;

  page.getByText('Ngày đi').click();

  //Chọn ngày đi
  await page.locator(`[id="${calendarId}"]`).getByText(`${day}`, { exact: true }).first().click();
  await page.getByTestId('SearchWidget.search').click();
  
  //filter chuyến
  await page.getByText('Nhà xekeyboard_arrow_down').click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).fill('toàn thắng');
  await page.getByRole('checkbox').first().check();

  //Chọn chuyến
  await page.locator('.ant-btn.btn-booking').first().click();

  const availableSeats = page.locator('div[data-disabled="false"].seat-container');
  const count = await availableSeats.count();
  const randomIndex = Math.floor(Math.random() * count);
  const seat = availableSeats.nth(randomIndex);
  await seat.click();
  console.log(`:white_check_mark: Đã chọn ghế index ${randomIndex}`);
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();

  //Nhập thông tin và thanh toán
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

  //Xem thông tin vé
  await page.getByText('Chi tiết').click();
  
});