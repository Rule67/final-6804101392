# Playwright Test Summary

## Project Information

- **Project:** final-exam
- **Browser:** Chromium
- **Test Date:** October 16, 2026
- **Report Time:** 2:07:18 PM
- **Total Execution Time:** 32.0 seconds

## Test Results

| Test Case | Description | Duration |
|---|---|---:|
| UT-01 | Login Form Validation | 1.9s |
| UT-02 | Add to Cart → Remove → Add to Cart | 4.1s |
| IT-01 | REAL Login → Inventory STUB | 3.9s |
| IT-02 | Driver Login State → REAL Inventory and Cart | 3.1s |
| ST-01 | Complete Purchase of Two Products | 8.2s |
| ST-02 | Checkout Validation and Recovery | 9.3s |

## Test Execution Summary

- **Total Test Cases:** 6
- **Passed:** ตรวจสอบจาก `reports/results.json`
- **Failed:** ตรวจสอบจาก `reports/results.json`
- **Skipped:** ตรวจสอบจาก `reports/results.json`

## Test Coverage

### Unit Tests
- UT-01: ตรวจสอบการ Validation ของ Login Form
- UT-02: ตรวจสอบการเปลี่ยนสถานะปุ่ม Add to cart และ Remove

### Integration Tests
- IT-01: ตรวจสอบการ Login จริงและจำลองหน้า Inventory ด้วย Stub
- IT-02: ตรวจสอบการใช้ Driver เพื่อเปิด Inventory และทดสอบ Cart

### System Tests
- ST-01: ทดสอบการซื้อสินค้าสองรายการจนสำเร็จ
- ST-02: ทดสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ

## Errors and Issues

ตรวจสอบรายละเอียด Error จาก Playwright Report และบันทึก Test ที่ไม่ผ่าน หากไม่มีข้อผิดพลาดให้ระบุว่า None หลังยืนยันผลแล้ว

## Conclusion

ดำเนินการทดสอบทั้ง 6 Test Cases บน Chromium แล้ว ใช้ผลจาก Playwright Report และ JSON Report เพื่อยืนยันจำนวน Passed, Failed และ Skipped ก่อนส่งงาน
