import { Page } from 'playwright';
import {expect} from "@playwright/test";
import hoursAmountPage_content from "../content/hoursAmountPage_content";
import axeTest from "../accessibilityTestHelper"


class HoursAmountPage {
    private readonly url: string;
    private readonly textInput: string;

    constructor(leaveDate: string, employmentStartDate: string, employmentEndDate: string) {
        this.url = `https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/${leaveDate}` +
                   `/shift-worker/starting-and-leaving/${employmentStartDate}/${employmentEndDate}`;
        this.textInput = `label[for="response"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.textInput)).toContainText(hoursAmountPage_content.pageTitle)
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }
    async continueOn(page: Page, hoursIn: string): Promise<void> {
        await page.locator("#response").fill(hoursIn);
        await page.getByRole("button", { name: "Continue" }).click();
    }
}



export default HoursAmountPage;