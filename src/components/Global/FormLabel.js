import { FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const StyledFormLabel = styled((props) => <FormLabel {...props} />)(
  (props) => ({
    fontWeight: "bold",
    margin: 0,
    lineHeight: "1.2rem",
    marginRight: "5px",
    color: !!props.color ? props.theme.palette[props.color].main : "#9e805e",
    ".MuiFormLabel-asterisk": {
      color: "red",
    },
  }),
);

const CustomFormLabel = (props) => {
  const { color, fontWeight = 800, ...others } = props;

  return <StyledFormLabel color={color} fontWeight={fontWeight} {...others} />;
};

CustomFormLabel.propTypes = {
  // key is the name of the prop and value is the PropType
  color: PropTypes.string,
  colon: PropTypes.bool,
  fontWeight: PropTypes.number,
};

export default CustomFormLabel;
