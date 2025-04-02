describe("Dashboard Test", () => {
  beforeEach(() => {
    cy.visit("http://10.32.0.97/cnm2/login");
    cy.login("67210", "9999");
  });

  it("should show RTV TABLE", () => {
    cy.visit("/trucking");

    // ✅ แทน `cy.wait(500)` ด้วย `{ timeout: 5000 }`
    cy.contains("เลขที่ใบคุม", { timeout: 5000 }).should("be.visible");

    cy.screenshot("TRUC_TABLE"); // 🖼 ถ่ายรูปเมื่อตารางโหลดเสร็จ
  });

  it("should show RTV Details", () => {
    cy.visit("/trucking");

    // ✅ รอให้ element มีอยู่จริงก่อนกด click
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div[2]/div/div/div/div/div/table/tbody/tr[2]/td[11]/div'
    ).click();

    cy.xpath("/html/body/div[2]/div/ul/li[1]/span[2]").should("exist").click();

    // ✅ รอให้ข้อมูลโหลดโดยไม่ใช้ `cy.wait()`
    cy.contains("รายละเอียดใบคุม", { timeout: 5000 }).should("be.visible");
    cy.contains("เลขที่ RTV").should("be.visible");

    cy.screenshot("TRUC_DETAILS");
  });

  after(() => {
    cy.log("🚀 All Test Cases Completed!");
  });
});
