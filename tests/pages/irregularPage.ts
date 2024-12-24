import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularPage_content from "../content/irregularPage_content";

class IrregularPage {
    private readonly url: string;
    private readonly text: string;
    private readonly radioYes: string;
    private readonly radioNo: string;

    constructor() {
        this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement/y';
        this.text = `.govuk-hint`;
        this.radioYes = `label[for="response-0"]`;
        this.radioNo = `label[for="response-1"]`;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.text)).toContainText(irregularPage_content.pText),
                expect(page.locator(this.radioYes)).toContainText(irregularPage_content.radioYes),
                expect(page.locator(this.radioNo)).toContainText(irregularPage_content.radioNo)
            ]
        );
    }
    async continueOn(page: Page, radioButton: string): Promise<void> {
        let optionMap: Map<string, string> = new Map(
            [
                ["Yes", "#response-0"],
                ["No", "#response-1"]
            ]
        )
        await page.locator(optionMap.get(radioButton)).click();
        await page.getByRole("button", { name: "Continue" }).click();
    }
}



export default IrregularPage;