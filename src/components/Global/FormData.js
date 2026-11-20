import { FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomFormData = styled((props) => <FormLabel {...props} />)(() => ({
  margin: 0,
  lineHeight: "1.2rem",
  marginRight: "5px",
  color: "#3D3D3D",
  overflowWrap: "break-word",
  "&.MuiFormLabel-root:empty:before": {
    content: '"-"',
  },
}));

export default function GkCustomFormData(props) {
  return <CustomFormData {...props} />;
}
