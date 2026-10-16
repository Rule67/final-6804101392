
import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()'
  }
}, async ({ page }) => {
  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  await test.step('สร้าง Inventory Stub', async () => {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Mock Inventory</title>
        </head>
        <body>
          <main>
            <h1>Mock Inventory Ready</h1>

            <section data-testid="mock-inventory">
              <article class="mock-product">
                <h2>Mock Backpack</h2>
              </article>

              <article class="mock-product">
                <h2>Mock Bike Light</h2>
              </article>
            </section>
          </main>
        </body>
      </html>
    `);
  });

  await test.step('ตรวจสอบผลจาก Stub', async () => {
    await expect(
      page.getByRole('heading', { name: 'Mock Inventory Ready' })
    ).toBeVisible();

    const products = page.locator('.mock-product');

    await expect(products).toHaveCount(2);
    await expect(products.nth(0)).toContainText('Mock Backpack');
    await expect(products.nth(1)).toContainText('Mock Bike Light');
  });
});
