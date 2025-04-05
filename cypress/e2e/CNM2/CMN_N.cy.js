describe("N Test", () => {
  beforeEach(() => {
    cy.visit("http://10.32.0.97/cnm2/login");
    cy.login("67210", "9999");
  });
  //รายละเอียดใบ N
  it("VIEW Trucking", () => {
    cy.visit("/N");

    // คลิกปุ่มเปิดเมนู action
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-1"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[6]/div'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    // ✅ คลิกที่เมนู "ดูรายละเอียด" ตัวแรกใน list
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0) // 👉 ลำดับที่ 2 (เริ่มนับจาก 0)
      .should("be.visible")
      .click({ force: true });

    // ✅ รอยืนยันผลลัพธ์
    cy.contains("รายละเอียดใบ N", { timeout: 10000 }).should("be.visible");
    cy.screenshot("N_VIEW_SUCCESS");
  });

  //ADD รายการ ใบ N
  it("ADD CHECK RTV", () => {
    cy.visit("/N");

    // คลิกปุ่มเปิดเมนู action
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-1"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[6]/div'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    // ✅ คลิกที่เมนู "ดูรายละเอียด" ตัวแรกใน list
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0)
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
    cy.xpath('//*[@id="add_shoe_form_qty"]')
      .should("be.visible")
      .type("10", { force: true });

    // ✅ กดปุ่มบันทึก
    cy.xpath('//*[@id="btn-save-style"]').click();
    cy.contains("GS-11C24M1").should("be.visible");

    //ปิด Modal
    cy.xpath(
      "/html/body/div[2]/div/div[2]/div/div[1]/div/div[3]/div/div[2]/button"
    ).click();

    //เปิด Modal แก้ไข
    cy.xpath(
      '//*[@id="n-form"]/div[5]/div/div/div/div[1]/div/table/tbody/tr[3]/td[8]/div'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0) // 👉 ลำดับที่ 2 (เริ่มนับจาก 0)
      .should("be.visible")
      .click({ force: true });
    cy.wait(3000);

    // ✅ เลือก dropdown ที่ 1
    cy.get("#add_shoe_form > :nth-child(1) .ant-select-selector").click({
      force: true,
    });
    cy.get(".ant-select-dropdown .ant-select-item-option")
      .eq(0)
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
    cy.xpath('//*[@id="add_shoe_form_qty"]')
      .should("be.visible")
      .type("10", { force: true });

    // ✅ กดปุ่มบันทึก
    cy.contains("button", "เพิ่ม") // ค้นหาปุ่มที่มีข้อความว่า "เพิ่ม"
      .should("be.visible") // ตรวจสอบให้แน่ใจว่าปุ่มแสดง
      .click({ force: true, timeout: 10000 }); // คลิกปุ่ม
    cy.xpath('//*[@id="btn-save-style"]').click();
    cy.contains("เลือกรุ่นรองเท้า").should("be.visible");

    // //ปิด Modal
    cy.get(".ant-col > .btn").click();

    //เลือกเงื่อนไขการคืน
    cy.get("#n-form_cr_type").click();
    cy.get(".ant-select-dropdown")
      .last()
      .find(".ant-select-item-option")
      .eq(1)
      .click({ force: true });

    //save Button
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
});
