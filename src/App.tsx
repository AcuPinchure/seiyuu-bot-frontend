import { CssBaseline, ThemeProvider } from "@mui/material";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import Layout from "./components/Layout";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <InitColorSchemeScript attribute="class" />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
