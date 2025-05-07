class CheckoutPage {
  constructor() {
    this.selectors = {
      email: "//input[@placeholder='abc@gmail.com']",
      firstName: "//input[@placeholder='Enter your first name']",
      lastName: "//input[@placeholder='Enter your last name']",
      address1: "(//input[@placeholder='Enter your street address'])[1]",
      address2: "//input[@placeholder='Enter your address line 2']",
      address2Css: "input[placeholder='Enter your street address'][name='addressLine2']",
      city: "//input[@placeholder='City']",
      zip: "//input[@placeholder='Zip Code']",
      phone: "//input[@placeholder='Enter your Phone number']",
      postalCode: "//input[@placeholder='Postal Code']",
      useAddress: "//button[text()='Use this Address']",
      usePopupAddress: "(//button[@type='submit' and @value='Use this Address' and text()='Use this Address'])[2]",
      proceedToBilling: "//button[text()='Proceed to Billing']",
      placeOrder: "//button[text()='Place your Order']",
      reviewOrder: "//button[text()='Review your Order']",
      nameOnCard: "//input[@placeholder='Enter your Name on Card']",
      cardTypeCss: "select[name='cardType']",
      cardNumberCss: "input[placeholder='Enter your Card Number']",
      cvv: "//input[contains(@style, 'background-image: url') and @name='cvv']",
      termsCheckbox: "//input[@type='checkbox' and @id='accept']",
      selectSuggestedAddress: "(//li[@class='cursor-pointer p-2 text-txtprimary hover:bg-gray-100'])/ancestor::ul[1]"
    };
  }

  addShippingAddress(shippingData = {}) {
    cy.wait(3000);
    // cy.xpath(this.selectors.email).type(shippingData.email);
    cy.xpath(this.selectors.firstName).type(shippingData.firstName);
    cy.xpath(this.selectors.lastName).type(shippingData.lastName);
    cy.xpath(this.selectors.address1).type(shippingData.address1);
    cy.get(this.selectors.address2Css).focus().type(shippingData.address2);
    cy.xpath(this.selectors.city).type(shippingData.city);
    cy.xpath(this.selectors.zip).type(shippingData.zipcode);
    cy.xpath(this.selectors.phone).type(shippingData.phone);
  }

  clickUseAddressButton() {
    cy.wait(4000);
    cy.xpath(this.selectors.useAddress).click();
    cy.wait(4000);
    cy.xpath(this.selectors.usePopupAddress).click();
  }

  async enterEmail() {
    cy.wait(6000);
    cy.xpath(this.selectors.email).type("testimmediatelondon1@yopmail.com");
  }

  proceedToBilling() {
    cy.wait(3000);
    cy.xpath(this.selectors.proceedToBilling).click();
  }

  async addShippingAddressforStorePickup(shippingData = {}) {
    cy.wait(3000);
    cy.xpath(this.selectors.firstName).type(shippingData.firstName);
    cy.xpath(this.selectors.lastName).type(shippingData.lastName);
    cy.xpath(this.selectors.phone).type(shippingData.phone);
    cy.xpath(this.selectors.address1).type(shippingData.address1);
    cy.xpath(this.selectors.address2).type(shippingData.address2);
    cy.xpath(this.selectors.postalCode).type(shippingData.postalCode);
    cy.xpath(this.selectors.city).type(shippingData.city);
  }

  fillPaymentDetails(payment = {}) {
    cy.xpath(this.selectors.nameOnCard).type(payment.nameOnCard);
    cy.get(this.selectors.cardTypeCss).select(payment.cardTypeValue);
    cy.get(this.selectors.cardNumberCss).focus().type(payment.cardNumber);
    cy.xpath(this.selectors.cvv).type(payment.cvv);
    cy.xpath(this.selectors.reviewOrder).click();
  }

  placeyourOrder() {
    cy.xpath(this.selectors.termsCheckbox).click();
    cy.xpath(this.selectors.placeOrder).click();
  }

  selectCardType() {
    cy.wait(1000);
    cy.get("select[name='cardType']")
      .select('MasterCard')
      .should('have.value', 'MasterCard');

    cy.log("Selected card type is: MasterCard");
  }

  cardPayment(paymentData = {}) {
    this.fillPaymentDetails(paymentData);
  }
}

export { CheckoutPage };
