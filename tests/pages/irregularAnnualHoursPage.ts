import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularAnnualHoursPage_content from "../content/irregularAnnualHoursPage_content";
import axeTest from "../accessibilityTestHelper"

class IrregularAnnualHoursPage {
    private readonly url: string;
    private readonly title: string;
    private readonly radioOne: string;
    private readonly radioTwo: string;
    private readonly radioThree: string;
    private readonly radioFour: string;

    constructor(date: string) {
        this.url = `https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/${ date }/annualised-hours`;
        this.title = `.govuk-fieldset__heading`;
        this.radioOne = `label[for="response-0"]`;
        this.radioTwo = `label[for="response-1"]`;
        this.radioThree = `label[for="response-2"]`;
        this.radioFour = `label[for="response-3"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.title)).toContainText(irregularAnnualHoursPage_content.pageTitle),
                expect(page.locator(this.radioOne)).toContainText(irregularAnnualHoursPage_content.radioOne),
                expect(page.locator(this.radioTwo)).toContainText(irregularAnnualHoursPage_content.radioTwo),
                expect(page.locator(this.radioThree)).toContainText(irregularAnnualHoursPage_content.radioThree),
                expect(page.locator(this.radioFour)).toContainText(irregularAnnualHoursPage_content.radioFour),
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }
    
    async continueOn(page: Page, choice: string): Promise<void> {
        let optionMap: Map<string, string> = new Map(
            [
                [irregularAnnualHoursPage_content.radioOne, "#response-0"],
                [irregularAnnualHoursPage_content.radioTwo, "#response-1"],
                [irregularAnnualHoursPage_content.radioThree, "#response-2"],
                [irregularAnnualHoursPage_content.radioFour, "#response-3"]
            ]
        )
        await page.locator(optionMap.get(choice)).click();
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default IrregularAnnualHoursPage;