const {test, expect, request} = require("@playwright/test");
const {ApiUtils} = require('./ApiUtils');

const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders: [{country: "Angola", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};

let token, orderId;

test.beforeAll(async () => {

    const apiContext = await request.newContext();

    const apiUtils = new ApiUtils(apiContext, loginPayLoad);

    token = await apiUtils.getToken();
    orderId = await apiUtils.getOrderId(orderPayLoad, token);
});

test('Add Product', async ({page}) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("[routerlink*='cart']").click();

    await page.locator("[routerlink='/dashboard/myorders']").first().click();
    await page.locator("tbody").waitFor();
    const tbody = page.locator("tbody tr");
    const count4 = await tbody.count(); 
    for(let i=0; i<count4; i++) {
        const id = await tbody.nth(i).locator("th").textContent();
        if(orderId.includes(id)) {
            await tbody.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
});
