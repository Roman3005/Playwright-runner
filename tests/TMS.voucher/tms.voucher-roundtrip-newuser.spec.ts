import { test, expect } from '@playwright/test';
  
test('test', async ({ page }) => {
  await page.goto('https://banve.vexere.com/login?redirect=%2F');
  // Đăng nhập
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).click();
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin.xtl');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).press('Tab');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('A');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Adminvxr@2019');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.getByRole('link', { name: 'Tổng quan' }).click();
  // Đến page tạo coupon
  await page.goto('https://banve.vexere.com/marketing/marketing-tool/voucher');
  await page.getByRole('button', { name: 'Tạo mã mới' }).click();
  await page.getByRole('checkbox', { name: 'Mã giảm giá khứ hồi' }).check();
  await page.getByRole('checkbox', { name: 'Web, App Nhà xe' }).check();
  await page.getByRole('checkbox', { name: 'Đặt vé trực tiếp tại nhà xe' }).check();
  await page.getByRole('textbox', { name: 'Nhập tên chương trình' }).click();

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

  const name = `Hậu test khứ hồi Automation ${getFormattedDateTime()}`;
  await page.getByRole('textbox', { name: 'Nhập tên chương trình' }).fill(name);
  await page.getByRole('textbox', { name: 'Nhập tên chương trình' }).press('Enter');
  await page.getByRole('textbox', { name: 'Nhập mã' }).click();

  // Tạo mã động, format: AUTO20250707134815
  const date = new Date();
  const formatted = date.toISOString()
  .replace(/[-:T.Z]/g, '') // Xoá ký tự đặc biệt
  .slice(0, 14); // Lấy đến giờ phút giây

  const uniqueName = `AUTO${formatted}`;

// Nhập thông tin
  await page.getByRole('textbox', { name: 'Nhập mã' }).fill(uniqueName);
  await page.getByRole('spinbutton', { name: 'Nhập số lượng' }).click();
  await page.getByRole('spinbutton', { name: 'Nhập số lượng' }).fill('10');
  await page.getByRole('checkbox', { name: 'Áp dụng theo ngày khởi hành' }).check();
  await page.getByRole('textbox', { name: 'Ngày bắt đầu' }).click();

  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 30);
  const startDay = today.getDate().toString();
  const endDay = endDate.getDate().toString();
  const currentMonth = today.getMonth(); // 0 = Jan
  const endMonth = endDate.getMonth();

  // ✅ Chọn ngày bắt đầu (ở tháng hiện tại)
  await page.getByRole('cell', { name: new RegExp(`^${startDay}\\b`) }).first().click();
  
  // ✅ Chọn ngày kết thúc
  await page.getByRole('cell', { name: new RegExp(`^${endDay}\\b`) }).nth(1).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: 'loading Tiếp tục' }).click();
  await page.getByRole('spinbutton', { name: 'Nhập giá trị' }).click();
  await page.getByRole('spinbutton', { name: 'Nhập giá trị' }).fill('10');
  await page.getByRole('checkbox', { name: 'Chỉ áp dụng cho khách hàng mới' }).check();
  await page.getByRole('button', { name: 'loading Tiếp tục' }).click();
  await page.getByRole('button', { name: 'loading Tiếp tục' }).click();

  //Check hiện thông báo thành công
  await page.locator('.ant-message-notice-content').first().click();
  await page.getByRole('row', { name: `${uniqueName} Hậu test` }).getByRole('img').click();
  await page.getByText('Xem thông tin chương trình').click();
});