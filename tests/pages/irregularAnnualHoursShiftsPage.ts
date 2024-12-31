import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularAnnualHoursShiftsPage_content from "../content/irregularAnnualHoursShiftsPage_content";
import axeTest from "../accessibilityTestHelper"


class IrregularAnnualHoursShiftsPage {
    private readonly title: string;
    private readonly radioOne: string;
    private readonly radioTwo: string;
    private readonly radioThree: string;
    private readonly radioFour: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`;
        this.radioOne = `label[for="response-0"]`;
        this.radioTwo = `label[for="response-1"]`;
        this.radioThree = `label[for="response-2"]`;
        this.radioFour = `label[for="response-3"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.title)).toContainText(irregularAnnualHoursShiftsPage_content.pageTitle),
                expect(page.locator(this.radioOne)).toContainText(irregularAnnualHoursShiftsPage_content.radioOne),
                expect(page.locator(this.radioTwo)).toContainText(irregularAnnualHoursShiftsPage_content.radioTwo),
                expect(page.locator(this.radioThree)).toContainText(irregularAnnualHoursShiftsPage_content.radioThree),
                expect(page.locator(this.radioFour)).toContainText(irregularAnnualHoursShiftsPage_content.radioFour),
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }

    async continueOn(page: Page, choice: string): Promise<void> {
        let optionMap: Map<string, string> = new Map(
            [
                [irregularAnnualHoursShiftsPage_content.radioOne, "#response-0"],
                [irregularAnnualHoursShiftsPage_content.radioTwo, "#response-1"],
                [irregularAnnualHoursShiftsPage_content.radioThree, "#response-2"],
                [irregularAnnualHoursShiftsPage_content.radioFour, "#response-3"]
            ]
        )
        await page.locator(optionMap.get(choice)).click();
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}


export default IrregularAnnualHoursShiftsPage;