declare namespace Cypress {
    interface Chainable {
        getByName(value: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<Element>

        getBySel(value: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<Element>

        getBySelLike(value: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<Element>
    }
}