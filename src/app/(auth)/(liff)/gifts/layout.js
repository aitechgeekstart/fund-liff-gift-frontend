"use client";
import { useAuth } from "@/hooks/use-auth";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import NextImage from "next/image";

export default function MenuLayout({ children }) {
  const auth = useAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      {/* Top Navbar */}
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          py: 0.5,
        }}
      >
        <Toolbar>
          <Grid container sx={{ width: "100%", alignItems: "center" }}>
            <Grid size={8}>
              <Typography variant="body" sx={{ color: "#FFF" }}>
                Your gifts, with our thanks,
              </Typography>
              <br />
              <Typography
                variant="body"
                sx={{ color: "#FFF", fontWeight: "bold" }}
              >
                {auth.lineUser.customer.first_name_en}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <NextImage
                src={"/images/logo.png"}
                alt="Logo Image"
                height={100}
                width={100}
                objectFit="contain"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
}
