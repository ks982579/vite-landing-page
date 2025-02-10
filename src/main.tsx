import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRouter from "./AppRouter.tsx";
import {
  createTheme,
  CssBaseline,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { green } from "@mui/material/colors";
import AuthProvider from "./context/AuthContext.tsx";

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
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
);
