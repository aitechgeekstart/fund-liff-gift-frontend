import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { upperCase } from "lodash";

const StyledChip = styled((props) => <Chip {...props} />)((props) => ({
  ...(props.fullwidth === "true" && {
    width: "100%",
    textAlign: "center",
  }),
}));

export default function StatusLabel(props) {
  const {
    label,
    color,
    text,
    justifyContent = "center",
    fullWidth = false,
    ...others
  } = props;
  const statusText = () => {
    if (!!text) {
      return text;
    } else {
      return upperCase(label);
    }
  };
  const statusColor = () => {
    switch (label?.toLowerCase()) {
      case "active":
      case "approved":
      case "confirmed":
      case "complete":
        return "success";
      case "pending":
      case "waiting":
        return "warning";
      case "completed":
      case "submitted_to_fund_connext":
        return "primary";
      case "inactive":
      case "deleted":
      case "cancelled":
      case "rejected":
      case "error_from_fund_connext":
        return "error";
      case "draft":
      case "created":
      case "disapproved":
        return "grey";
      default:
        return color;
    }
  };
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        ...(fullWidth && {
          width: "100%",
          textAlign: "center",
          justifyContent: justifyContent,
        }),
      }}
    >
      <StyledChip
        label={statusText()}
        color={statusColor()}
        size="small"
        fullwidth={fullWidth.toString()}
        {...others}
      />
    </Stack>
  );
}
