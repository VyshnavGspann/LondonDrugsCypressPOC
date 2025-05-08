// cypress/page-objects/homePage.js

class HomePage {
  constructor() {
    this.selectors = {
      signInButton: "//a[@data-label='overlay:sign in']",
      createAccount: "//a[@data-label='overlay:create an account']",
      profileIcon: "(//*[@class='size-5 cursor-pointer text-base text-txtheader-primary focus:outline-none'])[1]",
      searchBox: "(//input[contains(@class, 'placeholder:text-txttertiary') and @placeholder='Find your product'])[2]",
      searchIcon: "(//*[contains(@class, 'cursor-pointer') and contains(@class, 'text-header-secondary')])[2]",
      menuButton: "(//*[@role='button' and contains(@class, 'cursor-pointer') and contains(@class, 'text-base')])[1]",
    };
  }

  // Go to the homepage
  goTo() {
    cy.visit('https://london-drugs-uat-origin.kibology.us/', {
      failOnStatusCode: false
    })
  }


  // Search for a product
  searchForProduct(productName) {
    cy.wait(4000);
    cy.xpath(this.selectors.searchBox)
      .clear()
      .type(productName)
      .should('have.value', productName); // Ensure the value is correctly entered
    cy.xpath(this.selectors.searchIcon).click();
  }

  // Search for a product (with some wait for example, replace it later with a more reliable method)
  searchForProduct1(productName) {
    cy.wait(10000);
    cy.xpath(this.selectors.searchBox, { timeout: 20000 })
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .scrollIntoView()
      .as('searchInput');
    cy.get('@searchInput').then(($input) => {
      cy.wrap($input)
        .focus()
        .clear({ force: true });
      cy.wrap($input)
        .type(productName, { delay: 25 }) // delay for debounce
        .should('have.value', productName);
    });
    cy.wait(1000); // Wait 1 second after typing (adjust if needed)
    cy.xpath(this.selectors.searchIcon, { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .click();
    cy.xpath("//label[@for='categories-drawer' and contains(text(), 'Categories')]", { timeout: 15000 })
      .should('exist')
      .should('be.visible');
  }


  // Navigate to the login page
  navigateToLoginPage() {
    cy.wait(10000);
    cy.xpath(this.selectors.menuButton).first().should('exist').click({ force: true });// use { force: true } if always hidden
    cy.xpath(this.selectors.signInButton).should('exist').click({ force: true }); // same here if in overlay
  }

  // Navigate to the create account page
  navigateCreatePage() {
    cy.xpath(this.selectors.menuButton).first().should('exist').click({ force: true }); // force click even if hidden
    cy.xpath(this.selectors.createAccount).should('exist').click({ force: true });  // force click even if hidden
  }
}

export { HomePage };
