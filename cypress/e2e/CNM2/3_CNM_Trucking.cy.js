describe("ชุดทดสอบ Approve N", () => {
  beforeEach(() => {
    cy.session("loginSession", () => {
      cy.visit("http://10.32.0.97/cnm2/login");
      cy.login("67210", "9999");
    });
  });

  //เพิ่มใบคุม
  it("ADD NEW Trucking", () => {
    cy.visit("/trucking");

    // Click Add Button
    cy.get("button")
      .contains("เพิ่ม") // ค้นหาปุ่ม "Add New" โดยใช้ text
      .should("be.visible")
      .click({ force: true });

    // Click Add RTV Button
    cy.get("button")
      .contains("เพิ่ม RTV") // ค้นหาปุ่ม "Add RTV" โดยใช้ text
      .should("be.visible")
      .click({ force: true });

    // รอให้ Modal ปรากฏและมี opacity เป็น 1
    cy.get("div.ant-modal", { timeout: 10000 })
      .should("be.visible")
      .and("have.css", "opacity", "1");

    // Select RTV Item
    cy.get("table tbody tr:nth-child(2) td label") // ค้นหาช่องเลือก RTV ในแถวที่ 2
      .should("be.visible")
      .click({ force: true });

    // Click Confirm Button
    cy.get("button")
      .contains("เพิ่มรายการที่เลือก") // ค้นหาปุ่ม "Confirm"
      .should("be.visible")
      .click({ force: true });

    // Click Confirm Modal
    cy.get("button")
      .contains("ใช่") // ค้นหาปุ่มยืนยันใน Modal
      .should("be.visible")
      .click({ force: true });

    // Verify Success Message
    cy.contains("สำเร็จ", { timeout: 10000 }).should("be.visible");

    // Capture Screenshot
    cy.screenshot("TRUC_ADD_SUCCESS");
  });

  //รายละเอียดใบคุม
  it("VIEW Trucking", () => {
    cy.visit("/trucking");

    // คลิกปุ่มเปิดเมนู action
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div[2]/div/div/div/div/div/table/tbody/tr[2]/td[11]/div'
    )
      .should("exist")
      .should("be.visible")
      .click({ force: true });

    // ✅ รอให้ dropdown container ปรากฏและ opacity เป็น 1
    cy.get("div.ant-dropdown", { timeout: 10000 })
      .should("exist")
      .should("have.css", "opacity", "1");

    // ✅ คลิกที่เมนู "ดูรายละเอียด" ตัวแรกใน list
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0) // 👉 ลำดับที่ 2 (เริ่มนับจาก 0)
      .should("be.visible")
      .click({ force: true });

    // ✅ รอยืนยันผลลัพธ์
    cy.contains("เลขที่ใบคุม", { timeout: 10000 }).should("be.visible");
    cy.screenshot("TRUC_VIEW_SUCCESS");
  });

  //แก้ไขใบคุม
  it("EDIT Trucking", () => {
    cy.visit("/trucking");

    // คลิกปุ่มเปิดเมนู action
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div[2]/div/div/div/div/div/table/tbody/tr[2]/td[11]/div'
    )
      .should("exist")
      .should("be.visible")
      .click({ force: true });

    // ✅ รอให้ dropdown container ปรากฏและ opacity เป็น 1
    cy.get("div.ant-dropdown", { timeout: 10000 })
      .should("exist")
      .should("have.css", "opacity", "1");

    // ✅ คลิกที่เมนู "ดูรายละเอียด" ตัวแรกใน list
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(1) // 👉 ลำดับที่ 2 (เริ่มนับจาก 0)
      .should("be.visible")
      .click({ force: true });

    // แก้ไขวันที่
    cy.xpath('//*[@id="group_form_date"]')
      .should("be.visible", { timeout: 5000 })
      .clear()
      .type("05/04/2025");

    // 👉 คลิกเพื่อเปิด Dropdown บริษัท
    cy.xpath(
      '//*[@id="group_form"]/div[2]/div[2]/div/div/div[2]/div/div/div/div'
    )
      .should("be.visible", { timeout: 5000 })
      .click();

    // 👉 รอให้ Dropdown ปรากฏ และ ตรวจสอบว่าแสดงผลด้วย opacity: 1
    cy.get(".ant-select-dropdown", { timeout: 8000 }) // เพิ่มเวลารอ
      .should("have.css", "opacity", "1")
      .should("be.visible");

    // 👉 เลือกตัวเลือกที่ 2 (index 1) ใน Dropdown
    cy.get(".ant-select-dropdown .ant-select-item-option")
      .eq(1) // เลือกอันดับที่ 2
      .should("be.visible", { timeout: 5000 }) // รอให้ตัวเลือกแสดงผล
      .click();

    // เลือกรถที่ใช้
    cy.xpath('//*[@id="group_form_car_detail"]').click({ force: true });

    cy.contains("95-1569").should("be.visible", { timeout: 5000 }).click();

    // กรอกหมายเหตุ
    cy.xpath('//*[@id="group_form_remark"]')
      .should("be.visible", { timeout: 5000 })
      .clear()
      .type("ข้อความที่ต้องการกรอก", { force: true });

    // บันทึกข้อมูล
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div[1]/button'
    )
      .should("be.visible", { timeout: 5000 })
      .click();

    // ยืนยันการแก้ไข
    cy.contains("ต้องการแก้ไขใบคุม", { timeout: 10000 }).should("be.visible");
    cy.xpath("/html/body/div[5]/div/div[6]/button[1]")
      .should("be.visible", { timeout: 5000 })
      .click();

    // ถ่ายภาพผลลัพธ์
    cy.screenshot("TRUC_EDIT_SUCCESS");
  });

  after(() => {
    cy.log("🚀 All Test Cases Completed!");
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
