describe("Login CNM Test", () => {
  beforeEach(() => {
    cy.visit("http://10.32.0.97/cnm2/login");
    cy.fixture("users").as("users"); // โหลดไฟล์ users เพียงครั้งเดียว
  });

  // 🟢 ทดสอบกรณี Valid Case (Login สำเร็จ)
  it("should login successfully with valid users", function () {
    cy.get("@users").then((users) => {
      const validUsers = users.filter((user) => user.valid);
      cy.wrap(validUsers).then((users) => {
        for (const user of users) {
          cy.xpath('//*[@id="userID"]').clear().type(user.username);
          cy.xpath('//*[@id="password"]').clear().type(user.password);
          cy.xpath('//*[@id="basic"]/div[5]/div/div/div/div/button').click();

          // ✅ ใช้ `cy.intercept()` เพื่อลดเวลารอโหลดหน้า
          cy.intercept("GET", "**/dashboard").as("dashboardLoad");
          cy.wait("@dashboardLoad", { timeout: 5000 });

          // ตรวจสอบว่า contain user.expectedResult หรือไม่
          cy.contains(user.expectedResult)
            .should("be.visible")
            .then((element) => {
              // ถ้าไม่พบ (หรือข้อความไม่ตรง) ให้ทำการ reload หน้า
              if (!element.length) {
                cy.log("Expected result not found, reloading page...");
                cy.reload();
                // หลังจาก reload แล้วให้รอให้หน้าโหลดและตรวจสอบอีกครั้ง
                cy.wait(2000); // รอ 2 วินาที หรือปรับตามที่เหมาะสม
                cy.contains(user.expectedResult).should("be.visible");
              }
            });

          cy.screenshot(`${user.usecase}`);
        }
      });
    });
  });

  // 🔴 ทดสอบกรณี Invalid Case (Login ผิดพลาด)
  it("should show error message for invalid users", function () {
    cy.get("@users").then((users) => {
      const invalidUsers = users.filter((user) => !user.valid);
      cy.wrap(invalidUsers).then((users) => {
        for (const user of users) {
          cy.xpath('//*[@id="userID"]').clear().type(user.username);
          cy.xpath('//*[@id="password"]').clear().type(user.password);
          cy.xpath('//*[@id="basic"]/div[5]/div/div/div/div/button').click();

          // ✅ ลด `cy.wait()` โดยให้ Cypress เช็ค DOM element โดยตรง
          cy.contains(user.expectedResult, { timeout: 3000 }).should(
            "be.visible"
          );
          cy.screenshot(`${user.usecase}`);

          cy.reload();
        }
      });
    });
  });
});
