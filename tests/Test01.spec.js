const { test, expect } = require('@playwright/test'); 
const { log } = require('console');

test('Test 1.1', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.amazon.in/");
})

test('Test 1.2', async ({page}) => {
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
})
