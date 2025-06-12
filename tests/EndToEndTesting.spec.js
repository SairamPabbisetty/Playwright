const {test, expect} = require("@playwright/test");

test('End-To-End', async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');

    const items = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const count = await items.count();
    for(let i=0; i<count; i++) {
        const name = await items.nth(i).locator("b").textContent();
        if(name === "ZARA COAT 3") {
            await items.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();

    await page.locator("text=Checkout").click();

    // await page.locator("div li").first().waitFor();
    expect(page.locator(".user__name [type='text']").first()).toHaveText("anshika@gmail.com");
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const count3 = await dropdown.locator("button").count();
    for(let i=0; i<count3; i++) {
        const option = await dropdown.locator("button").nth(i).textContent();
        if(option === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.locator(".action__submit").click();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId); 

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
