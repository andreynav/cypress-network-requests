describe("Network Requests", () => {
    beforeEach(() => {
        cy.visit("https://example.cypress.io/commands/network-requests");
    });

    it("Get Request with intercept", () => {
        cy.intercept({
            method: "GET",
            url: "**/comments/*"
        }).as("getComment")

        cy.get('.network-btn') .click()
        cy.wait('@getComment').its("response.statusCode").should("eq", 200)
    })

    it.only("Get Request with mocked response body", () => {
        cy.intercept({
            method: "GET",
            url: "**/comments/*",
        }, {
            body: {
                body: 'You are Winner!!!',
                name: 'Andy',
                postId: 100
            }
        }).as("getComment")

        cy.get('.network-btn') .click()
        cy.wait('@getComment').its("response.statusCode").should("eq", 200);
        cy.get('@getComment').its("response.body.body").should("eq", 'You are Winner!!!')
        cy.get('@getComment').its("response.body.name").should("eq", 'Andy')
    })
})