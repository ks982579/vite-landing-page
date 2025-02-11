import { Trip, TripList } from "@/types/trip";
import { useContext, useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  ListItem,
  Chip,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Collapse,
  CircularProgress,
  List,
  LinearProgress,
} from "@mui/material";
import { getTripsData } from "@/services/userdata";
import { Result, GenericResponseError } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import { AuthContextType, AuthContext } from "@/context/AuthContext";
import {
  AccountBox,
  CalendarToday,
  FlightLand,
  FlightTakeoff,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

interface TripItemProps {
  data: Trip;
}

const TripItem: React.FC<TripItemProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  // Earliest Departure Date
  const departureDate = data.flights?.sort((a, b) => {
    const timeA = Date.parse(a.embarkDate);
    const timeB = Date.parse(b.embarkDate);
    return timeA - timeB;
  })[0]?.embarkDate;

  const formattedDate = departureDate
    ? new Date(departureDate).toDateString()
    : "No Date";

  return (
    <Paper elevation={2} sx={{ m: 1 }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen((p) => !p)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "black" }}>
                  <FlightTakeoff sx={{ bgcolor: "white", color: "black" }} />
                </Avatar>
              </ListItemAvatar>
              {/* Using span because cannot nest in p-tags */}
              <ListItemText
                primary={
                  <Typography variant="subtitle1" component="span">
                    {data.flights[0]?.originAirport} to{" "}
                    {data.flights[0]?.destinationAirport}
                  </Typography>
                }
                secondary={
                  <Box
                    component="span"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <CalendarToday fontSize="small" />
                    <Typography component="span" variant="body2">
                      {formattedDate}
                    </Typography>
                  </Box>
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "end",
              }}
            >
              <Chip
                label={`${data.flights.length} flight(s)`}
                size="small"
                color="primary"
              />
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 3, pr: 2, pb: 2 }}>
          {data.passengers && data.passengers.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="primary">
                Trip Passengers:
              </Typography>
              {data.passengers.map((person) => (
                <Box
                  key={person.passengerId}
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <AccountBox fontSize="small" />
                  <Typography variant="body2">
                    {person.title ?? ""}
                    {person.title && " "}
                    {person.name ?? ""}
                    {person.name && " "}
                    {person.surname ?? ""}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          {data.flights &&
            data.flights.map((flight, index) => (
              <Box key={flight.flightId} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="primary">
                  Flight {index + 1}: {flight.flightNumber}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <FlightTakeoff fontSize="small" />
                  <Typography variant="body2">
                    {flight.originAirport} ({flight.origin}) -{" "}
                    {new Date(flight.embarkDate).toTimeString()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FlightLand fontSize="small" />
                  <Typography variant="body2">
                    {flight.destinationAirport} ({flight.destination}) -{" "}
                    {new Date(flight.arrivalDate).toTimeString()}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

interface TripsBoxProps {
  data?: {
    trips: Array<Trip> | null;
  };
}

// Use the <DataBox/> Component to pass data to here
export default function TripsBox({ data }: TripsBoxProps): React.JSX.Element {
  // const [trips, setTrips] = useState<Array<Trip> | null>(null);
  const trips = data?.trips;
  // const [isLoading, setIsLoading] = useState(true);
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

  // useEffect(() => {
  //   const controller = new AbortController();
  //   if (user.isLoggedIn) {
  //     (async () => {
  //       const tripRes: Result<
  //         AxiosResponse<TripList>,
  //         AxiosError<GenericResponseError>
  //       > = await getTripsData(controller.signal);
  //
  //       switch (tripRes.type) {
  //         case "ok":
  //           setTrips(tripRes.value.data.trips);
  //           break;
  //         case "err":
  //           if (tripRes.error.status === 401) {
  //             user.logout();
  //           } // else display error
  //           break;
  //       }
  //       setIsLoading(false);
  //     })();
  //   }
  //   return () => controller.abort();
  // }, [user.isLoggedIn]);

  return trips && trips.length > 0 ? (
    <List disablePadding>
      {trips &&
        trips.map((trip) => {
          return <TripItem data={trip} key={trip.tripId} />;
        })}
    </List>
  ) : (
    <Paper elevation={2} sx={{ m: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          m: 1,
          px: 2,
          py: 3,
        }}
      >
        <AccountBox fontSize="large" />
        <Typography variant="body1" color="textDisabled">
          No Trips Found
        </Typography>
      </Box>
    </Paper>
  );
}
