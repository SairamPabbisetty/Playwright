const {test, expect} = require("@playwright/test");

test('Visible & Hidden', async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('Alert Handling', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    page.on('dialog', d => d.accept());
    await page.locator("#alertbtn").click();
    await page.locator("#confirmbtn").click();
});

test('Hover', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.hover("#mousehover");
    await page.click(".mouse-hover-content a[href='#top']");
});

test.only('Frames', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const frame = page.frameLocator("#courses-iframe");
    await frame.locator("li a[href*='lifetime-access']:visible").click();
    const texts = await frame.locator(".text h2").textContent();
    console.log(texts.split(" ")[1]);
});
