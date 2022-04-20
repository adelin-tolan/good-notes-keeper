import DatePatterns from "../constants/date-patterns";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat);

const convertApiDateToYearMonthDayPattern = function(dateToConvert) {
  return dayjs(dateToConvert, DatePatterns.API_DATE_PATTERN).format(
                    DatePatterns.YEAR_MONTH_DAY_PATTERN);       
}

const convertApiDateTimeToNoteDateTimePattern = function(dateToConvert) {
  return dayjs(dateToConvert, DatePatterns.API_DATE_TIME_PATTERN).format(
      DatePatterns.NOTE_ITEM_DATE_TIME_PATTERN);
}

const formatCurrentDateInApiDateTimePattern = function() {
    return dayjs().format(DatePatterns.API_DATE_TIME_PATTERN);
}

const convertDateFromYearMonthDayPatternToUnixTimestamp = function(dateToConvert) {
    return dayjs(dateToConvert, DatePatterns.YEAR_MONTH_DAY_PATTERN).valueOf();
} 

const convertDayjsToNativeDateObject = function(dateToUse) {
    return dayjs(dateToUse, DatePatterns.YEAR_MONTH_DAY_PATTERN).toDate();
}

export default {
    convertApiDateToYearMonthDayPattern,
    convertApiDateTimeToNoteDateTimePattern,
    formatCurrentDateInApiDateTimePattern,
    convertDateFromYearMonthDayPatternToUnixTimestamp,
    convertDayjsToNativeDateObject,
}


