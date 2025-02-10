import {
  AppBar,
  Box,
  Chip,
  Container,
  Icon,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
// import AdbIcon from "@mui/icons-material/Adb";
import { BeachAccess, Logout } from "@mui/icons-material";
import { AuthContextType, AuthContext } from "@/context/AuthContext";

export default function Navbar(props: any): React.JSX.Element {
  // Container Centers horizontally automatically and adds padding - responsive by default.
  // Box is a div with access to MUI's styling system - A good wrapper - No default padding
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

  const clickLogout = () => {
    user.logout();
  };

  return (
    <AppBar position="static" sx={{ borderRadius: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Side of Navbar*/}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <BeachAccess fontSize="large" />
            Company Name
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
            {user.isLoggedIn && (
              <Chip
                icon={<Logout />}
                label="Logout"
                variant="filled"
                color="secondary"
                onClick={clickLogout}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // <List component="nav">
    //   <ListItem component="div">
    //     <ListItemText inset>
    //       <Typography color="primary" variant="h3">
    //         Company Name
    //       </Typography>
    //     </ListItemText>
    //   </ListItem>
    // </List>
  );
}
