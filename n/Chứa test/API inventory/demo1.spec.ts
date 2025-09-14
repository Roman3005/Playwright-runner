import { test, expect } from '@playwright/test';
test('Chọn ghế tuyến Cao Bằng - Cà Mau (VIP)', async ({ page }) => {
  // Truy cập trang đăng nhập
  await page.goto('https://nhaxe.vexere.com/login');
  // Điền tài khoản và mật khẩu
  await page.getByRole('textbox', { name: 'Tài khoản' }).fill('admin.xtl');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Adminvxr@2019');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  // Chờ trang chính tải xong
  await page.waitForLoadState('networkidle');
  // Mở dropdown tuyến xe
  await page.locator('.ant-select-selector').click();
  await page.waitForSelector('li.filter-option'); // đảm bảo danh sách đã hiện
  // Chọn tuyến Cao Bằng - Cà Mau (VIP)
  await page.locator('li.filter-option:has-text("Cao Bằng - Cà Mau (VIP)")').click();
  // Mở lịch chọn ngày đi
  await page.locator('#bms-filter-calendar').getByRole('button').nth(1).click();
  // Đợi giao diện sơ đồ ghế hiển thị
  await page.waitForTimeout(3000);
  const gheList = page.locator('li.seat:has(button[data-type="update"][data-text="U"])');
  const count = await gheList.count();
  if (count === 0) throw new Error('Không có ghế khả dụng để chọn');
  const randomIndex = Math.floor(Math.random() * count);
  const selectedGhe = gheList.nth(randomIndex);
  const btnU = selectedGhe.locator('button[data-type="update"][data-text="U"]');
  await btnU.waitFor({ state: 'visible' });
  await btnU.click();

  //await page.locator('.div-row').first().click();
  //await page.locator('#bks-toolbar-container').getByRole('button', { name: 'U' }).click();
  // Nhấn xác nhận cập nhật ghế
  const xacNhan = page.locator('button.btn.btn-sm.bg-none.circle.active[data-type="update"][data-text="U"]');
  await page.locator('input[name="PhoneNumbers"]').click();
  await page.locator('input[name="PhoneNumbers"]').fill('0965978687');
  await page.locator('input[name="FullName"]').click();
  await page.locator('input[name="FullName"]').fill('Nguyễn Văn A');
  // Scroll tới label HTTT
  const htttLabel = page.locator('label.control-label:has-text("HTTT")');
  await htttLabel.scrollIntoViewIfNeeded();
  // Tìm dropdown gần HTTT nhất
  const htttSelect = htttLabel.locator('xpath=following::select[1]');
  // Lấy tất cả option trong dropdown đó
  const values = await htttSelect.locator('option').evaluateAll(options =>
  options.map(option => (option as HTMLOptionElement).value)
);
  // Random chọn 1 option
  const randomValue = values[Math.floor(Math.random() * values.length)];
  // Chọn option đó
  await htttSelect.selectOption(randomValue);
  await page.locator('input#IsInvoice').uncheck();
  await page.locator('button:has-text("Cập nhật")').scrollIntoViewIfNeeded();
  await page.locator('button:has-text("Cập nhật")').click();
});