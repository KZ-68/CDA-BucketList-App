describe('Cypress Progress Page Visual Testing', () => {
  it('Visit My Progress Page', () => {
    cy.visit('localhost:3000/collections/user');
    cy.get("[component='SignInButton']").click({ multiple: true, force: true });

    cy.origin('https://glorious-moray-43.accounts.dev/sign-in', () => {
      cy.get("[id='identifier-field']").type(Cypress.env("CLERK_EMAIL"));
      cy.get("button").click({multiple:true, force:true});
      cy.get("[id='password-field']").type(Cypress.env("CLERK_PASSWORD"));
      cy.get("[class='cl-formButtonPrimary cl-button 🔒️ cl-internal-9c635s']").click({multiple:true, force:true});
    })
    cy.get("[href='/progress']").click({multiple:true, force:true})
    cy.wait(3000);
    cy.compareSnapshot({name:'progress-page', testThreshold:0.1});
  })
})