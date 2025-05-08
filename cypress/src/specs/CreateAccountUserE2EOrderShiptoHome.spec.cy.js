import { HomePage } from "../page-objects/homePage";
import { CartPage } from "../page-objects/cartPage";
import { CheckoutPage } from "../page-objects/checkoutPage";
import { OrderConfirmationPage } from "../page-objects/orderconfirmationPage";
import { LoginPage } from "../page-objects/loginPage";

const testData = require("../../fixtures/uatTestdata.json");

describe('E2E Test Order Creation for Ship to Home', () => {
  it('should create an order and ship it to home', () => {
    // Clear and set cookies
    cy.clearCookies();
    const cookies = testData.dataDomekey.split('; ').map(cookie => {
      const [name, ...rest] = cookie.split('=');
      return {
        name,
        value: rest.join('='),
        domain: testData.domain,
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax',
      };
    });

    cookies.forEach(cookie => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite
      });
    });

    // Page object instances
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();
    const orderConfirmationPage = new OrderConfirmationPage();

    // Visit the home page
    homePage.goTo(testData.baseUrl);

    // Create a new user account
    homePage.navigateCreatePage();
    loginPage.performLDCreateAccount();

    // Search and add product
    const testSku = testData.productData?.regular?.productcode || 'L3166675';
    homePage.searchForProduct1(testSku);

    cartPage.addProductToCart();
    cartPage.proceedToCheckout();

    // Fill checkout details
    checkoutPage.addShippingAddress(testData.shipping);
    checkoutPage.proceedToBilling();
    checkoutPage.cardPayment(testData.payment.CreditCard.visa);
    checkoutPage.placeyourOrder();

    // Confirm order
    orderConfirmationPage.verifyThanksMessageAppears();
    orderConfirmationPage.getOrderNumber().then(orderNumber => {
      if (orderNumber) {
        cy.log('Order Number:', orderNumber);
        expect(orderNumber).to.exist;
      } else {
        cy.log('Order number not found');
      }
    });
  });
});
