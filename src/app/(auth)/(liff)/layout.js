"use client";
import { useAuth } from "@/hooks/use-auth";
import useEffectOnce from "@/hooks/use-effect-once";
import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const searchParams = useSearchParams();
  const liffState = searchParams.get("liff.state");
  const auth = useAuth();
  const { liffObject, setLiffObject, liffError, setLiffError } = auth;
  const router = useRouter();
  useEffectOnce(() => {
    import("@line/liff").then(({ liff }) => {
      liff
        .init({
          liffId: process.env.NEXT_PUBLIC_LIFF_ID,
          withLoginOnExternalBrowser: true,
        })
        .then(async () => {
          console.log("LIFF init succeeded.");
          setLiffObject(liff);
          auth.mutateLineUser();
          window.liff = liff;
        })
        .catch((error) => {
          console.log("LIFF init failed.", error);
          alert(error);
          setLiffError(error.toString());
        });
    });
  });

  useEffect(() => {
    if (!auth?.lineUser) return;
    const { pathname } = window.location;
    const firstRegistration = auth.lineUser.is_new_customer;
    if (firstRegistration) {
      if (!pathname.includes("first_registration")) {
        router.replace("/first_registration");
      }
    } else if (pathname === "/" || pathname.length <= 1) {
      const timer = setTimeout(() => {
        router.replace("/gifts");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [auth.lineUser, router]);

  if (!liffObject || !auth?.lineUser) {
    return (
      <Box sx={{ height: "100vh", position: "relative" }}>
        <Backdrop
          open={true}
          sx={{
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Light blur simulation overlay
            backdropFilter: "blur(2px)",
            color: "purple", // Custom grape-like color mapping for the loader text if needed
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* CircularProgress is the MUI equivalent of type="oval" spinner */}
            {/* 'purple' or a custom hex code replaces Mantine's 'grape' color */}
            <CircularProgress sx={{ color: "purple" }} size={40} />
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
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
  return <>{children}</>;
}
