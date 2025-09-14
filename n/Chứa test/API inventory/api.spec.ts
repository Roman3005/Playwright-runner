import { test } from '@playwright/test';

// Hàm đọc CSV từ Google Sheet
async function getRoutesFromCSV() {
  const url =
    "https://docs.google.com/spreadsheets/d/1JXvn_PQCzuCpt9tf701TfOzTpzjHyuik231sBNNqHUA/gviz/tq?tqx=out:csv&sheet=Sheet1";
  const res = await fetch(url);
  const text = await res.text();

  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");

  const fromIndex = headers.findIndex((h) => h.trim() === "Nơi đi");
  const toIndex = headers.findIndex((h) => h.trim() === "Nơi đến");
  const busIndex = headers.findIndex((h) => h.trim() === "Nhà xe");

  const routes: { from: string; to: string; bus: string }[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");

    const from = cols[fromIndex]?.trim();
    const to = cols[toIndex]?.trim();
    const bus = cols[busIndex]?.trim();

    if (!from || !to || !bus) continue; // bỏ dòng trống

    routes.push({ from, to, bus });
  }

  return routes;
}

// Test động
test.describe('Flow đặt vé từ Google Sheet', async () => {
  let routes: { from: string; to: string; bus: string }[] = [];

  test.beforeAll(async () => {
    routes = await getRoutesFromCSV();
  });

  for (const route of routes) {
    test(`Đặt vé: ${route.from} → ${route.to} | Nhà xe: ${route.bus}`, async ({ page }) => {
      await page.goto('https://vexere.com/');

      // Chọn nơi đi
      await page.getByText('Nơi xuất phát').click();
      await page.getByTestId('SearchWidget.from').fill(route.from);
      await page.getByRole('listitem')
        .filter({ hasText: new RegExp(route.from, 'i') })
        .first()
        .click();

      // Chọn nơi đến
      await page.getByTestId('SearchWidget.to').click();
      await page.getByTestId('SearchWidget.to').fill(route.to);
      await page.getByRole('listitem')
        .filter({ hasText: new RegExp(route.to, 'i') })
        .first()
        .click();

      // Chọn ngày đi (VD: +10 ngày từ hôm nay)
      const today = new Date();
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + 10);
      const day = targetDate.getDate();
      const month = targetDate.getMonth() + 1;
      const year = targetDate.getFullYear();
      const paddedMonth = month.toString().padStart(2, '0');
      const calendarId = `${paddedMonth}-${year}`;
      await page.getByText('Ngày đi').click();
      await page.locator(`[id="${calendarId}"]`).getByText(`${day}`, { exact: true }).first().click();

      // Search chuyến
      await page.getByTestId('SearchWidget.search').click();

      // Filter nhà xe
      await page.getByText('Nhà xekeyboard_arrow_down').click();
      await page.getByRole('textbox', { name: 'Tìm trong danh sách' }).fill(route.bus);
      await page.getByRole('checkbox').first().check();

      // Chọn chuyến
      await page.locator('.ant-btn.btn-booking').first().click();

      // Chọn ghế ngẫu nhiên
      const availableSeats = page.locator('div[data-disabled="false"].seat-container');
      const count = await availableSeats.count();
      if (count === 0) throw new Error("❌ Không còn ghế trống");
      const randomIndex = Math.floor(Math.random() * count);
      await availableSeats.nth(randomIndex).click();
      console.log(`✅ Đã chọn ghế index ${randomIndex}`);

      await page.getByRole('button', { name: 'Tiếp tục' }).click();
      await page.getByRole('button', { name: 'Tiếp tục' }).click();

      // Điền thông tin khách hàng (có thể sửa thành đọc từ file khác nếu cần)
      await page.getByRole('textbox', { name: 'Tên người đi *' }).fill('Hậu test VXR');
      await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0393988533');
      await page.getByRole('textbox', { name: 'Email để nhận thông tin đặt' }).fill('hau.vo@vexere.com');

      await page.getByRole('button', { name: 'Tiếp tục' }).click();

      // Chọn thanh toán & xác nhận
      await page.getByRole('radio', { name: 'TRANSFER_VA QR chuyển khoản/' }).check();
      await page.getByRole('button', { name: 'Tôi đã tôi đã chuyển khoản'}).click();

      // Xem chi tiết vé
      await page.getByText('Chi tiết').click();
    });
  }
});
