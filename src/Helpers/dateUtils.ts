const MONTH_NAMES: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getFullDateNumber = (dateNumber: number): string =>
  `0${dateNumber}`.slice(-2);

export const ascSortingFunc = (first: string, second: string): number =>
  new Date(first).getTime() - new Date(second).getTime();

export const descSortingFunc = (first: string, second: string): number =>
  new Date(second).getTime() - new Date(first).getTime();

export const formatDate = (dateStr: string): string => {
  const date: Date = new Date(dateStr);

  return `${MONTH_NAMES[date.getMonth()]} ${getFullDateNumber(
    date.getUTCDate()
  )}, ${date.getFullYear()} ${getFullDateNumber(
    date.getUTCHours()
  )}:${getFullDateNumber(date.getUTCMinutes())}:${getFullDateNumber(
    date.getUTCSeconds()
  )}`;
};
