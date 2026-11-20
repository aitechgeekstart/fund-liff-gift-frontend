import dayjs from "@/helpers/dayjs";

const date = {
  getDateString: function (key, format = "YYYY-MM-DD") {
    if (!this[key]) return "";
    return dayjs(this[key]).format(format);
  },
  getDateTimeString: function (key, format = "YYYY-MM-DD HH:mm:ss") {
    if (!this[key]) return "";
    return dayjs(this[key]).format(format);
  },
};

export default date;
