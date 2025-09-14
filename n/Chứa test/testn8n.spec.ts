import { test, expect } from '@playwright/test';

test('Tạo mới nhóm ghế', async ({ page }) => {
  // Tạo tên unique
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
  const name = `Hậu test Automation ${getFormattedDateTime()}`;

  // Đăng nhập
  await page.goto('https://banve.vexere.com/login?redirect=%2F');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin.xtl');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Adminvxr@2019');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await page.getByRole('link', { name: 'Tổng quan' }).click();

  // Điều hướng đến cấu hình
  await page.goto('https://banve.vexere.com/schedules-fare/bop-configs?tab=configs'); 
  await page.getByRole('button', { name: 'Thêm mới cấu hình' }).click();
  await page.getByText('Cấu hình Giá vé', { exact: true }).click();
  await page.locator('.ant-select.sc-bDumWk > .ant-select-selector').first().click();
  await page.getByTitle('Cao Bằng ---- Cà Mau').locator('div').click();
  await page.getByText('Nhập tên cấu hình').click();
  await page.getByRole('textbox', { name: 'Nhập tên cấu hình', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nhập tên cấu hình', exact: true }).fill(name);
  await page.getByRole('dialog').getByText('Tất cả sơ đồ giá theo ghế').click();
  await page.getByText('ghế Nam test trùng ghế20 ghe Nam linh động').click();
  await page.getByText('Sơ đồ ghế áp dụng').click();
  await page.getByText('Chọn nơi đi').click();
  await page.getByRole('checkbox', { name: 'Tất cả nơi đi' }).check();
  await page.getByRole('cell', { name: 'NƠI ĐI', exact: true }).click();
  await page.getByText('Chọn nơi đến').click();
  await page.getByRole('checkbox', { name: 'Tất cả nơi đến' }).check();
  await page.getByText('NƠI ĐẾN', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Nhập giá' }).click();
  await page.getByRole('textbox', { name: 'Nhập giá' }).fill('10.0000');
  await page.waitForTimeout(1000);
  await page.locator('.ant-modal-wrap').click();
  await page.getByRole('button', { name: 'Lưu' }).click();
  await page.getByRole('textbox', { name: 'Nhập tên cấu hình, ID' }).click();
  await page.getByRole('textbox', { name: 'Nhập tên cấu hình, ID' }).fill(name);
  await page.getByRole('cell', { name: (name), exact: true }).click();

});
