import { CssBaseline, ThemeProvider } from "@mui/material";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import theme from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "@/pages/router";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InitColorSchemeScript attribute="class" />
      <SnackbarProvider />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
