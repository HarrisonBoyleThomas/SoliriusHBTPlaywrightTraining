import { Page } from 'playwright';
import {expect} from "@playwright/test";
import numberOfShiftsPage_content from "../content/numberOfShiftsPage_content";
import axeTest from "../accessibilityTestHelper"


class NumberOfShiftsPage {
    private readonly textInput: string;

    constructor() {
        this.textInput = `label[for="response"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.textInput)).toContainText(numberOfShiftsPage_content.pageTitle)
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }
    async continueOn(page: Page, numberOfShifts: string): Promise<void> {
        await page.locator("#response").fill(numberOfShifts);
        await page.getByRole("button", { name: "Continue" }).click();
    }
}



export default NumberOfShiftsPage;