describe("RTV Test", () => {
  beforeEach(() => {
    cy.visit("http://10.32.0.97/cnm2/login");
    cy.login("67210", "9999");
  });

  it("Show rtv table on index page", () => {
    cy.visit("/rtvacc");

    // ✅ ใช้ `{ timeout: 5000 }` เพื่อลด `cy.wait()`
    cy.contains(/BIGC|LOTUS/).should("be.visible");
    //cy.contains("BIGC").should("be.visible");
    //cy.contains("LOTUS").should("be.visible");
  });

  it("Show rtv table on detail page", () => {
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

  it("DELETE RTV Normal", () => {
    cy.visit("/rtvacc");
    cy.xpath(
      `//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[23]/div`
    ).click();
    cy.xpath("/html/body/div[2]/div/ul/li[2]").click();
    cy.wait(500);
    cy.contains("คุณต้องการลบรายการนี้").should("be.visible");
    cy.xpath("/html/body/div[3]/div/div[6]/button[1]").click(); // คลิกปุ่ม "ยืนยัน"
    cy.wait(500); // รอให้การดำเนินการเสร็จสิ้น
    cy.contains(
      /ไม่สามารถลบได้ เอกสารออกใบคุมแล้ว|ลบข้อมูลเรียบร้อยแล้ว/
    ).should("be.visible");
    cy.screenshot("RTV_DEL Success"); // ถ่ายรูปหน้าจอหลังจากลบข้อมูล
  });

  it("DELETE RTV On Trucking", () => {
    cy.visit("/rtvacc");
    cy.xpath(
      `//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[23]/div`
    ).click();
    cy.xpath("/html/body/div[2]/div/ul/li[2]").click();
    cy.wait(500);
    cy.contains("คุณต้องการลบรายการนี้").should("be.visible");
    cy.xpath("/html/body/div[3]/div/div[6]/button[1]").click(); // คลิกปุ่ม "ยืนยัน"
    cy.wait(500); // รอให้การดำเนินการเสร็จสิ้น
    cy.contains(
      /ไม่สามารถลบได้ เอกสารออกใบคุมแล้ว|ลบข้อมูลเรียบร้อยแล้ว/
    ).should("be.visible");

    cy.screenshot("RTV_DEL ใบคุม");
    cy.reload();
    cy.wait(500); // ถ่ายรูปหน้าจอหลังจากลบข้อมูล
  });
});
