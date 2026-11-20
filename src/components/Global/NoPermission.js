import { Container, Typography } from "@mui/material";
import Image from "next/image";
import { LoadingScreen } from "/src/components/Global";

export default function NoPermission(props) {
  const { loading } = props;
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        px: 3,
        gap: 1,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src="/images/lock.png"
        width="150"
        height="150"
        alt=""
        style={{ color: "red" }}
      />
      <Typography
        gutterBottom
        variant="h5"
        align="center"
        sx={{ color: "red" }}
      >
        You do not have permission to view this page.
      </Typography>
      <Typography gutterBottom variant="h6" align="center">
        Please contact your system administrator.
      </Typography>
    </Container>
  );
}
