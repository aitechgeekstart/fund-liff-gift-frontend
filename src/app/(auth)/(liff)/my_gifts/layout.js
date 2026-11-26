"use client";
import { CheckLayoutPermission, LegacyNextLink } from "@/components/Global";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function MenuLayout({ children }) {
  return (
    <CheckLayoutPermission permissions="no_permission">
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: (theme) => theme.palette.tertiary.light,
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
          <Toolbar>
            <LegacyNextLink href="/gifts">
              <ArrowBackIcon fontSize="large" sx={{ pr: 1 }} />
            </LegacyNextLink>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                color="tertiary"
                sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
              >
                My Gifts
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </CheckLayoutPermission>
  );
}
