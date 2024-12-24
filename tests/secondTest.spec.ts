import { test, expect } from '@playwright/test';

test('Calculate Holiday Entitlement for Full Year', async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');

    await page.locator("#response-1").click();
    await page.getByRole("button", { name: "Continue" }).click();

    await page.locator("#response-0").click();
    await page.getByRole("button", { name: "Continue" }).click();

    await page.locator("#response-0").click();
    await page.getByRole("button", { name: "Continue" }).click();

    await page.locator("#response").fill("5");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("The statutory holiday entitlement is 28 days holiday.")).toBeVisible()
});