import { CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCardHeader = styled((props) => <CardHeader {...props} />)(
  ({ theme }) => ({
    background: theme.palette.yellow.light,
    color: theme.palette.primary.main,
    padding: "10px 10px 10px 25px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    borderBottom: "1px solid #EEE",
    "& .MuiCardHeader-root": {
      fontWeight: 600,
    },
    "& .MuiCardHeader-action": {
      padding: "0 15px 0 0",
    },
    "& .MuiTypography-root": {
      fontSize: "18px",
      fontWeight: 600,
    },
    "& .MuiCardHeader-content": {
      width: "100%",
    },
    ".MuiGrid-item": {
      alignSelf: "center",
    },
  }),
);

export default function CustomCardHeader(props) {
  const { customTitle, title, actionWidth, ...others } = props;
  const renderTitle = () => {
    if (!!customTitle) {
      return customTitle;
    }
    if (!title) {
      return "";
    }
    return title;
    // return startCase(title.toLowerCase());
  };

  const styleCardAction = {
    "& .MuiCardHeader-action": {
      width: actionWidth,
    },
  };

  return (
    <StyledCardHeader title={renderTitle()} sx={styleCardAction} {...others} />
  );
}
