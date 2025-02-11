import { Trip } from "@/types/trip";
import { Paper, Box, Typography, List } from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import TripItem from "./TripItem";

interface TripsBoxProps {
  data?: {
    trips: Array<Trip> | null;
  };
}

// Use the <DataBox/> Component to pass data to here
export default function TripsBox({ data }: TripsBoxProps): React.JSX.Element {
  let trips = data?.trips;

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
