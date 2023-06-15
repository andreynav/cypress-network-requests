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

    it("Get Request with mocked response body", () => {
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

    it("Post Request with intercept", () => {
        cy.intercept("POST", "/comments").as("postComment")

        cy.get('.network-post') .click()
        cy.wait("@postComment").should(({request, response}) => {
            console.log(request)
            // console.log(response)

            expect(request.body).to.include('email')
            expect(request.body).to.include('name')
            expect(request.headers).to.have.property('content-type')
            // issue https://github.com/cypress-io/cypress/issues/14924
            // expect(request.headers).to.have.property('origin', 'https://example.cypress.io')
            expect(request.headers).to.have.property('content-length', '160')

            expect(response.body).to.have.property( 'body','You can change the method used for cy.intercept() to be GET, POST, PUT, PATCH, or DELETE')
            expect(response.body).to.have.property( 'name','Using POST in cy.intercept()')
            expect(response.body).to.have.property( 'email','hello@cypress.io')
        })

    })
})