import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

import PropTypes from "prop-types";
import { useState } from "react";

const CustomDatePicker = ({
  disabled,
  label,
  placeholder,
  error,
  onRemove,
  value,
  inputProps,
  isClearable = true,
  format = "DD MMM YYYY",
  ...others
}) => {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          others.onChange?.(
            newValue && newValue.isValid()
              ? newValue.format("YYYY-MM-DD")
              : null,
          );
        }}
        format={format}
        disabled={disabled}
        closeOnSelect
        slotProps={{
          textField: {
            label,
            placeholder,
            error: !!error,
            helperText: error,
            fullWidth: true,

            sx: {
              margin: 0,
              fontSize: "14px",
              textarea: {
                color: "#3D3D3D",
                padding: "3px 8px !important",
              },
              input: {
                color: "#3D3D3D",
                padding: "11px 10px !important",
              },
              ".Mui-disabled": {
                backgroundColor: "#F5F5F5",
                borderColor: "#9E9E9E",
              },
              ".MuiTextField": {
                "& .MuiFormHelperText-root": {
                  backgroundColor: "unset",
                },
              },
              ".MuiInputBase-root": {
                padding: 0,
              },
              ".MuiPickersSectionList-root": {
                padding: "11px 0",
              },
            },

            onClick: () => setOpen(true),

            InputProps: {
              endAdornment:
                isClearable && value && onRemove ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      disabled={disabled}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove();
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
            },

            ...inputProps,
          },

          field: {
            clearable: Boolean(value && onRemove),
            onClear: onRemove,
          },

          actionBar: {
            actions: [],
          },
        }}
        {...others}
      />
    </LocalizationProvider>
  );
};

CustomDatePicker.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.any,
  onRemove: PropTypes.func,
  inputProps: PropTypes.object,
  isClearable: PropTypes.bool,
};

export default CustomDatePicker;
