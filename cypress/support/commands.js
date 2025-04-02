// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-xpath";

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/login"); // ไปที่หน้า Login
  cy.xpath('//*[@id="userID"]').clear().type(username);
  cy.xpath('//*[@id="password"]').clear().type(password);
  cy.xpath('//*[@id="basic"]/div[5]/div/div/div/div/button').click();
  cy.wait(500); // รอให้โหลดหน้าเสร็จ
});
