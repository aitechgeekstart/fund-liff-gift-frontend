"use client";
import ApplicationConfigProvider from "@/hooks/use-application-config";
import { AuthProvider } from "@/hooks/use-auth";
import { CircularProgress, Container } from "@mui/material";
import { Suspense, useEffect, useState } from "react";

export default function Layout({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <></>;
  }

  return (
    <ApplicationConfigProvider>
      <AuthProvider>
        <Container
          disableGutters // Removes default left and right padding
          sx={{
            maxWidth: "768px !important", // Ensures the fixed mobile-first layout limit is respected
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}
        >
          <Suspense fallback={<CircularProgress />}>{children}</Suspense>
        </Container>
      </AuthProvider>
    </ApplicationConfigProvider>
  );
}
