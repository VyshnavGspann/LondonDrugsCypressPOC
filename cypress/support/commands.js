// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Using the below method for unhandled promise rejection. 
import 'cypress-iframe';
Cypress.on('uncaught:exception',(err,Runnable) => {
    return false
})

// Adding below command to avoid adding import cypress in every page. 
/// <reference types = "Cypress" />

// Adding below command to use xpath to locate elements
/// <reference types = "cypress-xpath" />

import LoginPage from "../src/page-objects/loginPage"

// Click link
Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click({ force: true });
  });

// Check linkText is present 
Cypress.Commands.add('checkLinkText', (label) => {
    cy.get('a').contains(label).should('exist');
});

// Click button
Cypress.Commands.add('clickButton', (label) => {
    cy.get('button').contains(label).click({ force: true });
  });

// Check buttonText is present 
Cypress.Commands.add('checkButtonText', (label) => {
    cy.get('button').contains(label).should('exist');
});

// Check Element is present 
Cypress.Commands.add('checkElementIsVisible', (locator) => {
    locator.should('be.visible');
});

// Click element (button/link) with respect to provided label
Cypress.Commands.add('clickElement', (locator) => {
    locator.should('exist').click({ force: true });
});

// Check Url
Cypress.Commands.add('checkUrl', (urlText) => {
    cy.url().should('include', urlText, {timeout: 30000});
});

// assert text with respect to provided locator
Cypress.Commands.add('assertText', (locator, expectedText) => {
    locator.should('exist').and('have.text', expectedText);
});

// Type text in provided locator textbox
Cypress.Commands.add('typeText', (locator,text) => {
    locator.should('exist').clear().type(text).should('have.value',text);
});

// Select the provided option from dropdown
Cypress.Commands.add('selectDropdownOption', (dropdownLocator,optionValue) => {
    dropdownLocator.contains(optionValue).click();
});

//Caching Sessions When Logging in
Cypress.Commands.add('sessionLogin', (username, password) => {
    const loginPage = new LoginPage()
    cy.session([username, password], () => {
      cy.visit("https://london-drugs-uat-origin.kibology.us/signin")
      cy.typeText(loginPage.elements.usernameTextbox(), username)
      cy.typeText(loginPage.elements.passwordTextbox(),password)
      cy.clickElement(loginPage.elements.loginButton())
      // cy.checkUrl("web/index.php/dashboard/index")

        // Click captcha checkbox (Cypress doesn't directly handle recaptcha so we bypass it)
        this.captchaCheckbox.click({ force: true, timeout: 10000 });

        // Bypass captcha (with workaround)
        cy.window().then((win) => {
            win.document.querySelector('iframe[title="reCAPTCHA"]').remove();
        });

        // Enable login button
        cy.window().then((win) => {
            win.document.querySelector('button[data-label="login"]').removeAttribute('disabled');
        });

        // Click login
        this.loginButton.click({ force: true, timeout: 10000 });

        // Assertion for successful login
        cy.contains('Login Successful!', { timeout: 10000 }).should('be.visible');
        cy.wait(5000);
    })
  })
