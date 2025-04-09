describe("ชุดทดสอบ Approve N", () => {
  beforeEach(() => {
    cy.session("loginSession", () => {
      cy.visit("http://10.32.0.97/cnm2/login");
      cy.login("67210", "9999");
    });
  });

  //Approve VIEW
  it("Tab Approve VIEW N", () => {
    cy.visit("/N");

    // 👉 คลิกแท็บ Approve N
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div[1]/div/div[2]'
    ).click({ force: true });

    cy.wait(1000); // รอ UI Render ให้เสร็จ

    // ✅ คลิกปุ่ม action เพื่อแสดง dropdown
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-2"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[14]/div'
    ).click({ force: true });

    // ✅ แก้ให้ Cypress รอจน dropdown "มีอยู่" + "พร้อมแสดง" จริง ๆ
    cy.get("div.ant-dropdown", { timeout: 10000 }) // ขยายเวลา wait
      .should("exist")
      .should("have.css", "opacity", "1")
      .and("be.visible"); // เพิ่มความมั่นใจว่าแสดงอยู่จริง

    // ✅ คลิกเมนู "ดูรายละเอียด" หรือ "แก้ไข"
    cy.get("ul.ant-dropdown-menu > li")
      .eq(1)
      .should("be.visible")
      .click({ force: true });

    // 📸 ถ่าย Screenshot ผลลัพธ์
    cy.contains("รายละเอียดใบ N", { timeout: 10000 }).should("be.visible");
    cy.screenshot("N_VIEW_SUCCESS");
  });

  // Approve ADD N
  it("Tab Approve EDIT N", () => {
    cy.visit("/N");

    // 👉 คลิกแท็บ Approve N
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div[1]/div/div[2]'
    ).click({ force: true });

    cy.wait(1000); // รอ UI Render ให้เสร็จ

    // ✅ คลิกปุ่ม action เพื่อแสดง dropdown
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-2"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[14]/div'
    ).click({ force: true });

    // รอ Dropdown แสดงผลก่อนคลิก
    cy.xpath("/html/body/div[2]/div/ul/li[1]/span[2]", { timeout: 10000 })
      .should("exist")
      .should("have.css", "opacity", "1")
      .and("be.visible");

    // คลิก "แก้ไข"
    cy.wait(500); // รอให้ animation จบ
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0)
      .should("be.visible")
      .click({ force: true });

    // ✅ ตรวจสอบว่าเปิดหน้า "แก้ไขรายละเอียดใบ N" ได้สำเร็จ
    cy.contains("แก้ไขรายละเอียดใบ N", { timeout: 10000 }).should("be.visible");

    // 👉 คลิกปุ่ม Action ของรายการรองเท้าแถวที่ 2
    cy.xpath(
      '//*[@id="n-form"]/div[5]/div/div/div/div[1]/div/table/tbody/tr[2]/td[8]/div'
    )
      .should("be.visible")
      .click({ force: true }, { timeout: 10000 });

    // รอ Dropdown แสดงผลก่อนคลิก
    cy.xpath("/html/body/div[2]/div/ul/li[1]/span[2]", { timeout: 10000 })
      .should("exist")
      .should("have.css", "opacity", "1")
      .and("be.visible");

    // คลิก "แก้ไข"
    cy.wait(500); // รอให้ animation จบ
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0)
      .should("be.visible")
      .click({ force: true });

    cy.wait(3000); // รอ Modal เปิด

    // ✅ เลือก Dropdown ทั้ง 4 ช่อง (เช่น รุ่น/สี/ขนาด/ประเภท)
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

    // 👉 กรอกจำนวน
    cy.xpath('//*[@id="add_shoe_form_qty"]')
      .should("be.visible")
      .type("10", { force: true });

    // 👉 กดปุ่ม “เพิ่ม” และ “บันทึก”
    cy.contains("button", "เพิ่ม")
      .should("be.visible")
      .click({ force: true, timeout: 10000 });
    cy.xpath('//*[@id="btn-save-style"]').click();

    // ✅ ตรวจสอบว่ามีข้อความ "เลือกรุ่นรองเท้า" แสดง (ยืนยันว่าบันทึกสำเร็จ)
    cy.contains("เลือกรุ่นรองเท้า").should("be.visible");

    // 👉 ปิด Modal ด้วยปุ่ม "ปิด"
    cy.contains("button", "ปิด").click({ force: true });
    cy.log("✅ คลิก Edit สำเร็จ");

    // ปิด Modal
    // cy.xpath(
    //     "/html/body/div[2]/div/div[2]/div/div[1]/div/div[3]/div/div[2]/button"
    //   ).click();

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

    cy.contains("ต้องการแก้ไขใบ N").should("be.visible");
    cy.get(".swal2-confirm").click();
    cy.contains("สำเร็จ").should("be.visible");
    cy.screenshot("N_ADD/EDIT_SUCCESS");

    // 📸 ถ่าย Screenshot ผลลัพธ์
    cy.screenshot("N_EDIT_SUCCESS");
  });

  // Approve ADD/EDIT N
  it("Tab Approve ADD/EDIT N", () => {
    cy.visit("/N");

    // 👉 คลิกแท็บ Approve N
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div[1]/div/div[2]'
    ).click({ force: true });

    cy.wait(1000); // รอ UI Render ให้เสร็จ

    // ✅ คลิกปุ่ม action เพื่อแสดง dropdown
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-2"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[14]/div'
    ).click({ force: true });

    // รอ Dropdown แสดงผลก่อนคลิก
    cy.xpath("/html/body/div[2]/div/ul/li[1]/span[2]", { timeout: 10000 })
      .should("exist")
      .should("have.css", "opacity", "1")
      .and("be.visible");

    // คลิก "แก้ไข"
    cy.wait(500); // รอให้ animation จบ
    cy.get("ul.ant-dropdown-menu > li", { timeout: 10000 })
      .eq(0)
      .should("be.visible")
      .click({ force: true });

    // ✅ ตรวจสอบว่าเปิดหน้า "แก้ไขรายละเอียดใบ N" ได้สำเร็จ
    cy.contains("แก้ไขรายละเอียดใบ N", { timeout: 10000 }).should("be.visible");

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

    cy.contains("ต้องการแก้ไขใบ N").should("be.visible");
    cy.get(".swal2-confirm").click();
    cy.contains("สำเร็จ").should("be.visible");
    cy.screenshot("N_ADD/EDIT_SUCCESS");

    // 📸 ถ่าย Screenshot ผลลัพธ์
    cy.screenshot("N_EDIT_SUCCESS");
  });

  //Approve N
  it("Tab Approve N", () => {
    cy.visit("/N");

    // 👉 คลิกแท็บ Approve N
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div[1]/div/div[2]'
    ).click({ force: true });

    cy.wait(1000); // รอ UI Render ให้เสร็จ

    // ✅ คลิกปุ่ม action เพื่อแสดง dropdown
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-2"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[14]/div'
    ).click({ force: true });

    // ✅ แก้ให้ Cypress รอจน dropdown "มีอยู่" + "พร้อมแสดง" จริง ๆ
    cy.get("div.ant-dropdown", { timeout: 10000 }) // ขยายเวลา wait
      .should("exist")
      .should("have.css", "opacity", "1")
      .and("be.visible"); // เพิ่มความมั่นใจว่าแสดงอยู่จริง

    // ✅ คลิกเมนู "ดูรายละเอียด" หรือ "แก้ไข"
    cy.get("ul.ant-dropdown-menu > li")
      .eq(2)
      .should("be.visible")
      .click({ force: true });

    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/button[1]'
    ).click();

    cy.log("✅ คลิกดูรายละเอียดสำเร็จ");

    cy.contains("ต้องการ Confirm รายการนี้?").should("be.visible");

    cy.xpath("/html/body/div[2]/div/div[6]/button[1]").click();
    cy.contains("สำเร็จ").should("be.visible");

    // 📸 ถ่าย Screenshot ผลลัพธ์
    cy.screenshot("N_APPROVE_SUCCESS");
  });

  //Delete N
  it("Tab Delete N", () => {
    cy.visit("/N");

    // 👉 คลิกแท็บ Approve N
    cy.xpath(
      '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div[1]/div/div[2]'
    ).click({ force: true });

    cy.wait(1000); // รอ UI Render ให้เสร็จ

    // ✅ คลิกปุ่ม action เพื่อแสดง dropdown
    cy.xpath(
      '//*[@id="rc-tabs-0-panel-2"]/div[2]/div/div/div/div/div[2]/table/tbody/tr[2]/td[14]/div'
    ).click({ force: true });

    // ✅ แก้ให้ Cypress รอจน dropdown "มีอยู่" + "พร้อมแสดง" จริง ๆ
    cy.get("div.ant-dropdown", { timeout: 10000 }) // ขยายเวลา wait
      .should("exist")
      .should("have.css", "opacity", "1")
      .and("be.visible"); // เพิ่มความมั่นใจว่าแสดงอยู่จริง

    // ✅ คลิกเมนู "ดูรายละเอียด" หรือ "แก้ไข"
    cy.get("ul.ant-dropdown-menu > li")
      .eq(5)
      .should("be.visible")
      .click({ force: true });

    cy.log("✅ คลิกดูรายละเอียดสำเร็จ");

    cy.contains("ต้องการลบรายการนี้?").should("be.visible");

    cy.get(".swal2-confirm").click();
    cy.contains("สำเร็จ").should("be.visible");

    // 📸 ถ่าย Screenshot ผลลัพธ์
    cy.screenshot("N_APPROVE_SUCCESS");
  });
});
