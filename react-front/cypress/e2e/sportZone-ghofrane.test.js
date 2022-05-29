// describe("My First Test", ()=>{
//     it("Does not do much!", ()=>{
//         expect(true).to.equal(true)
//     })
//     it("successfully loads", () =>{
//         cy.visit("/")      
//     })
//     it("successfully display the CRUD Event", ()=>{
//         cy.visit("/coach-events") 
        
//     })

// })
describe("CRUD Challenge :", () => {
    it("login", function () {
      const email = "ofransassy@gmail.com"
      const password = "Ofran1"
  
      cy.visit("http://localhost:3000/login")
      cy.get('[type="email"]').type(email)
      cy.get('[type="password"]').type(password)
      cy.get(".ant-btn > span").click()
      cy.wait(3000)
      cy.visit("/coach-events")
      cy.get(':nth-child(1) > :nth-child(5) > [style="margin-left: 12px;"] > span').click()
      cy.wait(2000)
      cy.get(':nth-child(4) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body > .ant-form > :nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > #label').clear().type('Event made with cypress')
      cy.wait(2000)
      cy.get(':nth-child(4) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body > .ant-form > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > [name="Start Date"]').clear().type('2022-05-28')
      cy.get(':nth-child(4) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body > .ant-form > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > [name="Final Date"]').clear().type('2022-05-30')
    //   cy.get(':nth-child(4) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body > .ant-form > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click()
      cy.wait(2000)
     // cy.get(':nth-child(4) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body > .ant-form > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').select('.ant-select-selection-item')
    //  cy.get(':nth-child(4) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body > .ant-form > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > select').click()
    //  cy.select(':nth-child(4) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body > .ant-form > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > select').select('private')
    cy.contains('Private').click()
  
    })
})