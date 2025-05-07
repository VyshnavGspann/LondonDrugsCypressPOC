class CartPage {

  selectFirstProduct() {
    cy.wait(5000);
    cy.get('.product-card-image').first().click();  // Click the first product
  }

  selectMyStoreRadioButtonForInStorePickup() {
    cy.wait(12000);
    cy.get('input[aria-label="Product Ship to Store Pickup Fulfillment Type"]').should('not.be.disabled').click();  // select the Instore pickup radio button
    cy.wait(5000);
    cy.get('input[placeholder=" Enter a Postal Code or City*"]').clear()
      .type('t1y6m6');
    cy.get('button[data-label="search stores"]').click();
    // cy.wait(3000);
    // cy.scrollTo('bottom');
    cy.wait(5000);
    cy.get('button.primary-button.my-2.w-full.px-6.py-3').eq(1).click();
  }

  selectMyStoreRadioButtonForShipToStore() {
    cy.wait(12000);
    cy.get('input[aria-label="Product Ship to Store Pickup Fulfillment Type"]').should('not.be.disabled').click();  // select the Instore pickup radio button
    cy.wait(5000);
    cy.get('input[placeholder=" Enter a Postal Code or City*"]').clear()
      .type('V6Z 1E4');
    cy.get('button[data-label="search stores"]').click();
    // cy.wait(3000);
    // cy.scrollTo('bottom');
    cy.wait(5000);
    cy.get('button.primary-button.my-2.w-full.px-6.py-3').eq(0).click();
  }

  addProductToCart() {
    cy.wait(7000);
    cy.contains('ADD TO CART').click();  // Add to cart button
    cy.wait(2000);
  }

  addProductToCart1() {
    cy.wait(7000);
    cy.get('.product-card-image').first().click();  // Click the first product
    cy.wait(4000);
    // Add to cart button
    cy.xpath("//button[@title='Add To Cart']", { timeout: 20000 })
      .should('be.visible')
      .click();
    cy.wait(2000);
  }

  proceedToCheckout() {
    cy.wait(6000);
    cy.contains('View Cart & Checkout').click();
    cy.wait(5000);
    cy.xpath("//button[@type='submit' and @data-label='checkout']", { timeout: 20000 })
      .should('be.visible')
      .click();
  }
}

export { CartPage };
