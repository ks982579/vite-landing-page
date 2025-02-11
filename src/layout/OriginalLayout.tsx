import React from "react";
import {
  createTheme,
  CssBaseline,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { green } from "@mui/material/colors";
import Navbar from "@/components/Navbar.tsx";

// https://zenoo.github.io/mui-theme-creator/
const normalThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: green[600],
    },
    background: {
      default: "#CBCBCB",
      paper: "#E5EAEA",
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

const OriginalLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={normalTheme}>
      <CssBaseline>
        <Navbar />
        {children}
      </CssBaseline>
    </ThemeProvider>
  );
};

export default OriginalLayout;
