import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useRef } from "react";

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    prop !== "sectionListRef" &&
    prop !== "areAllSectionsEmpty" &&
    prop !== "borderRadius",
})(({ theme }) => ({
  margin: 0,
  fontSize: "14px",
  textarea: {
    color: theme.palette.contrastText.default,
    padding: "3px 8px !important",
  },
  input: {
    color: theme.palette.contrastText.default,
    padding: "11px 10px !important",
  },
  ".Mui-disabled": {
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.grey[500],
  },
  ".MuiTextField": {
    "& .MuiFormHelperText-root": {
      backgroundColor: "unset",
    },
  },
  ".MuiInputBase-root": {
    padding: 0,
  },
}));

const CustomTextField = (props) => {
  let {
    size = "small",
    borderRadius = "6px",
    variant = "outlined",
    helperText,
    error,
    value = "",
    onChange,
    placeholder,
    disabled,
    type,
    ...others
  } = props;
  const ref = useRef();

  return (
    <StyledTextField
      ref={ref}
      size={size}
      variant={variant}
      borderRadius={borderRadius}
      value={value || ""}
      error={error}
      helperText={helperText}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      autoComplete="off"
      fullWidth
      {...others}
    />
  );
};

CustomTextField.propTypes = {
  // key is the name of the prop and value is the PropType
  size: PropTypes.string,
  borderRadius: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default CustomTextField;
