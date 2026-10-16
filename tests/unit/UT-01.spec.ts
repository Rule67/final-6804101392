
import { test, expect } from '@playwright/test';

test.describe('UT-01: Login Form Validation', () => {

  test('UT-01.1: empty username and password', {
    annotation: {
      type: 'description',
      description: 'ตรวจสอบการ Login เมื่อไม่กรอก Username และ Password'
    }
  }, async ({ page }) => {

    await test.step('เปิดหน้า Login', async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    await test.step('ส่งฟอร์มโดยไม่กรอกข้อมูล', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
    });

    await test.step('ตรวจสอบ Error และ URL', async () => {
      await expect(page.locator('[data-test="error"]'))
        .toContainText('Username is required');

      await expect(page).not.toHaveURL(/inventory\.html/);
    });

  });

});
