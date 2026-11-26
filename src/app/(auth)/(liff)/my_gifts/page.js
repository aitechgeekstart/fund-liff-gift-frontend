"use client";
import { StatusLabel } from "@/components/Global";
import { useMyGifts } from "@/swr/use-gift-campaign-customers";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

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

const tabs = [
  { label: "All", value: "all" },
  { label: "Digital", value: "digital" },
  { label: "Via Post", value: "post" },
];

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("all");

  const { data: data, isValidating } = useMyGifts(true);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Box
          sx={{
            bgcolor: "#EAE9D9",
            borderRadius: "12px",
            p: 0.7,
            mb: 4,
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={(_, value) => setSelectedTab(value)}
            variant="fullWidth"
            TabIndicatorProps={{
              style: { display: "none" },
            }}
            sx={{
              minHeight: 40,
              "& .MuiTab-root": {
                minHeight: 40,
                borderRadius: "12px",
                color: "#706D5D",
                fontWeight: 600,
                textTransform: "none",
              },
              "& .Mui-selected": {
                bgcolor: "#FFFFFF",
                color: "#292820 !important",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
      </Grid>
      {data.map((row, index) => (
        <Grid size={12} key={index}>
          <Card
            key={row.id}
            elevation={0}
            sx={{
              borderRadius: "40px",
              bgcolor: "#FFFFFF",
              overflow: "hidden",
            }}
          >
            <CardContent
              sx={{
                p: 4,
                "&:last-child": {
                  pb: 4,
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={3}>
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  sx={{
                    width: "100%",
                    height: "auto !important",
                    backgroundColor: "#d8d8d8",
                    borderRadius: "5px",
                  }}
                >
                  <Image
                    src={row.images[0]?.url || "/images/image.png"}
                    alt="Banner"
                    width={150}
                    height={150}
                    priority
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Grid>

                {/* row Details */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontSize: 26,
                      fontWeight: 700,
                      color: "#292820",
                      mb: 1,
                    }}
                  >
                    {row.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontSize: 20,
                      color: "#777366",
                    }}
                  >
                    {row.description}
                  </Typography>
                </Box>

                {/* Status */}
                <StatusLabel label={row.status} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
