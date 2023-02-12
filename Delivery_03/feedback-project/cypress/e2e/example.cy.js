// https://docs.cypress.io/api/introduction/api.html


/// ESSENTIAL: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress

describe('Testing the urls', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Your Vue.js App')
  })

  it('visits the app calculator url', () => {
    cy.visit('/calculator')
    cy.contains('h1', 'CALCULATOR 3000')
  })

  it('visits the app contact url', () => {
    cy.visit('/contact')
    cy.contains('h1', 'Contact form')
  })
})

describe('Testing that form cannot send due to various factors', () => {

  it('visits the contact view and inputs only name and email -> displays correct error', () => {
    cy.visit('/contact')
    cy.contains('h1', 'Contact form')
    cy.get("#nameInput").type("My First Post"); 

    cy.get("#emailInput").type("example@email.no"); 

    cy.get("#excpMessage") 
    .should("contain", "An input is empty");
  })

  it('visits the contact view and inputs email on the wrong format -> displays correct error', () => {
    cy.visit('/contact')
    cy.contains('h1', 'Contact form')
    cy.get("#nameInput").type("My First Post"); 

    cy.get("#emailInput").type("example@no"); 

    cy.get("#messageInput").type("Random message"); 

    cy.get("#excpMessage") 
    .should("contain", "Incorrect e-mail format! Include all components: 'username@domainname.extension'");
  })

  it('visits the contact view and inputs name on the wrong format -> displays correct error', () => {
    cy.visit('/contact')
    cy.contains('h1', 'Contact form')
    cy.get("#nameInput").type("lower case name"); 

    cy.get("#emailInput").type("example@email.no"); 

    cy.get("#messageInput").type("Random message"); 

    cy.get("#excpMessage") 
    .should("contain", "Each name component should start with a capitalized letter!");
  })


  it('visits the contact view and inputs only name and email -> button is disabled', () => {
    cy.visit('/contact')
    cy.contains('h1', 'Contact form')
    cy.get("#nameInput").type("My First Post");

    cy.get("#emailInput").type("example@email.no"); 
    cy.get("#submitButton") 
    .should('be.disabled')
  })
})



describe('Testing that form submits and displays success', () => {

  it('visits the contact view and inputs correct inputs -> displays success', () => {
    cy.visit('/contact')
    cy.contains('h1', 'Contact form')
    cy.get("#nameInput").type("Senpai Surya"); 

    cy.get("#emailInput").type("example@email.no"); 

    cy.get("#messageInput").type("Random message"); 

    cy.get("#submitButton") 
    .should('be.enabled')

    cy.get("#submitButton") 
    .click()

    cy.get("#statusP").should("contain", "Success");


  })


})


