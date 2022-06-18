describe("Create and Delete Session :", () => {
 it("Creating a Session", function () {
  const email = "ofransassy@gmail.com"
  const password = "Ofran1"

  cy.visit("http://localhost:3000/login")
  cy.get('[type="email"]').type(email)
  cy.get('[type="password"]').type(password)
  cy.get(".ant-btn > span").click()
  cy.wait(1000)
  cy.visit("/coach-session")
  cy.wait(2000)
  cy.get('#makeSession').click()
  cy.wait(1000)
  cy.get("#title").clear().type("New session with cypress")
  cy.wait(1000)
  cy.get("#Selectplayer").click()
  cy.wait(1000)
  cy.get('[title="Fedi"] > .ant-select-item-option-content').click()
  cy.wait(1000)
  cy.get("#DatePicker").click()
  cy.get(".ant-picker-input").clear().type("2022-06-17 22:14")
  cy.get(".ant-btn-sm").click({ force: true })
  cy
   .get(
    ":nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > #selectLocation"
   )
   .click()
  cy.get('[title="Manouba"] > .ant-select-item-option-content').click()
  cy.get("#objective").clear().type("Objective with cypress")
  cy
   .get(
    ":nth-child(6) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-group-addon > .ant-select > .ant-select-selector > .ant-select-selection-item"
   )
   .click()
  cy.get('[title="m"] > .ant-select-item-option-content').click()
  cy.get("#target").clear().type("100")
  cy
   .get(
    ":nth-child(7) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-group-addon > .ant-select > .ant-select-selector > .ant-select-selection-item"
   )
   .click()
  cy.get('[title="min"] > .ant-select-item-option-content').click()
  cy.get("#time").clear().type("25")
  cy
   .get(
    '[title="Program "] > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > #selectLocation'
   )
   .click()
  cy
   .get('[title="azerttt"] > .ant-select-item-option-content')
   .click({ multiple: true, force: true })
  cy.get(".ant-modal-footer > .ant-btn-primary").click()
 })


 it("Deleting a Session", function () {
  const email = "ofransassy@gmail.com"
  const password = "Ofran1"

  cy.visit("http://localhost:3000/login")
  cy.get('[type="email"]').type(email)
  cy.get('[type="password"]').type(password)
  cy.get(".ant-btn > span").click()
  cy.wait(1000)
  cy.visit("/coach-session")
  cy.wait(1000)
  cy.get(':nth-child(1) > :nth-child(8) > .anticon > svg').click()
  cy.get('.ant-btn-dangerous').click()
 })
})
