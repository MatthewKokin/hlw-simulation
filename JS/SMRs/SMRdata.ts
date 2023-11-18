import { addYears, differenceInCalendarDays, format } from 'date-fns';

interface SMR {
    name: string;
    capacity: number;
    days_before_closing: number;
    isOperational: boolean;
    construction_done: number;
    isBuilding: boolean;
    type: string;
    isStartedbuilding: boolean;
    startedBuildingIn: number;
    stringDate: string;
}

function calculateConstructionStarts(startYear: number, endYear: number, totalSMRs: number, constructionTime: number): Date[] {
    const startDates: Date[] = [];
    for (let i = 0; i < totalSMRs; i++) {
        const yearInterval = Math.floor((endYear - startYear) / totalSMRs);
        const start = addYears(new Date(startYear, 0, 1), i * yearInterval);
        if (start.getFullYear() + constructionTime <= endYear) {
            startDates.push(start);
        }
    }
    return startDates;
}

function generateSMRJson(startDates: Date[]): SMR[] {
    const today = new Date();
    return startDates.map((startDate, index) => {
        const startInDays = differenceInCalendarDays(startDate, today);
        return {
            name: `SMR-${index + 1}`,
            capacity: 0.470,
            days_before_closing: 65 * 365,
            isOperational: false,
            construction_done: 4 * 365,
            isBuilding: false,
            type: "PWR",
            isStartedbuilding: startInDays <= 0,
            startedBuildingIn: startInDays,
            stringDate: format(startDate, 'dd-MM-yyyy')
        };
    });
}

// Example usage
const startDates = calculateConstructionStarts(2024, 2050, 38, 4);
const smrJsonData = generateSMRJson(startDates);
console.log(JSON.stringify(smrJsonData, null, 4));
