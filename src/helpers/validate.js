import { dayjs } from "@/helpers";
import { filter, isEmpty } from "lodash";

export const validateEmail = (email) => {
  const regexEmail = /^[\w._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

  return regexEmail.test(email);
};

export const thaiNationalIDValidation = (id) => {
  if (id.length != 13) return false;
  // STEP 1 - get only first 12 digits
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    // STEP 2 - multiply each digit with each index (reverse)
    // STEP 3 - sum multiply value together
    sum += parseInt(id.charAt(i)) * (13 - i);
  }
  // STEP 4 - mod sum with 11
  let mod = sum % 11;
  // STEP 5 - subtract 11 with mod, then mod 10 to get unit
  let check = (11 - mod) % 10;
  // STEP 6 - if check is match the digit 13th is correct
  if (check == parseInt(id.charAt(12))) {
    return true;
  }
  return false;
};

const validateUrl = (url) => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    // Must have a domain with at least one dot
    if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(parsed.hostname)) return false;
    return true;
  } catch {
    return false;
  }
};

export const validateForm = (x, validateObj, formData) => {
  const t = (x) => x;
  let formError = {};
  validateObj.forEach((row) => {
    const type = row.type || "none";
    const value = ["number"].includes(type)
      ? formData[row.value]?.toString()
      : formData[row.value];
    const key = row.value;
    const label = row.label;

    // Always check for required fields first
    if (row.required && isEmpty(value)) {
      formError[key] = t("error.cannot_be_blank", { label: label });
      return; // No need to continue checking further if it's already invalid
    }

    if ((!type && !row.required) || (!!type && isEmpty(value))) {
      return;
    }

    switch (type) {
      case "url":
        if (!validateUrl(value)) {
          formError[key] = t("error.invalid_url_format");
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          formError[key] = t("error.invalid_email_format");
        }
        break;
      // case "thai_id":
      //   if (!thaiNationalIDValidation(value)) {
      //     formError[key] = t("error.invalid_thai_id_format");
      //   }
      //   break;
      case "date_range":
        // ใส่ key ของ start_date, end_date มาด้วย
        if (!formData[row.start_date]) {
          formError[key] = t("error.cannot_be_blank", {
            label: "Start Date",
          });
        } else if (!formData[row.end_date]) {
          formError[key] = t("error.cannot_be_blank", {
            label: "End Date",
          });
        } else if (
          dayjs(formData[row.end_date]) < dayjs(formData[row.start_date])
        ) {
          formError[key] = t("error.end_date_before_start_date", {
            start_date: row.start_date,
            end_date: row.end_date,
          });
        }
        break;
      case "lat_lng":
        if (!value.includes(",")) {
          formError[key] = t("error.invalid_lat_long_format");
        }
        break;
      case "file":
        if (filter(value, (item) => item.action !== "delete").length < 1) {
          formError[key] = t("error.cannot_be_blank", { label: label });
        }
        break;
      default:
        if (
          !!row.maximum &&
          parseFloat(String(value).replace(/,/g, "")) > row.maximum
        ) {
          formError[key] = t("error.cannot_be_greater_than", {
            label: label,
            maximum: row.maximum,
          });
        } else if (
          !!row.minimum &&
          parseFloat(String(value).replace(/,/g, "")) < row.minimum
        ) {
          formError[key] = t("error.cannot_be_less_than", {
            label: label,
            minimum: row.minimum,
          });
        } else if (!!row.digit_length && value.length !== row.digit_length) {
          formError[key] = t("error.is_equal_to", {
            label: label,
            length: row.digit_length,
          });
        } else if (!!row.minimum_digit && value.length < row.minimum_digit) {
          formError[key] = t("error.cannot_be_less_than_digits", {
            label: label,
            minimum: row.minimum_digit,
          });
        } else if (!!row.maximum_digit && value.length > row.maximum_digit) {
          formError[key] = t("error.cannot_be_greater_than_digits", {
            label: label,
            maximum: row.maximum_digit,
          });
        } else if (!!row.customFunction && row.customFunction(value)) {
          formError[key] = row.errorText;
        }
        break;
    }
  });
  return { formError: formError, error: Object.keys(formError).length < 1 };
};
