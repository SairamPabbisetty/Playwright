const {test, expect, request} = require("@playwright/test");
const {ApiUtils} = require('./ApiUtils');

const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders: [{country: "Angola", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};

let token, productsCount, orderId, deleteMessage;

test.beforeAll(async () => {

    const apiContext = await request.newContext();

    const apiUtils = new ApiUtils(apiContext, loginPayLoad);

    token = await apiUtils.getToken();
    productsCount = await apiUtils.getProductsCount(token);
    orderId = await apiUtils.getOrderId(orderPayLoad, token);
    deleteMessage = await apiUtils.deleteOrder(orderId, token); 
});

test('Product', async ({page}) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("[routerlink='/dashboard/']").first().click(); 

    await page.locator("[routerlink='/dashboard/myorders']").first().click(); 

    console.log(token);
    console.log(productsCount);
    console.log(orderId);
    console.log(deleteMessage); 
    
    await page.pause();
});
