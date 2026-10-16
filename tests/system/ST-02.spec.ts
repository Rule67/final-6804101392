import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {
  // ขยายเวลา Timeout เป็น 60 วินาที สำหรับเคสนี้
  test.setTimeout(60000);

  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // เพิ่มสินค้า Sauce Labs Backpack ลง Shopping Cart
    await page.click('#add-to-cart-sauce-labs-backpack');
    
    // เปิด Shopping Cart และคลิก Checkout
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });

  await test.step('ตรวจสอบ First Name is required', async () => {
    // ไม่กรอกข้อมูลใด ๆ แล้วคลิก Continue
    await page.click('#continue');
    
    // ตรวจสอบข้อความ Error
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Error: First Name is required');
  });

  await test.step('ตรวจสอบ Last Name is required', async () => {
    // กรอก First Name เป็น John แต่เว้น Last Name ไว้
    await page.fill('#first-name', 'John');
    await page.click('#continue');
    
    // ตรวจสอบข้อความ Error
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Error: Last Name is required');
  });

  await test.step('ตรวจสอบ Postal Code is required', async () => {
    // กรอก Last Name เป็น Doe แต่เว้น Postal Code ไว้
    await page.fill('#last-name', 'Doe');
    await page.click('#continue');
    
    // ตรวจสอบข้อความ Error
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Error: Postal Code is required');
  });

  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    // กรอก Postal Code เป็น 50000 แล้วคลิก Continue
    await page.fill('#postal-code', '50000');
    await page.click('#continue');
    
    // ตรวจสอบว่าเข้าสู่ Checkout Overview สำเร็จ
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    
    // คลิก Finish
    await page.click('#finish');
    
    // ตรวจสอบข้อความ Thank you for your order!
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});