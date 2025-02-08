import {
  AppBar,
  Box,
  Container,
  Icon,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
// import AdbIcon from "@mui/icons-material/Adb";
import { BeachAccess } from "@mui/icons-material";

export default function Navbar(props: any): React.JSX.Element {
  // Container Centers horizontally automatically and adds padding - responsive by default.
  // Box is a div with access to MUI's styling system - A good wrapper - No default padding
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Side of Navbar*/}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <BeachAccess fontSize="large" />
            Company Name
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
            <BeachAccess fontSize="large" />
            Company Name
            <BeachAccess fontSize="large" />
            Company Name
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
