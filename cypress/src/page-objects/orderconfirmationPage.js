class OrderConfirmationPage {
  constructor() {
    this.selectors = {
      thankYouMessage: "//h1[normalize-space()='Thank you for your order']",
      orderNumber: '//span[@class="text-primary" and starts-with(text(), "#")]'
    };
  }

  verifyThanksMessageAppears() {
    cy.wait(20000); // Adjust this as needed
    cy.xpath(this.selectors.thankYouMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Thank you for your order');
  }

  getOrderNumber() {
    return cy
      .xpath(this.selectors.orderNumber, { timeout: 10000 })
      .should('exist')
      .invoke('text')
      .then((text) => {
        const orderNumber = text.trim().replace('#', '');
        cy.log('Order Number:', orderNumber);
        return cy.wrap(orderNumber); // Wrap the value to return it properly
      });
  }
}

export { OrderConfirmationPage };
