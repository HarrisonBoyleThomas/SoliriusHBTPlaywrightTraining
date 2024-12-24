import { Page } from 'playwright';
import {expect} from "@playwright/test";
import workOutHolidayPage_content from "../content/workOutHolidayPage_content";

class WorkOutHolidayPage {
    private readonly url: string;
    private readonly text: string;
    private readonly optionOne: string;
    private readonly optionTwo: string;
    private readonly optionThree: string;
    private readonly optionFour: string;

    constructor() {
        this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/days-worked-per-week';
        this.optionOne = `label[for="response-0"]`;
        this.optionTwo = `label[for="response-1"]`;
        this.optionThree = `label[for="response-2"]`;
        this.optionFour = `label[for="response-3"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.optionOne)).toContainText(workOutHolidayPage_content.options[0]),
                expect(page.locator(this.optionTwo)).toContainText(workOutHolidayPage_content.options[1]),
                expect(page.locator(this.optionThree)).toContainText(workOutHolidayPage_content.options[2]),
                expect(page.locator(this.optionFour)).toContainText(workOutHolidayPage_content.options[3]),
            ]
        );
    }
    async continueOn(page: Page, radioButton: string): Promise<void> {
        let optionMap: Map<string, string> = new Map(
            [
                ["for a full leave year", "#response-0"],
                ["for someone starting part way through a leave year", "#response-1"],
                ["for someone leaving part way through a leave year", "#response-2"],
                ["for someone starting and leaving part way through a leave year", "#response-3"]
            ]
        )
        await page.locator(optionMap.get(radioButton)).click();
        await page.getByRole("button", { name: "Continue" }).click();
    }
}



export default WorkOutHolidayPage;