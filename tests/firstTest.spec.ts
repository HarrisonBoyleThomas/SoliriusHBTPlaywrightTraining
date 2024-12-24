import { test, expect } from '@playwright/test';

test('calc holiday entitlement start now button', async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement');

    await expect(page.locator('.govuk-heading-xl')).toHaveText('Calculate holiday entitlement');

    const startNowButton = page.getByRole("button", { name: "Start now" });
    await startNowButton.click();

    await expect(page).toHaveURL('https://www.gov.uk/calculate-your-holiday-entitlement/y');
});