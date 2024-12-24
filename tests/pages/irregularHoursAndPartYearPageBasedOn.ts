import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularHoursAndPartYearBasedOnPage_content from "../content/irregularHoursAndPartYearBasedOnPage_content";
import axeTest from "../accessibilityTestHelper"

class IrregularHoursAndPartYearBasedOnPage {
    private readonly url: string;
    private readonly title: string;
    private readonly text: string;
    private readonly radioOne: string;
    private readonly radioTwo: string;
    private readonly radioThree: string;
    private readonly radioFour: string;
    private readonly radioFive: string;

    constructor(date: string) {
        this.url = `https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/${ date }`;
        this.title = `.govuk-fieldset__heading`;
        this.text = `.govuk-hint`;
        this.radioOne = `label[for="response-0"]`;
        this.radioTwo = `label[for="response-1"]`;
        this.radioThree = `label[for="response-2"]`;
        this.radioFour = `label[for="response-3"]`;
        this.radioFive = `label[for="response-4"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.title)).toContainText(irregularHoursAndPartYearBasedOnPage_content.pageTitle),
                expect(page.locator(this.text)).toContainText(irregularHoursAndPartYearBasedOnPage_content.pText),
                expect(page.locator(this.radioOne)).toContainText(irregularHoursAndPartYearBasedOnPage_content.radioOne),
                expect(page.locator(this.radioTwo)).toContainText(irregularHoursAndPartYearBasedOnPage_content.radioTwo),
                expect(page.locator(this.radioThree)).toContainText(irregularHoursAndPartYearBasedOnPage_content.radioThree),
                expect(page.locator(this.radioFour)).toContainText(irregularHoursAndPartYearBasedOnPage_content.radioFour),
                expect(page.locator(this.radioFive)).toContainText(irregularHoursAndPartYearBasedOnPage_content.radioFive)
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }
    
    async continueOn(page: Page, choice: string): Promise<void> {
        let optionMap: Map<string, string> = new Map(
            [
                [irregularHoursAndPartYearBasedOnPage_content.radioOne, "#response-0"],
                [irregularHoursAndPartYearBasedOnPage_content.radioTwo, "#response-1"],
                [irregularHoursAndPartYearBasedOnPage_content.radioThree, "#response-2"],
                [irregularHoursAndPartYearBasedOnPage_content.radioFour, "#response-3"],
                [irregularHoursAndPartYearBasedOnPage_content.radioFive, "#response-4"],
            ]
        )
        await page.locator(optionMap.get(choice)).click();
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default IrregularHoursAndPartYearBasedOnPage;