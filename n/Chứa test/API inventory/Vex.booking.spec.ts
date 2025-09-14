import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://uat-fe.vexere.net/');
  //Đăng nhập
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.getByText('Số điện thoại').click();
  await page.getByRole('textbox', { name: 'Số điện thoại' }).fill('0393988533');
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).nth(2).click();
  await page.getByRole('textbox', { name: 'Please enter verification' }).fill('1');
  await page.getByRole('textbox', { name: 'Digit 2' }).fill('1');
  await page.getByRole('textbox', { name: 'Digit 3' }).fill('1');
  await page.getByRole('textbox', { name: 'Digit 4' }).fill('1');
  await page.getByRole('textbox', { name: 'Digit 5' }).fill('1');
  await page.getByRole('textbox', { name: 'Digit 6' }).fill('1');
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
// đặt vé
  await page.getByText('Nơi xuất phát').click();
  await page.getByRole('listitem').filter({ hasText: /^Hà Nội$/ }).click();
  await page.getByTestId('SearchWidget.to').click();
  await page.getByTestId('SearchWidget.to').fill('nha');
  await page.getByText('Nha Trang - Khánh Hòa').click();
  await page.getByText('22', { exact: true }).first().click();
  await page.getByTestId('SearchWidget.search').click();
  await page.waitForTimeout(5000);
  await page.locator('.ant-btn.btn-booking').first().click();
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.getByRole('button', { name: 'Đóng' }).press('ArrowDown');
  await page.locator('div:nth-child(2) > .coach > table > tbody > tr:nth-child(7) > td:nth-child(5) > .Seat__SeatContainer-sc-6hr0u8-0 > svg > rect:nth-child(4)').click();
  await page.locator('div:nth-child(2) > .coach > table > tbody > tr:nth-child(7) > td:nth-child(4) > .Seat__SeatContainer-sc-6hr0u8-0 > svg > .icon-disabled').click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click()
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByText('Tên người đi *').click();
  await page.getByRole('textbox', { name: 'Tên người đi *' }).fill('Hậu test VXR');
  await page.getByRole('textbox', { name: 'Tên người đi *' }).press('Tab');
  await page.getByRole('button', { name: '🇻🇳 +84 arrow_drop_down' }).press('Tab');
  await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0393988533');
  await page.getByText('Email để nhận thông tin đặt').click();
  await page.getByRole('textbox', { name: 'Email để nhận thông tin đặt' }).fill('hau@vexere.coM');
  await page.getByRole('button', { name: 'Tiếp tục đặt vé một chiều' }).click();

  //Hủy vé
  await page.getByRole('radio', { name: 'COP Thanh toán tại nhà xe' }).check();
  await page.getByRole('button', { name: 'Đặt chỗ' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'disabled_by_default Hủy đơn h' }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: 'Chọn lý do hủy vé' }).click();
  await page.getByText('Kế hoạch thay đổi (bận công t').click();
  await page.getByRole('button', { name: 'Xong' }).click();
  await page.getByRole('button', { name: 'Hủy đơn hàng', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Hủy đơn hàng' }).click();
  await page.getByRole('button', { name: 'Đóng' }).click();
});