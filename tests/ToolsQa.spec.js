const { test } = require('@playwright/test');

test('child window - new tab', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://demoqa.com/browser-windows');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('#tabButton').click()
    ]);

    console.log(await newPage.locator('#sampleHeading').textContent());
})
