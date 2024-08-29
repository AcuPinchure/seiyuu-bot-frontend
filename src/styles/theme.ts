import { createTheme } from "@mui/material";

import "@fontsource/lexend/300.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/700.css";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#bc97e5",
          contrastText: "#fff",
        },
        secondary: {
          main: "#daefc0",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#5c0b69",
        },
        secondary: {
          main: "#3f8823",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "Lexend",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightMedium: 400,
    fontWeightRegular: 500,
    fontWeightBold: 700,
  },
});

export default theme;
