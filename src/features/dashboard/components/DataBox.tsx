import { Trip, TripList } from "@/types/trip";
import { useContext, useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  ListItem,
  Chip,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Collapse,
  Divider,
  CircularProgress,
  List,
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

type GetDataFunction<T, E> = (
  signal: AbortSignal,
) => Promise<Result<AxiosResponse<T>, AxiosError<E>>>;

interface DataBoxProps<T, E> {
  getData: GetDataFunction<T, E>;
}

export default function DataBox<T, E>({
  getData,
}: DataBoxProps<T, E>): React.JSX.Element {
  const [trips, setTrips] = useState<Array<Trip> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const controller = new AbortController();
    if (user.isLoggedIn) {
      (async () => {
        const tripRes: Result<
          AxiosResponse<TripList>,
          AxiosError<GenericResponseError>
        > = await getData(controller.signal);

        switch (tripRes.type) {
          case "ok":
            setTrips(tripRes.value.data.trips);
            break;
          case "err":
            if (tripRes.error.status === 401) {
              user.logout();
            } // else display error
            break;
        }
        setIsLoading(false);
      })();
    }
    return () => controller.abort();
  }, [user.isLoggedIn]);

  return (
    <Paper
      elevation={5}
      sx={{
        width: { xs: 1 },
        maxHeight: { sm: "80vh" },
        minHeight: { sm: "50vh" },
        overflow: "scroll",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            bgcolor: "rgba(255,255,255, 0.75)",
          }}
        >
          <CircularProgress size="20%" />
        </Box>
      ) : trips && trips.length > 0 ? (
        <List disablePadding>
          {trips &&
            trips.map((trip) => {
              return <TripItem data={trip} key={trip.tripId} />;
            })}
        </List>
      ) : (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography>No Trips Found</Typography>
        </Box>
      )}
    </Paper>
  );
}
