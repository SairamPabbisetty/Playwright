
const { test, expect} = require('@playwright/test'); 

test('valid username and password', async ({page}) => {
    await page.goto("https://www.saucedemo.com/v1/");
    
    await page.locator('#user-name').type("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();

    console.log(await page.locator(".product_label").textContent());
})

test('valid username and invalid password', async ({page}) => {
    const error = page.locator("[data-test='error']");

    await page.goto("https://www.saucedemo.com/v1/");
    
    await page.locator('#user-name').type("standard_user");
    await page.locator('#password').fill("secret_sauc");
    await page.locator('#login-button').click();

    console.log(await error.textContent());
    await expect(error).toContainText("do not match");
})

test('multiple web elements', async ({page}) => {
    const productTitle = page.locator('.inventory_item_name');

    await page.goto("https://www.saucedemo.com/v1/");
    
    await page.locator('#user-name').type("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();

    console.log(await productTitle.first().textContent());
    console.log(await productTitle.nth(1).textContent());
    console.log(await productTitle.last().textContent());
    console.log(await productTitle.allTextContents());
})

test('dynamic wait', async ({page}) => {
    const productTitle = page.locator('.inventory_item_name');

    await page.goto("https://www.saucedemo.com/v1/");
    
    await page.locator('#user-name').type("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();

    await page.waitForLoadState('networkidle');

    console.log(await productTitle.allTextContents());
})

test('dropdown - select', async ({page}) => {
    await page.goto("https://www.saucedemo.com/v1/");
    
    await page.locator('#user-name').type("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click(); 

    const dropdown = page.locator(".product_sort_container");
    await dropdown.selectOption("lohi");
    await page.pause(); /* Playwright debugging tool that pauses execution of your test at that 
    specific line. It's useful for inspecting the browser state while running tests. */
    console.log(await page.locator('.inventory_item_name').first().textContent());
}) 

test.only('child window - same tab', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.saucedemo.com/v1/inventory.html");

    await page.locator('xpath=//*[@id="menu_button_container"]/div/div[3]/div/button').click();
    const aboutLink = page.locator('#about_sidebar_link');
    await aboutLink.click();

    console.log(await page.locator('h1.MuiTypography-root.MuiTypography-h1.css-152qxt').textContent()); 
})
