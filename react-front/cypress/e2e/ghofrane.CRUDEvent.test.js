describe("CRUD Event :", () => {
 it("Creating an Event", function () {
  const email = "ofransassy@gmail.com"
  const password = "Ofran1"

  cy.visit("http://localhost:3000/login")
  cy.get('[type="email"]').type(email)
  cy.get('[type="password"]').type(password)
  cy.get(".ant-btn > span").click()
  cy.wait(1000)
  cy.visit("/coach-events")
  cy.get("#d00af1506b433a14abbe > span").click()
  // cy.wait(2000)
  cy.get("#label1").clear().type("Event made with cypress")
  // cy.wait(2000)
  cy.get("#StartDate").clear().type("2022-05-28")
  cy.get("#FinalDate").clear().type("2022-05-30")

  cy.get("#selectLocation").click()
  // cy.wait(2000)
  cy.contains("Bardo").should("be.visible").click()
  cy.get("#selectState").click()
  cy.contains("Private").should("be.visible").click()
  cy.get("#details").clear().type("Friendly Match taking place in Bardo")

  cy.get(".ant-modal-footer > .ant-btn-primary").click()
  cy.get(".ant-btn-default > span").click()
 })

 it("Editing an Event", function () {
  const email = "ofransassy@gmail.com"
  const password = "Ofran1"

  cy.visit("http://localhost:3000/login")
  cy.get('[type="email"]').type(email)
  cy.get('[type="password"]').type(password)
  cy.get(".ant-btn > span").click()
  cy.wait(1000)
  cy.visit("/coach-events")
  cy.get(":nth-child(1) > :nth-child(5) > :nth-child(2) > span").click()
  cy.wait(3000)
  cy.get(":nth-child(1) > :nth-child(9) > #editButton > svg").click()
 })

 it("Deleting an Event", function () {
  const email = "ofransassy@gmail.com"
  const password = "Ofran1"

  cy.visit("http://localhost:3000/login")
  cy.get('[type="email"]').type(email)
  cy.get('[type="password"]').type(password)
  cy.get(".ant-btn > span").click()
  cy.wait(1000)
  cy.visit("/coach-events")
  cy.get(":nth-child(1) > :nth-child(5) > :nth-child(2) > span").click()
  cy.wait(3000)
  cy.get(":nth-child(3) > :nth-child(9) > .anticon-delete > svg").click()
  cy.get(".ant-btn-dangerous").click()
 })
})
