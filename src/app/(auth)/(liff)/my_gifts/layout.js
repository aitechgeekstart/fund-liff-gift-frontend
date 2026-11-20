"use client";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import CheckLayoutPermission from "/src/components/Global/CheckLayoutPermission";

export default function MenuLayout({ children }) {
  return (
    <CheckLayoutPermission
      permissions={["api/v2/liff/line_order_placements#create"]}
    >
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
              ซื้อหน่วยลงทุน (Subscription)
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ pb: 3, pt: 3 }}>{children}</Box>
      </Box>
    </CheckLayoutPermission>
  );
}
