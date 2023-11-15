export default function daysBeforeDate(targetDateStr, formatStr = 'YYYY-MM-DD') {
    /**
     * Calculate the number of days from today until the target date.
     *
     * @param {string} targetDateStr - The target date as a string.
     * @param {string} formatStr - The format of the target date string (default is 'YYYY-MM-DD').
     *
     * @returns {number} Number of days from today until the target date. If the target date is in the past, it returns a negative number.
     */

    const currentDate = new Date();
    const targetDate = new Date(targetDateStr);

    const differenceInTime = targetDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
}

// Example usage
const targetDate = '2023-12-25'; // for example, Christmas 2023
const daysUntilTarget = daysBeforeDate(targetDate);
console.log(`Days until ${targetDate}: ${daysUntilTarget}`);
