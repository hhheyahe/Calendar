import dayjs from "dayjs";
import "dayjs/locale/be";
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

const DAYS_IN_WEEK = 7;

export function areEqual(a, b) {
  if (!a || !b) return false;

  return (
    a.year() === b.year() &&
    a.month() === b.month() &&
    a.date() === b.date()
  );
}

export function isLeapYear(year) {
  return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDayOfWeek(date) {
  return date.weekday();
}

export function getMonthData(year, month) {
  const result = [];
  const date = dayjs().locale('be').year(year).month(month);
  const daysInMonth = date.daysInMonth();
  const monthStartsOn = getDayOfWeek(date.date(1));
  let day = 1;

  for (let i = 0; day <= daysInMonth; i++) {
    result[i] = [];
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = dayjs().locale('be').year(year).month(month).date(day++);
      }
    }
  }

  if (result.length && result[result.length - 1].every(day => day === undefined)) {
    result.pop();
  }

  return result;
}