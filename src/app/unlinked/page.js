"use client";
import { Button } from "@/components/Global";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Container, Stack, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          textAlign: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TaskAltIcon fontSize="large" color="success" />
          <Typography variant="h5" color="success">
            Unlinked
          </Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ mt: "30px", alignItems: "center", justifyContent: "center" }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => liff.closeWindow()}
          >
            Close
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
