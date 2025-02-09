import { getPassengersData, getTripsData } from "@/services/userdata";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, NavigateFunction } from "react-router";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Result, Ok, Err } from "@/types/result";
import { Passenger } from "@/types/passenger";
import { Trip } from "@/types/trip";
import { GenericResponseError } from "@/types";

function Dashboard(): React.JSX.Element {
  // Check and Reroute to home screen
  // State of being loaded or not
  // And conditionally loaded... or not
  const navigate: NavigateFunction = useNavigate();

  // TODO: Should be a protection thing
  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      navigate("/");
    } else {
      const passengerPromise: Promise<
        Result<AxiosResponse<Passenger>, AxiosError<GenericResponseError>>
      > = getPassengersData();
      const tripPromise: Promise<
        Result<AxiosResponse<Trip>, AxiosError<GenericResponseError>>
      > = getTripsData();
    }
  }, []);

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
        {["Passengers", "Trips"].map((ser) => (
          <Paper elevation={5} sx={{ width: { xs: 1 } }}>
            <Box sx={{ m: 2 }}>
              <Typography variant="h4">{ser}</Typography>
              <Typography sx={{ mt: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Button
                variant="text"
                // color="secondary"
                sx={{
                  // bgcolor: deepPurple[50],
                  textTransform: "capitalize",
                  borderRadius: 2,
                  ":hover": { bgcolor: deepPurple[100] },
                }}
              >
                More Info
              </Button>
            </Box>
          </Paper>
          // <Paper elevation={5}>
          //   <Box sx={{ m: 2 }}>
          //     <Typography variant="h4">Trips</Typography>
          //     <Typography sx={{ mt: 2 }}>
          //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          //       enim ad minim veniam, quis nostrud exercitation ullamco laboris
          //       nisi ut aliquip ex ea commodo consequat.
          //     </Typography>
          //   </Box>
          // </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default Dashboard;
