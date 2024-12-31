import { Page } from 'playwright';
import {expect} from "@playwright/test";
import shiftPatternLengthPage_content from "../content/shiftPatternLengthPage_content";
import axeTest from "../accessibilityTestHelper"


class ShiftPatternLengthPage {
    private readonly textInput: string;

    constructor() {
        this.textInput = `label[for="response"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
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