import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen(props) {
  const { height } = props;
  return (
    <Box
      sx={{
        width: "100%",
        height: height || "80vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          margin: 0,
          position: "absolute",
          top: "50%",
          left: "calc(50% - 20px)",
          msTransform: "translateY(-50%)",
          transform: "translateY(-50%)",
        }}
      >
        <CircularProgress disableShrink />
      </Box>
    </Box>
  );
}
