import { HomePage } from "../page-objects/homePage";
import { CartPage } from "../page-objects/cartPage";
import { CheckoutPage } from "../page-objects/checkoutPage";
import { OrderConfirmationPage } from "../page-objects/orderconfirmationPage";
import { LoginPage } from "../page-objects/loginPage";

const testData = require("../../fixtures/uatTestdata.json"); // now points to JSON file

describe('E2E Test Order Creation for Ship to Store Pickup', () => {

    it('should create an order and Ship to Store Pickup', () => {
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
        const homePage = new HomePage();
        const logInPage = new LoginPage();
        const cartPage = new CartPage();
        const checkoutPage = new CheckoutPage();
        const orderConfirmationPage = new OrderConfirmationPage();

        homePage.goTo(testData.baseUrl);
        // Search and add product
        const testSku = testData.productData?.regular?.productcode || 'L3166675';
        homePage.searchForProduct(testSku);
        cartPage.selectFirstProduct();
        cartPage.selectMyStoreRadioButtonForShipToStore();
        cartPage.addProductToCart();
        cartPage.proceedToCheckout();

        // Checkout steps
        checkoutPage.enterEmail();
        checkoutPage.proceedToBilling();
        checkoutPage.addShippingAddressforStorePickup(testData.shippingInStore);
        // checkoutPage.selectCardType();
        checkoutPage.cardPayment(testData.payment.CreditCard.master);
        checkoutPage.placeyourOrder();

        // Order confirmation
        orderConfirmationPage.verifyThanksMessageAppears();
        orderConfirmationPage.getOrderNumber().then(orderNumber => {
            if (orderNumber) {
                cy.log('Order Number:', orderNumber);
                expect(orderNumber).to.exist;
                console.log("order placed successfully: " + orderNumber);
            } else {
                cy.log('Order number not found');
            }
        });
    });
});
