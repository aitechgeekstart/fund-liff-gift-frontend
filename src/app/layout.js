import MUIThemeProvider from "@/components/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Noto_Sans, Noto_Sans_Thai } from "next/font/google";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  weight: ["400", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "PINE",
  description: "",
  appleWebApp: {
    title: "PINE",
  },
  icons: {
    icon: [
      {
        url: "/icons/favicons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      { url: "/icons/favicons/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icons/favicons/favicon.ico",
    apple: [
      {
        url: "/icons/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/icons/favicons/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${notoSansThai.variable}`}
        style={{ backgroundColor: "#edebeb", margin: 0 }}
      >
        <MUIThemeProvider>{children}</MUIThemeProvider>

        {process.env.APP_ENV === "prod" && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
