"use client";
import { useMyAvailable } from "@/swr/use-gift-campaign-customers";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";

function GiftVoucherCard(props) {
  const { image, title, detail, expireDate } = props;
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: "#FFFFFF",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Gift Image */}
      <Box
        sx={{
          width: 90,
          height: 90,
          flexShrink: 0,
          border: "2px solid #333",
          borderRadius: 1.5,
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={image || "/images/image.png"}
          alt="Gift"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Gift Detail */}
      <Grid container spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
        <Grid size={12}>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid size={12} sx={{ lineHeight: "0.5rem" }}>
          <Typography variant="caption" color="primary">
            {detail}
          </Typography>
        </Grid>
        <Grid size={12} sx={{ mt: 1 }}>
          <Typography variant="caption" color="primary">
            {`Accept by ${expireDate}`}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default function Page() {
  const { data: data, isValidating: loading } = useMyAvailable(true);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
          These gifts have been assigned to you. Accept each one to receive it.
        </Typography>
      </Grid>
      {data.map((row, index) => (
        <Grid size={12} key={index}>
          <GiftVoucherCard
            title={row.campaign.name}
            detail={row.campaign.description}
            expireDate={row.campaign.gift_valid_until}
            image={row.campaign.images[0]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
