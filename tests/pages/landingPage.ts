import { Page } from 'playwright';
import {expect} from "@playwright/test";
import landingPage_content from "../content/landingPage_content";

class LandingPage {
    private readonly url: string;
    private readonly title: string;
    private readonly text: string;

    constructor() {
        this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement';
        this.title = `.govuk-fieldset__heading`
        this.text = `.gem-c-govspeak`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.text)).toContainText(landingPage_content.pText1),
                expect(page.locator(this.text)).toContainText(landingPage_content.pText2),
                expect(page.locator(this.text)).toContainText(landingPage_content.liText1),
                expect(page.locator(this.text)).toContainText(landingPage_content.liText2),
            ]
        );
    }

    
async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await page.getByRole("button", { name: "Start now" }).click();
    }
}

export default LandingPage;