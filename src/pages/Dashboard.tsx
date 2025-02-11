import React, { useContext, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router";
import { Box, Container, Typography } from "@mui/material";
import PassengersBox from "@/features/dashboard/components/PassengersBox";
import TripsBox from "@/features/dashboard/components/TripsBox";
import { AuthContextType, AuthContext } from "@/context/AuthContext";
import DataBox from "@/features/dashboard/components/DataBox";
import { getPassengersData, getTripsData } from "@/services/userdata";

function Dashboard(): React.JSX.Element {
  // Check and Reroute to home screen
  // State of being loaded or not
  // And conditionally loaded... or not
  const navigate: NavigateFunction = useNavigate();
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

  // TODO: Should be a protection thing
  useEffect(() => {
    // If not logged in, check the cookies
    if (!user.isLoggedIn) {
      if (!localStorage.getItem("accessToken")) {
        navigate("/");
      } else {
        user.login();
      }
    }
  }, [user.isLoggedIn]);

  // Probably also center horizontally on screen or something
  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          my: 1,
          textAlign: "start",
          color: "primary.main",
          fontWeight: { xs: 600, sm: 800 },
        }}
      >
        Your Travel Plans
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Review and track your flights
      </Typography>
      <Box
        sx={{
          pt: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <DataBox apiRequest={getTripsData} title="Trips">
          <TripsBox />
        </DataBox>
        <DataBox apiRequest={getPassengersData} title="Passengers">
          <PassengersBox />
        </DataBox>
      </Box>
    </Container>
  );
}

export default Dashboard;
