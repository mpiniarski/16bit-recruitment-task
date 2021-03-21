Cypress.Commands.add("getByName", (selector, ...args) => {
    return cy.get(`[name="${selector}"]`, ...args)
})

Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-testid="${selector}"]`, ...args)
})

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
    return cy.get(`[data-testid*="${selector}"]`, ...args)
})
