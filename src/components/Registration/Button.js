import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled((props) => (
  <Button {...props} size="small" fullWidth />
))(() => ({
  borderRadius: "5px",
  padding: "5px 60px",
  fontSize: 18,
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
}));

export default function GkCustomButton(props) {
  let { canShow = true, ...others } = props;

  if (!canShow) {
    return <></>;
  }

  return <CustomButton {...others} />;
}
