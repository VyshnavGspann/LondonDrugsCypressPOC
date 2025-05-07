// cypress/page-objects/loginPage.js

class LoginPage {
  // Locators
  get signInButton() {
    return cy.get('a[data-label="overlay:sign in"]');
  }

  get profileIcon() {
    return cy.xpath("(//*[@class='size-5 cursor-pointer text-base text-txtheader-primary focus:outline-none'])[1]");
  }

  get emailInput() {
    return cy.get('input[name="email"]');
  }

  get passwordInput() {
    return cy.get('input[name="password"]');
  }

  get captchaCheckbox() {
    return cy.get('iframe[title="reCAPTCHA"]')
      .its('0.contentDocument.body')
      .find('#recaptcha-anchor');
  }

  get loginButton() {
    return cy.xpath("//button[@data-label='login' and @type='submit' and text()='Login']");
  }

  get createAccountButton() {
    return cy.get('button[data-label="create account"]');
  }

  get forgotPasswordLink() {
    return cy.get('a[href="/auth/forgotPassword"]');
  }

  get createLDAccountLink() {
    return cy.get('a[data-category="login form"][data-action="click"][data-label="create your london drugs account"]');
  }

  get forgotPasswordEmailFormField() {
    return cy.get('input.h-12[name="email"]');
  }

  get sendButton() {
    return cy.get('button[data-category="submit button"][data-action="click"][data-label="send"]');
  }

  get LDAccountFname() {
    return cy.xpath('//input[@placeholder="First Name"]');
  }

  get LDAccountLname() {
    return cy.xpath('//input[@placeholder="Last Name"]');
  }

  get LDAccountEmail() {
    return cy.xpath('//input[@name="email"]');
  }

  get LDAccountConfEmail() {
    return cy.xpath('//input[@name="confirmEmail"]');
  }

  get LDAccountPhone() {
    return cy.xpath('//input[@name="phone"]');
  }

  get LDAccountConfPhone() {
    return cy.xpath('//input[@name="confirmPhone"]');
  }

  get LDAccountCreatePassword() {
    return cy.xpath('//input[@name="password"]');
  }

  get LDAccountConfCreatePassword() {
    return cy.xpath('//input[@name="confirmPassword"]');
  }

  // Actions
  performLogin(email, password) {
    cy.log('Waiting for email input to be enabled and visible...');

    // Wait until email input is enabled and visible
    this.emailInput
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .clear()
      .type(email);

    cy.log('Filling password...');
    this.passwordInput
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .clear()
      .type(password);

    // Handle ReCAPTCHA (ensure iframe is handled in a non-production environment)
    cy.intercept('POST', '**/recaptcha/api/siteverify', {
      statusCode: 200,
      body: { success: true }
    }).as('recaptchaVerify');

    // Optionally remove the iframe to prevent UI issues
    cy.document().then((doc) => {
      const iframe = doc.querySelector('iframe[title="reCAPTCHA"]');
      if (iframe) iframe.remove();
    });

    // Force enable the submit button (in case it depends on reCAPTCHA state)
    cy.get('button[data-label="login"]')
      .invoke('prop', 'disabled', false)
      .click();

    cy.wait(8000);

    // Wait for mocked reCAPTCHA call to complete
    //  cy.wait('@recaptchaVerify');

    // Optional: verify account creation succeeded
    // cy.url().should('include', '/account');
    // this.loginButton.click();
  }

  performLDCreateAccount() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomString = Array.from({ length: 7 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
    const firstName = `first${randomString}`;
    const lastName = `last${randomString}`;
    const password = `user${randomString}${randomNumber}`;
    const email = `user${randomString}${randomNumber}@yopmail.com`;
    const phoneNumber = '1' + Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');

    // Fill out the form
    this.LDAccountFname.clear().type(firstName);
    this.LDAccountLname.clear().type(lastName);
    this.LDAccountEmail.clear().type(email);
    this.LDAccountConfEmail.clear().type(email);
    this.LDAccountPhone.clear().type(phoneNumber);
    this.LDAccountConfPhone.clear().type(phoneNumber);
    this.LDAccountCreatePassword.clear().type(password);
    this.LDAccountConfCreatePassword.clear().type(password);

    // Handle reCAPTCHA checkbox in iframe
    cy.intercept('POST', '**/recaptcha/api/siteverify', {
      statusCode: 200,
      body: { success: true }
    }).as('recaptchaVerify');

    // Optionally remove the iframe to prevent UI issues
    cy.document().then((doc) => {
      const iframe = doc.querySelector('iframe[title="reCAPTCHA"]');
      if (iframe) iframe.remove();
    });

    // Force enable the submit button (in case it depends on reCAPTCHA state)
    cy.get('button[data-label="create account"]')
      .invoke('prop', 'disabled', false)
      .click();

    // Wait for mocked reCAPTCHA call to complete
    //  cy.wait('@recaptchaVerify');

    // Optional: verify account creation succeeded
    // cy.url().should('include', '/account');
    this.createAccountButton.click();
  }


  clickSignInButton() {
    this.signInButton.click();
  }

  fillEmail(email) {
    this.emailInput.clear().type(email);
  }

  fillPassword(password) {
    this.passwordInput.clear().type(password);
  }

  clickLoginButton() {
    this.loginButton.click();
  }

  clickForgotPasswordLink() {
    this.forgotPasswordLink.click();
  }

  fillForgotPasswordEmail(email) {
    this.forgotPasswordEmailFormField.clear().type(email);
  }

  clickSendButton() {
    this.sendButton.click();
  }
}

export { LoginPage };
