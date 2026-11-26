import { isNumber } from "lodash";

export const numberWithCommas = (
  number,
  precision = 0,
  removePaddedDecimalZero = false,
) => {
  if (!number && !isNumber(number)) {
    return "-";
  }
  if (precision) {
    number = parseFloat(number).toFixed(precision);
  }
  let result = parseFloat(number).toLocaleString("en-US", {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  });
  if (!removePaddedDecimalZero) {
    return result;
  }
  const splitted = result.split(".");
  if (splitted.length == 2) {
    const front = splitted[0];
    let back = splitted[1];
    if (Number(back) === 0) {
      return `${front}`;
    }
    back = String(parseInt(back.split("").reverse().join("")))
      .split("")
      .reverse()
      .join("");
    return `${front}.${back}`;
  }
  return result;
};
