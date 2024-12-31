import { Page } from 'playwright';
import {expect} from "@playwright/test";
import startingAndLeavingStartPage_content from "../content/startingAndLeavingStartPage_content";
import axeTest from "../accessibilityTestHelper"

class StartingAndLeavingStartPage {
    private readonly url: string;
    private readonly title: string;
    private readonly day: string;
    private readonly month: string;
    private readonly year: string;

    constructor(date: string) {
        this.url = `https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/${date}/shift-worker/starting-and-leaving`;
        this.title = `.govuk-fieldset__heading`;
        this.day = `label[for="response-0"]`;
        this.month = `label[for="response-1"]`;
        this.year = `label[for="response-2"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.title)).toContainText(startingAndLeavingStartPage_content.pageTitle),
                expect(page.locator(this.day)).toContainText(startingAndLeavingStartPage_content.dayField),
                expect(page.locator(this.month)).toContainText(startingAndLeavingStartPage_content.monthField),
                expect(page.locator(this.year)).toContainText(startingAndLeavingStartPage_content.yearField)
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

export default StartingAndLeavingStartPage;