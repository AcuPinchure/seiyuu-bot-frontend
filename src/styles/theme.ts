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
        background: {
          default: "#f5f5f5",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#66a64e",
          contrastText: "#fff",
        },
        secondary: {
          main: "#230b4a",
        },
        background: {
          default: "#020202",
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
    h1: {
      fontSize: "3.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 48,
          height: 28,
          padding: 2,
          "& .MuiSwitch-switchBase": {
            padding: 4,
            color: "#9D9CA5",
            margin: 1,
            transitionDuration: "300ms",
            "&.Mui-checked": {
              transform: "translateX(19px)",
              color: theme.palette.success.dark,
              "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.success.light,
                opacity: 1,
                border: "1px solid #13566D",
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
              },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              color: "#33cf4d",
              border: "6px solid #f2f2f3",
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              opacity: 0.4,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.4,
            },
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 18,
            height: 18,
            boxShadow: "none",
          },
          "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.background.default,
            opacity: 1,
            transition: `background-color 500ms`,
            border: "1px solid #D2D1D6",
          },
        }),
      },
    },
  },
});

export default theme;
