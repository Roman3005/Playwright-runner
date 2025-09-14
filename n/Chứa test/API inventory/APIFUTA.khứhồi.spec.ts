import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
await page.goto('https://vexere.com/');
  await page.getByText('Nơi xuất phát').click();
  await page.getByTestId('SearchWidget.from').fill('nước ngầm');
  await page.getByRole('listitem').filter({ hasText: /^Bến xe Nước Ngầm$/ }).click();
  await page.getByTestId('SearchWidget.to').click();
  await page.getByTestId('SearchWidget.to').fill('Bắc vinh');
  await page.getByText('Bến xe Bắc Vinh').click();
  await page.getByText('Ngày đi').click();
  // Bước 1: Tính ngày hiện tại + 7
  
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + 10);
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  const year = targetDate.getFullYear();
  const paddedMonth = month.toString().padStart(2, '0');
  const calendarId = `${paddedMonth}-${year}`;


  // Cách 1: Click phần tử đầu tiên nếu có trùng
  await page.locator(`[id="${calendarId}"]`).getByText(`${day}`, { exact: true }).first().click();
  await page.getByText('Thêm ngày về').click();
  const returnDate = new Date(targetDate);
  returnDate.setDate(targetDate.getDate() + 1);

  const returnDay = returnDate.getDate();
  const returnMonth = (returnDate.getMonth() + 1).toString().padStart(2, '0');
  const returnYear = returnDate.getFullYear();
  const returnCalendarId = `${returnMonth}-${returnYear}`;

// Click ngày về
  await page.locator(`[id="${returnCalendarId}"]`).getByText(`${returnDay}`, { exact: true }).first().click();
  await page.getByTestId('SearchWidget.search').click();
  //filter chuyến
  await page.getByText('Nhà xekeyboard_arrow_down').click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).fill('FUTA Hà Sơn');
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

  //filter chuyến
  await page.locator('.groupStyle.Filter_BusOperator > .header > div:nth-child(2) > .material-icons-wrapper > .material-icons-round').first().click();
  await page.getByText('Nhà xekeyboard_arrow_down').click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).fill('FUTA');
  const filterSection = page.locator('text=LọcXóa lọcGiờ đ').locator('..'); // lấy thẻ cha
  const firstCheckbox = filterSection.locator('input[type="checkbox"]').first();
  if (await firstCheckbox.isVisible()) {
  await firstCheckbox.click();
}

  await page.locator('.ant-btn.btn-booking').first().click();
  const availableSeats2 = page.locator('div[data-disabled="false"].seat-container');
  const count2 = await availableSeats2.count();
  const randomIndex2 = Math.floor(Math.random() * count2);
  const seat2 = availableSeats2.nth(randomIndex);
  await seat2.click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();

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
  await page.getByText('Chi tiết').first().click();
});