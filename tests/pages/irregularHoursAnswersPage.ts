import AnswersPage from './answersPage';

class IrregularHoursAnswersPage extends AnswersPage{
    constructor(
        leaveDate: string,
        expectedAnswerIn: string,
        employmentStartDate: string,
        employmentEndDate: string,
        shiftLength: number,
        numberOfShifts: number,
        shiftPatternLengthDays: number
    ) {
        super(
            leaveDate,
            expectedAnswerIn
        );
        this.url = `https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/${leaveDate}/shift-worker/` + 
                   `starting-and-leaving/${employmentStartDate}/${employmentEndDate}/${shiftLength.toFixed(1)}/` + 
                   `${numberOfShifts}/${shiftPatternLengthDays.toFixed(1)}`
    }

}

export default IrregularHoursAnswersPage;