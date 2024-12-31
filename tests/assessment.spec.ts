import { test } from '@playwright/test';
import LandingPage from "./pages/landingPage";
import IrregularPage from "./pages/irregularPage";
import IrregularHoursAndPartYearPage from "./pages/irregularHoursAndPartYearPage";
import IrregularAnnualHoursShiftsPage from "./pages/irregularAnnualHoursShiftsPage";
import IrregularHoursAndPartYearBasedOnPage from "./pages/irregularHoursAndPartYearPageBasedOn";
import IrregularAnnualHoursPage from "./pages/irregularAnnualHoursPage";
import StartingAndLeavingStartPage from "./pages/startingAndLeavingStartPage";
import StartingAndLeavingEndPage from "./pages/startingAndLeavingEndPage";
import HoursAmountPage from "./pages/hoursAmountPage";
import NumberOfShiftsPage from "./pages/numberOfShiftsPage";
import ShiftPatternLengthPage from './pages/shiftPatternLengthPage';
import AnswersPage from "./pages/answersPage";


test(
    `Calculate Holiday Entitlement for a full leave year with annualised hours and other options`,
    async ({ page }): Promise<void> => {
        const landingPage: LandingPage = new LandingPage();
        await landingPage.checkPageLoads(page);
        await landingPage.continueOn(page);

        const irregularPage: IrregularPage = new IrregularPage();
        await irregularPage.checkPageLoads(page);
        await irregularPage.continueOn(page, "Yes");

        const irregularHoursAndPartYearPage: IrregularHoursAndPartYearPage = new IrregularHoursAndPartYearPage();
        await irregularHoursAndPartYearPage.checkPageLoads(page);
        await irregularHoursAndPartYearPage.continueOn(page, "05-08-1999");

        const irregularHoursAndPartYearBasedOnPage: IrregularHoursAndPartYearBasedOnPage = new IrregularHoursAndPartYearBasedOnPage();
        await irregularHoursAndPartYearBasedOnPage.checkPageLoads(page);
        await irregularHoursAndPartYearBasedOnPage.continueOn(page, "annualised hours");

        const irregularAnnualHoursPage: IrregularAnnualHoursPage = new IrregularAnnualHoursPage();
        await irregularAnnualHoursPage.checkPageLoads(page);
        await irregularAnnualHoursPage.continueOn(page, "for a full leave year");

        const expectedHoliday: string = "The statutory holiday entitlement is 5.6 weeks holiday."
        const answersPage: AnswersPage = new AnswersPage(expectedHoliday);
        await answersPage.checkPageLoads(page);    
    }
);


test(
    `Calculate Holiday Entitlement for someone starting and leaving part way through a leave year with shifts and other options`,
    async ({ page }): Promise<void> => {
        const landingPage: LandingPage = new LandingPage();
        await landingPage.checkPageLoads(page);
        await landingPage.continueOn(page);

        const irregularPage: IrregularPage = new IrregularPage();
        await irregularPage.checkPageLoads(page);
        await irregularPage.continueOn(page, "Yes");

        const irregularHoursAndPartYearPage: IrregularHoursAndPartYearPage = new IrregularHoursAndPartYearPage();
        await irregularHoursAndPartYearPage.checkPageLoads(page);
        await irregularHoursAndPartYearPage.continueOn(page, "05-08-1999");

        const irregularHoursAndPartYearBasedOnPage: IrregularHoursAndPartYearBasedOnPage = new IrregularHoursAndPartYearBasedOnPage();
        await irregularHoursAndPartYearBasedOnPage.checkPageLoads(page);
        await irregularHoursAndPartYearBasedOnPage.continueOn(page, "shifts");

        const irregularAnnualHoursPage: IrregularAnnualHoursShiftsPage = new IrregularAnnualHoursShiftsPage();
        await irregularAnnualHoursPage.checkPageLoads(page);
        await irregularAnnualHoursPage.continueOn(page, "for someone starting and leaving part way through a leave year");

        const employmentStartDate = "01-02-1998";
        const startingAndLeavingPage: StartingAndLeavingStartPage = new StartingAndLeavingStartPage();
        await startingAndLeavingPage.checkPageLoads(page);
        await startingAndLeavingPage.continueOn(page, employmentStartDate);

        const employmentEndDate = "12-12-1998";
        const startingAndLeavingEndPage: StartingAndLeavingEndPage = new StartingAndLeavingEndPage();
        await startingAndLeavingEndPage.checkPageLoads(page);
        await startingAndLeavingEndPage.continueOn(page,employmentEndDate);

        const hoursAmountPage: HoursAmountPage = new HoursAmountPage();
        await hoursAmountPage.checkPageLoads(page);
        await hoursAmountPage.continueOn(page, "8");

        const numberOfShiftsPage: NumberOfShiftsPage = new NumberOfShiftsPage();
        await numberOfShiftsPage.checkPageLoads(page);
        await numberOfShiftsPage.continueOn(page, "10");

        const shiftPatternLengthPage: ShiftPatternLengthPage = new ShiftPatternLengthPage();
        await shiftPatternLengthPage.checkPageLoads(page);
        await shiftPatternLengthPage.continueOn(page, "11");

        const expectedHoliday: string = "The statutory holiday entitlement is 24.17 shifts for the year. Each shift being 8.0 hours."
        const answersPage: AnswersPage = new AnswersPage(expectedHoliday);
        await answersPage.checkPageLoads(page);    
    }
);