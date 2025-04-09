describe("ชุดทดสอบ Approve N", () => {
  beforeEach(() => {
    cy.session("loginSession", () => {
      cy.visit("http://10.32.0.97/cnm2/login");
      cy.login("67210", "9999");
    });
  });
  //View
  it("VIEW Trucking", () => {
    cy.visit("/N");

    // คลิกปุ่มเปิดเมนู action
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-1"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[6]/div'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    // ✅ รอให้ dropdown แสดงและ opacity เป็น 1
    cy.get("div.ant-dropdown", { timeout: 10000 })
      .should("exist")
      .should("have.css", "opacity", "1");

    // ✅ คลิกที่เมนู "ดูรายละเอียด" ตัวแรกใน list
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0) // 👉 ลำดับที่ 0
      .should("be.visible")
      .click({ force: true });

    // ✅ รอยืนยันผลลัพธ์
    cy.contains("รายละเอียดใบ N", { timeout: 10000 }).should("be.visible");
    cy.screenshot("N_VIEW_SUCCESS");
  });

  //ADD Button
  it("ADD CHECK RTV", () => {
    cy.visit("/N");

    // คลิกปุ่มเปิดเมนู action
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-1"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[6]/div'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    // ✅ รอให้ dropdown แสดงและ opacity เป็น 1
    cy.get("div.ant-dropdown", { timeout: 10000 })
      .should("exist")
      .should("have.css", "opacity", "1");

    // ✅ คลิกที่เมนู "ดูรายละเอียด" ตัวแรกใน list
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0) // 👉 ลำดับที่ 0
      .should("be.visible")
      .click({ force: true });

    // คลิกปุ่ม "เพิ่ม"
    cy.xpath('//*[@id="n-form"]/div[3]/div/div/div/div/div/div/button[1]')
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    // ✅ เลือก dropdown ที่ 1
    cy.get("#add_shoe_form > :nth-child(1) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown .ant-select-item-option")
      .eq(1)
      .click({ force: true });

    // ✅ เลือก dropdown ที่ 2
    cy.get("#add_shoe_form > :nth-child(2) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(1)
      .click({ force: true });

    // ✅ เลือก dropdown ที่ 3
    cy.get("#add_shoe_form > :nth-child(3) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(1)
      .click({ force: true });

    // ✅ เลือก dropdown ที่ 4
    cy.get("#add_shoe_form > :nth-child(4) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(1)
      .click({ force: true });

    // ✅ กรอกจำนวน
    cy.get("#add_shoe_form_qty", { timeout: 10000 })
      .should("be.visible")
      .type("10", { force: true });

    // ✅ กดปุ่มบันทึก
    cy.xpath('//*[@id="btn-save-style"]').click();
    cy.contains("GS-11C24M1").should("be.visible");

    // ปิด Modal
    cy.xpath(
      "/html/body/div[2]/div/div[2]/div/div[1]/div/div[3]/div/div[2]/button"
    ).click();

    // เลือกเงื่อนไขการคืน
    cy.get("#n-form_cr_type").click({ force: true });
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(1)
      .click({ force: true });

    // Save Button
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/button[1]'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    cy.contains("ต้องการสร้างใบ N").should("be.visible");
    cy.get(".swal2-confirm").click();
    cy.contains("สำเร็จ").should("be.visible");
    cy.screenshot("N_ADD_SUCCESS");
  });

  //Edit Button
  it("ADD EDIT RTV", () => {
    cy.visit("/N");

    // เปิดเมนู Action ของรายการที่ 2
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-1"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[6]/div'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    // รอ Dropdown แสดงผล
    cy.get("div.ant-dropdown", { timeout: 10000 })
      .should("exist")
      .should("have.css", "opacity", "1");

    // คลิก "แก้ไข"
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0)
      .should("be.visible")
      .click({ force: true });

    // คลิกปุ่มเพิ่มรองเท้า
    cy.get(".ant-modal-wrap")
      .should("not.exist")
      .then(() => {
        cy.xpath(
          '//*[@id="n-form"]/div[5]/div/div/div/div[1]/div/table/tbody/tr[3]/td[8]/div'
        )
          .should("be.visible")
          .click({ force: true });
      });

    // เลือกเมนูย่อยรายการแรก
    cy.xpath("/html/body/div[2]/div/ul/li[1]", { timeout: 10000 })
      .eq(0)
      .click({ force: true });
    cy.wait(3000);

    // เลือก Dropdown ทั้ง 4 ช่อง
    cy.get("#add_shoe_form > :nth-child(1) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown .ant-select-item-option")
      .eq(0)
      .click({ force: true });

    cy.get("#add_shoe_form > :nth-child(2) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(0)
      .click({ force: true });

    cy.get("#add_shoe_form > :nth-child(3) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(0)
      .click({ force: true });

    cy.get("#add_shoe_form > :nth-child(4) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(0)
      .click({ force: true });

    // กรอกจำนวน
    cy.xpath('//*[@id="add_shoe_form_qty"]')
      .should("be.visible")
      .type("10", { force: true });

    // กดปุ่ม “เพิ่ม” และ “บันทึก”
    cy.contains("button", "เพิ่ม")
      .should("be.visible")
      .click({ force: true, timeout: 10000 });
    cy.xpath('//*[@id="btn-save-style"]').click();

    // ยืนยันว่ามีข้อความ "เลือกรุ่นรองเท้า" แสดง
    cy.contains("เลือกรุ่นรองเท้า").should("be.visible");

    // ปิด Modal ด้วยปุ่ม "ปิด"
    cy.contains("button", "ปิด").click({ force: true });

    // เลือกเงื่อนไขการคืน
    cy.get("#n-form_cr_type").click({ force: true });
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(1)
      .click({ force: true });

    // Save Button
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/button[1]'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    cy.contains("ต้องการสร้างใบ N").should("be.visible");
    cy.get(".swal2-confirm").click();
    cy.contains("สำเร็จ").should("be.visible");
    cy.screenshot("N_EDIT_SUCCESS");
  });
});
