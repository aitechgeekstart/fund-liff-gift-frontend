"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const primary = {
  main: "#7f825a",
  contrastText: "#fdf7dd",
};

const secondary = {
  main: "#9c8a68",
  light: "#9d8a68",
  dark: "#7d6e53",
  contrastText: "#fff",
};

const tertiary = {
  main: "#fdf7dd",
  dark: "#8d7c5d",
  light: "#f4f4f0",
};

const yellow = {
  main: "#c9b906",
  light: "#FEF8DE",
};

const grey = {
  main: "#616161",
  light: "#A3A3A3",
  lightlow: "#aeaeae",
  contrastText: "#fff",
};

const white = {
  main: "#ffff",
};

const theme = createTheme({
  palette: {
    primary,
    secondary,
    tertiary,
    yellow,
    grey,
    white,
    contrastText: {
      default: "#3D3D3D",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: "var(--font-noto-sans-thai), var(--font-noto-sans), sans-serif",
    htmlFontSize: 16,
    body1: { fontSize: "16px" },
    body2: { fontSize: "14px" },
    caption: { fontSize: "10px" },
  },
  spacing: (factor) => {
    const spacingMap = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
    return spacingMap[factor] ?? factor * 8;
  },
  components: {
    MuiButton: { defaultProps: { size: "small" } },
    MuiTextField: { defaultProps: { size: "small" } },
    MuiSelect: { defaultProps: { size: "small" } },
    MuiTable: { defaultProps: { size: "small" } },
    MuiIconButton: { defaultProps: { size: "small" } },
    MuiChip: { defaultProps: { size: "small" } },
    MuiPagination: { defaultProps: { size: "small" } },
  },
});

export default function MUIThemeProvider({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
