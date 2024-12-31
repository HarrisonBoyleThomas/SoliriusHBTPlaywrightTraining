import { Page } from 'playwright';
import {expect} from "@playwright/test";
import answersPage_content from "../content/answersPage_content";
import axeTest from "../accessibilityTestHelper"


class AnswersPage {
    private readonly title: string;
    private readonly text: string;
    private readonly expectedAnswer: string;

    constructor(expectedAnswerIn: string) {
        this.title = `.govuk-heading-xl`;
        this.text = `.govuk-govspeak`;
        this.expectedAnswer = expectedAnswerIn;
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all(
            [
                expect(page.locator(this.title)).toContainText(answersPage_content.pageTitle),
                expect(page.locator(this.text)).toContainText(this.expectedAnswer)
            ]
        );
        // Check accessibility compliance
        await axeTest(page);
    }
}


export default AnswersPage;