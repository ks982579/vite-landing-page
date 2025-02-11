import { Passenger } from "@/types/passenger";
import { Paper, Box, Typography, List } from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import PassengerItem from "./PassengerItem";

interface PassengersBoxProps {
  data?: {
    passengers: Array<Passenger> | null;
  };
}

// Use the <DataBox/> Component to pass data to here
export default function PassengersBox({
  data,
}: PassengersBoxProps): React.JSX.Element {
  const passengers = data?.passengers;

  // TODO: Duplicates code from TripsBox - must abstract
  return passengers && passengers.length > 0 ? (
    <List disablePadding>
      {passengers &&
        passengers.map((person) => {
          return <PassengerItem data={person} key={person.passengerId} />;
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
          No Passengers Found
        </Typography>
      </Box>
    </Paper>
  );
}
