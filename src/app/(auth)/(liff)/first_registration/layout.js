"use client";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
      }}
    >
      <Box>{children}</Box>
    </Box>
  );
}
