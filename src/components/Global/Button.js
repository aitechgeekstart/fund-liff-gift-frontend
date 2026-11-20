import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const StyledButton = styled((props) => (
  <Button {...props} size="small" fullWidth />
))(() => ({
  fontSize: "14px",
  textTransform: "none",
  minHeight: "33px",
  padding: "9px",
}));

const CustomButton = (props) => {
  const {
    canShow = true,
    color = "primary",
    size = "small",
    variant = "contained",
    loadingPosition = "start",
    ...others
  } = props;
  if (!canShow) {
    return <div></div>;
  }
  return (
    <StyledButton
      color={color}
      size={size}
      variant={variant}
      loadingPosition={loadingPosition}
      {...others}
    />
  );
};

CustomButton.propTypes = {
  // key is the name of the prop and value is the PropType
  canShow: PropTypes.bool,
  color: PropTypes.string,
  loadingPosition: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default CustomButton;
