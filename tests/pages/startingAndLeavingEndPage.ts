import { Page } from 'playwright';
import {expect} from "@playwright/test";
import startingAndLeavingEndPage_content from "../content/startingAndLeavingEndPage_content";
import axeTest from "../accessibilityTestHelper"

class StartingAndLeavingEndPage {
    private readonly title: string;
    private readonly day: string;
    private readonly month: string;
    private readonly year: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`;
        this.day = `label[for="response-0"]`;
        this.month = `label[for="response-1"]`;
        this.year = `label[for="response-2"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.title)).toContainText(startingAndLeavingEndPage_content.pageTitle),
                expect(page.locator(this.day)).toContainText(startingAndLeavingEndPage_content.dayField),
                expect(page.locator(this.month)).toContainText(startingAndLeavingEndPage_content.monthField),
                expect(page.locator(this.year)).toContainText(startingAndLeavingEndPage_content.yearField)
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }
    
    async continueOn(page: Page, dayIn: string = "", monthIn: string = "", yearIn: string = ""): Promise<void> {
        // Fill date form
        await page.locator("#response-0").fill(dayIn);
        await page.locator("#response-1").fill(monthIn);
        await page.locator("#response-2").fill(yearIn);
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default StartingAndLeavingEndPage;