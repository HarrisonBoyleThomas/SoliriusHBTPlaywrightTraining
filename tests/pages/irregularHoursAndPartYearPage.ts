import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularHoursAndPartYearPage_content from "../content/irregularHoursAndPartYearPage_content";
import axeTest from "../accessibilityTestHelper"

class IrregularHoursAndPartYearPage {
    private readonly title: string;
    private readonly text: string;
    private readonly day: string;
    private readonly month: string;
    private readonly year: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`;
        this.text = `.govuk-hint`;
        this.day = `label[for="response-0"]`;
        this.month = `label[for="response-1"]`;
        this.year = `label[for="response-2"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.title)).toContainText(irregularHoursAndPartYearPage_content.pageTitle),
                expect(page.locator(this.text)).toContainText(irregularHoursAndPartYearPage_content.pText),
                expect(page.locator(this.day)).toContainText(irregularHoursAndPartYearPage_content.dayField),
                expect(page.locator(this.month)).toContainText(irregularHoursAndPartYearPage_content.monthField),
                expect(page.locator(this.year)).toContainText(irregularHoursAndPartYearPage_content.yearField)
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

export default IrregularHoursAndPartYearPage;