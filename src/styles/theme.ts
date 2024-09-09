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
          main: "#fae3cf",
        },
        background: {
          default: "#f5f5f5",
        },
        success: {
          main: "#37c44f",
          contrastText: "#fff",
        },
        error: {
          main: "#f76157",
          contrastText: "#fff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#f5b47f",
          contrastText: "#000",
        },
        secondary: {
          main: "#34116b",
        },
        background: {
          default: "#020202",
        },
        success: {
          main: "#37c44f",
          contrastText: "#fff",
        },
        error: {
          main: "#f76157",
          contrastText: "#fff",
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
            color: theme.palette.secondary.contrastText,
            margin: 1,
            transitionDuration: "300ms",
            "&.Mui-checked": {
              transform: "translateX(19px)",
              color: theme.palette.secondary.contrastText,
              "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.success.light,
                opacity: 1,
                border: `1px solid ${theme.palette.secondary.contrastText}`,
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
              },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
              color: "#33cf4d",
              border: `1px solid ${theme.palette.secondary.contrastText}`,
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
            border: `1px solid ${theme.palette.secondary.contrastText}`,
          },
        }),
      },
    },
  },
});

export default theme;
