import { Page } from 'playwright';
import {expect} from "@playwright/test";
import shiftPatternLengthPage_content from "../content/shiftPatternLengthPage_content";
import axeTest from "../accessibilityTestHelper"


class ShiftPatternLengthPage {
    private readonly url: string;
    private readonly textInput: string;

    constructor(leaveDate: string, employmentStartDate: string, employmentEndDate: string, shiftLength: number, numberOfShifts: number) {
        this.url = `https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/${leaveDate}` +
                   `/shift-worker/starting-and-leaving/${employmentStartDate}/${employmentEndDate}/${shiftLength.toFixed(1)}/${numberOfShifts}`;
        this.textInput = `label[for="response"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.textInput)).toContainText(shiftPatternLengthPage_content.pageTitle)
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }
    async continueOn(page: Page, shiftPatternLengthIn: string): Promise<void> {
        await page.locator("#response").fill(shiftPatternLengthIn);
        await page.getByRole("button", { name: "Continue" }).click();
    }
}



export default ShiftPatternLengthPage;