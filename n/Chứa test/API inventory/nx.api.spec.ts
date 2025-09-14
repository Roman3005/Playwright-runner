import { test } from '@playwright/test';

// Hàm đọc dữ liệu từ Google Sheet
async function getRouteFromSheet() {
  const url =
    "https://docs.google.com/spreadsheets/d/1JXvn_PQCzuCpt9tf701TfOzTpzjHyuik231sBNNqHUA/gviz/tq?tqx=out:csv&sheet=Sheet1";

  const res = await fetch(url);
  const text = await res.text();

  // Chia từng dòng (row)
  const lines = text.trim().split("\n");
  const rows = lines.map(line => line.split(","));

  // Lấy giá trị ở cột B (index = 1 vì A=0, B=1)
  const bus = rows[0][1]?.trim();  // B1
  const from = rows[1][1]?.trim(); // B2
  const to = rows[2][1]?.trim();   // B3

  return { bus, from, to };
}

// Test chính
test('Đặt vé cho tuyến đầu tiên từ Google Sheet', async ({ page }) => {
  const route = await getRouteFromSheet();
  console.log(`▶️ Đang chạy: ${route.from} -> ${route.to} | ${route.bus}`);

  await page.goto('https://vexere.com/');

  // Nơi đi
  await page.getByText('Nơi xuất phát').click();
  await page.getByTestId('SearchWidget.from').fill(route.from);
  await page.getByRole('listitem').first().click();

  // Nơi đến
  await page.getByText('Nơi đến').click();
  await page.getByTestId('SearchWidget.to').fill(route.to);
  await page.getByRole('listitem').first().click();

  // Ngày đi +10
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + 10);
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  const year = targetDate.getFullYear();
  const paddedMonth = month.toString().padStart(2, '0');
  const calendarId = `${paddedMonth}-${year}`;

  await page.getByText('Ngày đi').click();
  await page.locator(`[id="${calendarId}"]`)
    .getByText(`${day}`, { exact: true })
    .first()
    .click();

  await page.getByTestId('SearchWidget.search').click();

  // Filter nhà xe
  await page.getByText('Nhà xekeyboard_arrow_down').click();
  await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).fill(route.bus);
  await page.getByRole('checkbox').first().check();

  // Chọn chuyến
  await page.locator('.ant-btn.btn-booking').first().click();

  // Chọn ghế
  const availableSeats = page.locator('div[data-disabled="false"].seat-container');
  const count = await availableSeats.count();
  if (count === 0) {
    console.warn(`❌ Không có ghế trống cho tuyến ${route.from} -> ${route.to}`);
    return;
  }
  const randomIndex = Math.floor(Math.random() * count);
  await availableSeats.nth(randomIndex).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();

  // Điền thông tin khách
  await page.getByRole('textbox', { name: 'Tên người đi *' }).fill('Hậu test VXR');
  await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0393988533');
  await page.getByRole('textbox', { name: 'Email để nhận thông tin đặt' }).fill('hau.vo@vexere.com');
  await page.getByRole('button', { name: 'Tiếp tục' }).click();

  await page.getByRole('radio', { name: 'TRANSFER_VA QR chuyển khoản/' }).check();
  await page.getByRole('button', { name: 'Tôi đã chuyển khoản' }).click();
  await page.getByText('Chi tiết').click();
});
