describe("Dashboard Test", () => {
  beforeEach(() => {
    cy.visit("http://10.32.0.97/cnm2/login");
    cy.login("67210", "9999");
  });

  it("should show user profile", () => {
    cy.visit("/rtvacc");

    // ✅ ใช้ `{ timeout: 5000 }` เพื่อลด `cy.wait()`
    cy.contains("ข้อมูลรายการคืนสินค้า RTV", { timeout: 5000 }).should(
      "be.visible"
    );
    cy.contains("BIGC").should("be.visible");
    cy.contains("LOTUS").should("be.visible");
  });

  it("should show RTV details", () => {
    cy.visit("/rtvacc");

    // ✅ ใช้ `.should("exist")` แทน `cy.wait(500)`
    cy.xpath(
      `//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[23]/div`
    )
      .should("exist")
      .click();

    cy.xpath("/html/body/div[2]/div/ul/li[1]").should("exist").click();

    // ✅ รอให้ข้อความ "รายละเอียดข้อมูลรายการคืนสินค้า RTV" ปรากฏ แทนการใช้ `cy.wait()`
    cy.contains("รายละเอียดข้อมูลรายการคืนสินค้า RTV", {
      timeout: 5000,
    }).should("be.visible");
  });
});
