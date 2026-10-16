import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', {
  annotation: {
    type: 'description',
    description: 'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {
  // ขยายเวลา Timeout เป็น 60 วินาที สำหรับเคสนี้
  test.setTimeout(60000);
  
  await test.step('Login และตรวจสอบ Inventory', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // ตรวจสอบว่าเข้าสู่ Inventory สำเร็จ
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  await test.step('เพิ่มสินค้าสองรายการ', async () => {
    // เพิ่ม Sauce Labs Backpack และ Sauce Labs Bike Light
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    
    // ตรวจสอบ Cart Badge แสดง 2
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  await test.step('ตรวจสอบ Cart', async () => {
    // เปิด Shopping Cart
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    
    // ตรวจสอบชื่อสินค้าทั้งสองรายการในตะกร้า
    await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');
  });

  await test.step('กรอก Checkout Information', async () => {
    await page.click('#checkout');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    
    // กรอกข้อมูลลูกค้าให้ครบถ้วน
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '50000');
    
    // คลิก Continue เพื่อเข้าสู่ Checkout Overview
    await page.click('#continue');
  });

  await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    
    // ตรวจสอบว่า Checkout Overview แสดงสินค้าทั้งสองรายการถูกต้อง
    await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');
    
    // คลิก Finish
    await page.click('#finish');
  });

  await test.step('ตรวจสอบ Order Complete', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    
    // ตรวจสอบข้อความ Thank you for your order!
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});