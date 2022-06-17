describe("Participating for Event as Player :", () => {
    it("Participating Event ", function () {
     const email = "fedimal@gmail.com"
     const password = "Fedi1mal"
   
     cy.visit("http://localhost:3000/login")
     cy.get('[type="email"]').type(email)
     cy.get('[type="password"]').type(password)
     cy.get(".ant-btn > span").click()
     cy.wait(1000)
     cy.visit("/player/events")
     cy.wait(1000)
     cy.get(':nth-child(1) > :nth-child(10) > #refuseIcon > .anticon > svg').click()
    })
   
   
    
   })
   