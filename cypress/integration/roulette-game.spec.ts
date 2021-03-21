describe("Roulette game test", () => {
  beforeEach(()=>{
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  })

  it("Should initialize well", () => {
    cy.visit("/")
    cy.getBySel("RouletteWheelLoader").should("exist")

    cy.getBySel("BetResults").within(() => {
      cy.getBySel("BetResult").should('have.length', 0)
    })

    cy.getBySel("BettingTable").within(() => {
      cy.getBySel("Red").should("not.have.class", "bet")
      cy.getBySel("Black").should("not.have.class", "bet")
    })

    cy.getBySel("RouletteWheel").should("exist")
  })

  it("Should bet and spin with success", () => {
    cy.visit("/")
    cy.intercept(
      {method: 'GET', url: '/api/random-result'},
      {color: 0} // RED
    )
    betAndSpin("Red");
    cy.getBySel("BetResults").within(() => {
      cy.getBySel("BetResult", {timeout: 15000}).should('have.length', 1)
      cy.getBySel("BetResult").within(() => {
        cy.getBySel("Success")
      })
    })
  })

  it("Should bet and spin with failure", () => {
    cy.visit("/")
    cy.intercept(
      {method: 'GET', url: '/api/random-result'},
      {color: 1} // RED
    )
    betAndSpin("Red");
    cy.getBySel("BetResults").within(() => {
      cy.getBySel("BetResult", {timeout: 15000}).should('have.length', 1)
      cy.getBySel("BetResult").within(() => {
        cy.getBySel("Failure")
      })
    })
  })

  it("Should save results between reloads", () => {
    cy.visit("/")

    cy.intercept(
      {method: 'GET', url: '/api/random-result'},
      {color: 1} // RED
    )
    betAndSpin("Red");
    cy.getBySel("BetResults").within(() => {
      cy.getBySel("BetResult", {timeout: 15000}).should('have.length', 1)
      cy.getBySel("BetResult").within(() => {
        cy.getBySel("Failure")
      })
    })

    cy.visit("/")

    cy.getBySel("BetResults").within(() => {
      cy.getBySel("BetResult", {timeout: 15000}).should('have.length', 1)
      cy.getBySel("BetResult").within(() => {
        cy.getBySel("Failure")
      })
    })
  })

  function betAndSpin(bet: "Red" | "Black") {
    cy.getBySel("BettingTable").within(() => {
      cy.getBySel(bet).click()
    })

    cy.getBySel("RouletteWheel").click()
  }
})


