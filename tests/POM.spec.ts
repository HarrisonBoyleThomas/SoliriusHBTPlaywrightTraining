import { test, expect } from '@playwright/test';
import LandingPage from "./pages/landingPage";
import IrregularPage from "./pages/irregularPage";
import EntitlementPage from "./pages/entitlementPage";
import WorkOutHolidayPage from "./pages/workOutHolidayPage";

test(`Page object model happy path for second test`, async ({ page }): Promise<void> => {
    const landingPage: LandingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await landingPage.continueOn(page);
});


test(`Calculate Holiday Entitlement for Full Year new`, async ({ page }): Promise<void> => {
    const irregularPage: IrregularPage = new IrregularPage();
    await irregularPage.checkPageLoads(page);
    await irregularPage.continueOn(page, "No");

    const entitlementPage: EntitlementPage = new EntitlementPage();
    await entitlementPage.checkPageLoads(page);
    await entitlementPage.continueOn(page, "days worked per week");

    const workOutHolidayPage: WorkOutHolidayPage = new WorkOutHolidayPage();
    await workOutHolidayPage.checkPageLoads(page);
    await workOutHolidayPage.continueOn(page, "for a full leave year");
})