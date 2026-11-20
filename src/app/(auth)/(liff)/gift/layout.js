"use client";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function MenuLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
      }}
    >
      {/* Top Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          boxShadow: "none",
          py: 0.5,
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#FFF", fontWeight: "bold", fontSize: "1.25rem" }}
          >
            Menu
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ pb: 3, pt: 3 }}>{children}</Box>
    </Box>
  );
}
