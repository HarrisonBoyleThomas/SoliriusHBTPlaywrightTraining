import { Page } from 'playwright';
import {expect} from "@playwright/test";
import startingAndLeavingStartPage_content from "../content/startingAndLeavingStartPage_content";
import axeTest from "../accessibilityTestHelper"


class StartingAndLeavingStartPage {
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
                expect(page.locator(this.title)).toContainText(startingAndLeavingStartPage_content.pageTitle),
                expect(page.locator(this.day)).toContainText(startingAndLeavingStartPage_content.dayField),
                expect(page.locator(this.month)).toContainText(startingAndLeavingStartPage_content.monthField),
                expect(page.locator(this.year)).toContainText(startingAndLeavingStartPage_content.yearField)
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }

    async continueOn(page: Page, dateIn: string): Promise<void> {
        let dateSplit = dateIn.split("-")
        // Fill date form
        await page.locator("#response-0").fill(dateSplit[0]);
        await page.locator("#response-1").fill(dateSplit[1]);
        await page.locator("#response-2").fill(dateSplit[2]);
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}


export default StartingAndLeavingStartPage;