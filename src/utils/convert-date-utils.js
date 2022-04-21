import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const formatDate = (outputPattern, inputPattern, dateToConvert) =>
  dayjs(dateToConvert, inputPattern).format(outputPattern);

const convertDateToUnixTimestamp = (dateToConvert, inputPattern) =>
  dayjs(dateToConvert, inputPattern).valueOf();

const convertToNativeDateObject = (dateToUse, inputPattern) =>
  dayjs(dateToUse, inputPattern).toDate();

export default {
  formatDate,
  convertDateToUnixTimestamp,
  convertToNativeDateObject,
};
