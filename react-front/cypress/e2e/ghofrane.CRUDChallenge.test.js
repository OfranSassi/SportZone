describe("CRUD Challenge :", () => {
 it("Creating a Challenge", function () {
  const email = "ofransassy@gmail.com"
  const password = "Ofran1"

  cy.visit("http://localhost:3000/login")
  cy.get('[type="email"]').type(email)
  cy.get('[type="password"]').type(password)
  cy.get(".ant-btn > span").click()
  cy.wait(1000)
  cy.visit("/manage-players")
  cy.get("#buttonChallenge > span").click()
  cy.wait(1000)
  cy.get(":nth-child(1) > :nth-child(5) > #resrveChallenge > span").click()
  cy
   .get("#linkVideo")
   .clear()
   .type(
    "https://www.youtube.com/watch?v=H1F-UfC8Mb8&ab_channel=MDAndersonCancerCenter"
   )
  cy.get("#objective").clear().type("Strength training and core challenge")
  cy.get("#startDate").clear().type("2022-05-28")
  cy.get("#finalDate").clear().type("2022-05-30")
  cy.get(".ant-modal-footer > .ant-btn-primary > span").click()
  cy.get(":nth-child(1) > :nth-child(5) > #detailsButton").click()
 })

 it("Editing a Challenge", function () {
  cy.get(":nth-child(1) > :nth-child(7) > #editIcon > svg").click()
  cy.get('#objective').clear().type("Objective Edited")
  cy.get("#startDate").clear().type("2022-05-30")
  cy.wait(2000)
  cy.get(".ant-btn-primary > span").click()
  cy.wait(2000)
  cy.get(":nth-child(1) > :nth-child(7) > #deleteIcon > svg").click()
  cy.wait(1000) 
 })
 it("Deleting a Challenge", function () {
    cy.get(".ant-btn-dangerous > span").click()
 })
})
