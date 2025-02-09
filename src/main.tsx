import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import {
  createTheme,
  CssBaseline,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { green } from "@mui/material/colors";

function PageNotFound404(): React.JSX.Element {
  // Check and Reroute to home screen
  return (
    <div>
      <h1>404 Page Not Found</h1>
    </div>
  );
}

// https://zenoo.github.io/mui-theme-creator/
const normalThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: green[600],
    },
    // secondary: {
    //   main: "#f50057",
    // },
    background: {
      default: "#AAAAAA",
      paper: "#FAFAFA",
    },
  },
  typography: {
    h1: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
  },
};
const normalTheme: Theme = createTheme(normalThemeOptions);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={normalTheme}>
      <CssBaseline>
        <BrowserRouter>
          {/* Probably move to App? */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound404 />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
);
