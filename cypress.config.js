const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "1kcaw3",
  e2e: {
    baseUrl: "http://10.32.0.97/cnm2", // ตั้งค่า Base URL ของระบบ
    screenshotOnRunFailure: true, // ✅ ให้ Cypress บันทึก Screenshot เมื่อเทสต์ล้มเหลว
    video: false, // ❌ ปิดการบันทึกวิดีโอ (ลดขนาดไฟล์)
    video: false,
    trashAssetsBeforeRuns: true, // ❌ ไม่ลบ Assets ก่อนการรัน (ลดขนาดไฟล์)
    setupNodeEvents(on, config) {
      // สามารถเพิ่ม Event Hook ได้ที่นี่
    },
  },
});
