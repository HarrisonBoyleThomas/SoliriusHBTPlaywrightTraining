import { Page } from 'playwright';
import {expect} from "@playwright/test";
import hoursAmountPage_content from "../content/hoursAmountPage_content";
import axeTest from "../accessibilityTestHelper"


class HoursAmountPage {
    private readonly textInput: string;

    constructor() {
        this.textInput = `label[for="response"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
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