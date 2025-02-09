import { Trip, TripList } from "@/types/trip";
import { useEffect, useState } from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { Passenger, PassengerList } from "@/types/passenger";
import { getPassengersData, getTripsData } from "@/services/userdata";
import { Result, GenericResponseError } from "@/types";
import { AxiosError, AxiosResponse } from "axios";

interface TripChipProps {
  data: Trip;
}

const TripsChip: React.FC<TripChipProps> = ({ data }) => {
  return (
    <Paper elevation={5} sx={{ width: { xs: 1 } }}>
      <Box sx={{ m: 2 }}>
        <Typography variant="h6">{data.bookingRef}</Typography>
        <Typography sx={{ mt: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Button
          variant="text"
          // color="secondary"
          sx={{
            // bgcolor: deepPurple[50],
            textTransform: "capitalize",
            borderRadius: 2,
            // ":hover": { bgcolor: deepPurple[100] },
          }}
        >
          More Info
        </Button>
      </Box>
    </Paper>
  );
};

export default function TripsBox(): React.JSX.Element {
  const [trips, setTrips] = useState<Array<Trip> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const tripRes: Result<
        AxiosResponse<TripList>,
        AxiosError<GenericResponseError>
      > = await getTripsData(controller.signal);

      switch (tripRes.type) {
        case "ok":
          setTrips(tripRes.value.data.trips);
          break;
        case "err":
          // Check Why / maybe try again.
          break;
      }
    })();
    return () => controller.abort();
  }, []);

  return (
    <Paper elevation={5} sx={{ width: { xs: 1 } }}>
      {trips &&
        trips.map((trip) => {
          return <TripsChip data={trip} key={trip.tripId} />;
        })}
    </Paper>
  );
}
