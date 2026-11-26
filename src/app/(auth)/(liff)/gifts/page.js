"use client";
import { LegacyNextLink } from "@/components/Global";
import { Box, Grid, Typography } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="body" color="tertiary" sx={{ fontWeight: "bold" }}>
          GIFTS
        </Typography>
      </Grid>
      <Grid size={6}>
        <LegacyNextLink href="available_gifts">
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              borderRadius: "6px",
              padding: "15px",
              height: "150px",
              cursor: "pointer",
            }}
          >
            <Grid container spacing={0.5} sx={{ alignItems: "center" }}>
              <Grid size={9}>
                <Typography
                  variant="body"
                  color="tertiary"
                  sx={{ fontWeight: "bold" }}
                >
                  Accept Gift
                </Typography>
              </Grid>
              <Grid size={3}>
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.tertiary.main,
                    color: (theme) => theme.palette.secondary.main,
                    borderRadius: "5px",
                    padding: "3px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  <Typography variant="body" color="primary">
                    12
                  </Typography>
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography variant="caption" color="tertiary">
                  Gifts for you
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </LegacyNextLink>
      </Grid>
      <Grid size={6}>
        <LegacyNextLink href="my_gifts">
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.tertiary.main,
              borderRadius: "6px",
              padding: "15px",
              height: "150px",
            }}
          >
            <Grid container spacing={0.5} sx={{ alignItems: "center" }}>
              <Grid size={9}>
                <Typography
                  variant="body"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  My Gift
                </Typography>
              </Grid>
              <Grid size={3}>
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.tertiary.main,
                    borderRadius: "5px",
                    padding: "3px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  <Typography variant="body" color="tertiary">
                    12
                  </Typography>
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography variant="caption" color="primary">
                  Vouchers & Deliveries
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </LegacyNextLink>
      </Grid>
    </Grid>
  );
}
