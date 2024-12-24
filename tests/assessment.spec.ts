import { test, expect } from '@playwright/test';
import LandingPage from "./pages/landingPage";
import IrregularPage from "./pages/irregularPage";
import IrregularHoursAndPartYearPage from "./pages/irregularHoursAndPartYearPage";
import IrregularHoursAndPartYearBasedOnPage from "./pages/irregularHoursAndPartYearPageBasedOn";
import IrregularAnnualHoursPage from "./pages/irregularAnnualHoursPage";
import AnswersPage from "./pages/answersPage";

test(`Calculate Holiday Entitlement for a full leave year with annualised hours and other options`, async ({ page }): Promise<void> => {
    const landingPage: LandingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await landingPage.continueOn(page);

    const irregularPage: IrregularPage = new IrregularPage();
    await irregularPage.checkPageLoads(page);
    await irregularPage.continueOn(page, "Yes");

    const year = "05-08-1999"
    const yearSplit = year.split("-");

    const irregularHoursAndPartYearPage: IrregularHoursAndPartYearPage = new IrregularHoursAndPartYearPage();
    await irregularHoursAndPartYearPage.checkPageLoads(page);
    await irregularHoursAndPartYearPage.continueOn(page, yearSplit[0], yearSplit[1], yearSplit[2]);

    const irregularHoursAndPartYearBasedOnPage: IrregularHoursAndPartYearBasedOnPage = new IrregularHoursAndPartYearBasedOnPage(year);
    await irregularHoursAndPartYearBasedOnPage.checkPageLoads(page);
    await irregularHoursAndPartYearBasedOnPage.continueOn(page, "annualised hours");

    const irregularAnnualHoursPage: IrregularAnnualHoursPage = new IrregularAnnualHoursPage(year);
    await irregularAnnualHoursPage.checkPageLoads(page);
    await irregularAnnualHoursPage.continueOn(page, "for a full leave year");

    const expectedHoliday: string = "The statutory holiday entitlement is 5.6 weeks holiday."
    const answersPage: AnswersPage = new AnswersPage(year, expectedHoliday);
    await answersPage.checkPageLoads(page);    
});