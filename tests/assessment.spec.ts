import { test } from '@playwright/test';
import LandingPage from "./pages/landingPage";
import IrregularPage from "./pages/irregularPage";
import IrregularHoursAndPartYearPage from "./pages/irregularHoursAndPartYearPage";
import IrregularHoursAndPartYearBasedOnPage from "./pages/irregularHoursAndPartYearPageBasedOn";
import IrregularAnnualHoursPage from "./pages/irregularAnnualHoursPage";
import StartingAndLeavingStartPage from "./pages/startingAndLeavingStartPage";
import StartingAndLeavingEndPage from "./pages/startingAndLeavingEndPage";
import HoursAmountPage from "./pages/hoursAmountPage";
import NumberOfShiftsPage from "./pages/numberOfShiftsPage";
import ShiftPatternLengthPage from './pages/shiftPatternLengthPage';
import AnswersPage from "./pages/answersPage";
import IrregularHoursAnswersPage from "./pages/irregularHoursAnswersPage";


test(
    `Calculate Holiday Entitlement for a full leave year with annualised hours and other options`,
    async ({ page }): Promise<void> => {
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

        const leaveStartYear = "05-08-1999"
        const leaveStartYearSplit = leaveStartYear.split("-");

        const irregularHoursAndPartYearPage: IrregularHoursAndPartYearPage = new IrregularHoursAndPartYearPage();
        await irregularHoursAndPartYearPage.checkPageLoads(page);
        await irregularHoursAndPartYearPage.continueOn(page, leaveStartYearSplit[0], leaveStartYearSplit[1], leaveStartYearSplit[2]);

        const irregularHoursAndPartYearBasedOnPage: IrregularHoursAndPartYearBasedOnPage = new IrregularHoursAndPartYearBasedOnPage(leaveStartYear);
        await irregularHoursAndPartYearBasedOnPage.checkPageLoads(page);
        await irregularHoursAndPartYearBasedOnPage.continueOn(page, "shifts");

        const irregularAnnualHoursPage: IrregularAnnualHoursPage = new IrregularAnnualHoursPage(leaveStartYear);
        await irregularAnnualHoursPage.checkPageLoads(page);
        await irregularAnnualHoursPage.continueOn(page, "for someone starting and leaving part way through a leave year");

        const employmentStartDate = "01-02-1998";
        const employmentStartDateSplit = employmentStartDate.split("-");
        const startingAndLeavingPage: StartingAndLeavingStartPage = new StartingAndLeavingStartPage(leaveStartYear);
        await startingAndLeavingPage.checkPageLoads(page);
        await startingAndLeavingPage.continueOn(
            page,
            employmentStartDateSplit[0],
            employmentStartDateSplit[1],
            employmentStartDateSplit[2]
        );

        const employmentEndDate = "12-12-1998";
        const employmentEndDateSplit = employmentEndDate.split("-");
        const startingAndLeavingEndPage: StartingAndLeavingEndPage = new StartingAndLeavingEndPage(leaveStartYear, employmentStartDate);
        await startingAndLeavingEndPage.checkPageLoads(page);
        await startingAndLeavingEndPage.continueOn(
            page,
            employmentEndDateSplit[0],
            employmentEndDateSplit[1],
            employmentEndDateSplit[2]
        );

        const shiftHours = 8;
        const hoursAmountPage: HoursAmountPage = new HoursAmountPage(leaveStartYear, employmentStartDate, employmentEndDate);
        await hoursAmountPage.checkPageLoads(page);
        await hoursAmountPage.continueOn(page, shiftHours.toString());

        const numberOfShifts = 10;
        const numberOfShiftsPage: NumberOfShiftsPage = new NumberOfShiftsPage(leaveStartYear, employmentStartDate, employmentEndDate, shiftHours);
        await numberOfShiftsPage.checkPageLoads(page);
        await numberOfShiftsPage.continueOn(page, numberOfShifts.toString());

        const shiftPatternLength = 11;
        const shiftPatternLengthPage: ShiftPatternLengthPage = new ShiftPatternLengthPage(
            leaveStartYear,
            employmentStartDate,
            employmentEndDate,
            shiftHours,
            numberOfShifts
        );
        await shiftPatternLengthPage.checkPageLoads(page);
        await shiftPatternLengthPage.continueOn(page, shiftPatternLength.toString());

        const expectedHoliday: string = "The statutory holiday entitlement is 24.17 shifts for the year. Each shift being 8.0 hours."
        const answersPage: IrregularHoursAnswersPage = new IrregularHoursAnswersPage(
            leaveStartYear,
            expectedHoliday,
            employmentStartDate,
            employmentEndDate,
            shiftHours,
            numberOfShifts,
            shiftPatternLength
        );
        await answersPage.checkPageLoads(page);    
    }
);