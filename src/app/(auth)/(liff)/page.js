"use client";
import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Backdrop
        open={true}
        sx={{
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* CircularProgress acts as the 'oval' spinner, utilizing custom styling */}
          <CircularProgress sx={{ color: "#9e805e" }} size={40} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "#333",
            }}
          >
            กำลังรอ LINE Login หากหน้าจอค้าง <br />
            กรุณาปิดแล้วกดเปิดใหม่อีกครั้ง...
          </Typography>
        </Stack>
      </Backdrop>
    </Box>
  );
}
