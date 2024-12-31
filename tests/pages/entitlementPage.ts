import { Page } from 'playwright';
import {expect} from "@playwright/test";
import entitlementPage_content from "../content/entitlementPage_content";
import axeTest from "../accessibilityTestHelper"


class EntitlementPage {
    private readonly text: string;
    private readonly optionOne: string;
    private readonly optionTwo: string;
    private readonly optionThree: string;
    private readonly optionFour: string;
    private readonly optionFive: string;

    constructor() {
        this.text = `.govuk-hint`;
        this.optionOne = `label[for="response-0"]`;
        this.optionTwo = `label[for="response-1"]`;
        this.optionThree = `label[for="response-2"]`;
        this.optionFour = `label[for="response-3"]`;
        this.optionFive = `label[for="response-4"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.text)).toContainText(entitlementPage_content.pText),
                expect(page.locator(this.optionOne)).toContainText(entitlementPage_content.options[0]),
                expect(page.locator(this.optionTwo)).toContainText(entitlementPage_content.options[1]),
                expect(page.locator(this.optionThree)).toContainText(entitlementPage_content.options[2]),
                expect(page.locator(this.optionFour)).toContainText(entitlementPage_content.options[3]),
                expect(page.locator(this.optionFive)).toContainText(entitlementPage_content.options[4]),
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }

    async continueOn(page: Page, radioButton: string): Promise<void> {
        let optionMap: Map<string, string> = new Map(
            [
                ["days worked per week", "#response-0"],
                ["hours worked per week", "#response-1"],
                ["annualised hours", "#response-2"],
                ["compressed hours", "#response-3"],
                ["shifts", "#response-4"],
            ]
        )
        await page.locator(optionMap.get(radioButton)).click();
        await page.getByRole("button", { name: "Continue" }).click();
    }
}


export default EntitlementPage;