const _dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const isToday = require("dayjs/plugin/isToday");
const buddhistEra = require("dayjs/plugin/buddhistEra");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const localeData = require("dayjs/plugin/localeData");
const isBetween = require("dayjs/plugin/isBetween");
const arraySupport = require("dayjs/plugin/arraySupport");
require("dayjs/locale/th");
_dayjs.extend(arraySupport);
_dayjs.extend(localeData);
_dayjs.extend(utc);
_dayjs.extend(timezone);
_dayjs.extend(isToday);
_dayjs.extend(buddhistEra);
_dayjs.extend(customParseFormat);
_dayjs.extend(isBetween);

const dayjs = (...args) => {
  return _dayjs(...args).tz("Asia/Bangkok");
};
export default dayjs;
