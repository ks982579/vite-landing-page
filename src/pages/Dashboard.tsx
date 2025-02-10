import { getPassengersData, getTripsData } from "@/services/userdata";
import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, NavigateFunction } from "react-router";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Result, Ok, Err } from "@/types/result";
import { Passenger } from "@/types/passenger";
import { Trip } from "@/types/trip";
import { GenericResponseError } from "@/types";
import PassengersBox from "@/features/dashboard/components/PassengersBox";
import TripsBox from "@/features/dashboard/components/TripsBox";
import AuthProvider, {
  AuthContextType,
  AuthContext,
} from "@/context/AuthContext";

function Dashboard(): React.JSX.Element {
  // Check and Reroute to home screen
  // State of being loaded or not
  // And conditionally loaded... or not
  const navigate: NavigateFunction = useNavigate();
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

  // Check if they Have a cookie

  // TODO: Should be a protection thing
  useEffect(() => {
    // If not logged in, check the cookies
    if (!user.isLoggedIn) {
      if (!Cookies.get("accessToken")) {
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
        variant="h1"
        sx={{ my: 2, textAlign: "center", color: "secondary.main" }}
      >
        Your Info
      </Typography>
      <Typography variant="h2">Overview</Typography>
      <Box
        sx={{
          pt: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <PassengersBox />
        <TripsBox />
      </Box>
    </Container>
  );
}

export default Dashboard;
