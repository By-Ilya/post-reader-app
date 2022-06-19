import { EMPTY_STRING } from "Constants/constants";

export const isEmpty = (strValue: string | null | undefined): boolean =>
  strValue === null || strValue === undefined || strValue === EMPTY_STRING;

export const ascSortingFunc = (first: string, second: string): number => {
  if (first > second) {
    return 1;
  }
  if (first < second) {
    return -1;
  }

  return 0;
};

export const isStrContainPattern = (
  inputStr: string,
  searchPattern: string
): boolean => new RegExp(`\\b.*${searchPattern}.*\\b`, "gi").test(inputStr);
