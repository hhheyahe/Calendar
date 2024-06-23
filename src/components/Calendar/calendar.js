import dayjs from "dayjs";

const DAYS_IN_WEEK = 7;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    Novermber: 10,
    December: 11
};

export function areEqual(a, b) {
    if (!a || !b) return false;

    return (
        // a.getFullYear() === b.getFullYear() &&
        // a.getMonth() === b.getMonth() &&
        // a.getDate() === b.getDate()
        a.year() === b.year() &&
        a.month() === b.month() &&
        a.date() === b.date()
    );
}

export function isLeapYear(year) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDayOfWeek(date) {
    // const dayOfWeek = date.getDay();
    const dayOfWeek = date.day();

    if (dayOfWeek === 0) return 6;

    return dayOfWeek - 1;
}

export function getDaysInMonth(date) {
    // const month = date.getMonth();
    // const year = date.getFullYear();
    const month = date.month();
    const year = date.year();
    const daysInMonth = DAYS_IN_MONTH[month];
    
    if (isLeapYear(year) && month === Month.February) {
        return daysInMonth + 1;
    } else {
        return daysInMonth;
    }
}

export function getMonthData(year, month) {
    const result = [];
    // const date = new Date(year, month);
    const date = dayjs().year(year).month(month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let i = 0; i < (daysInMonth + monthStartsOn / DAYS_IN_WEEK); i++) {
        result[i] = [];

        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                // result[i][j] = new Date(year, month, day++);
                result[i][j] = dayjs().year(year).month(month).date(day++);
            }
        }
    }

    return result;
}