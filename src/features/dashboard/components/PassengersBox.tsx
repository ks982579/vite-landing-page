import { useContext, useEffect, useState } from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { Passenger, PassengerList } from "@/types/passenger";
import { getPassengersData } from "@/services/userdata";
import { Result, GenericResponseError } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import { AuthContext, AuthContextType } from "@/context/AuthContext";

interface PassengerChipProps {
  data: Passenger;
}

const PassengerChip: React.FC<PassengerChipProps> = ({ data }) => {
  return (
    <Paper elevation={5} sx={{ width: { xs: 1 } }}>
      <Box sx={{ m: 2 }}>
        <Typography variant="h6">{data.name}</Typography>
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

export default function PassengersBox(): React.JSX.Element {
  // Loading???
  const [passengers, setPassengers] = useState<Array<Passenger> | null>(null);
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

  // Make API Call HERE
  useEffect(() => {
    const controller = new AbortController();
    if (user.isLoggedIn) {
      (async () => {
        const passengerRes: Result<
          AxiosResponse<PassengerList>,
          AxiosError<GenericResponseError>
        > = await getPassengersData(controller.signal);

        switch (passengerRes.type) {
          case "ok":
            setPassengers(passengerRes.value.data.passengers);
            break;
          case "err":
            // Check Why / maybe try again.
            // 401 -> Cookie expired
            if (passengerRes.error.status === 401) {
              user.logout();
            } // else display error
            break;
        }
      })();
    }
    return () => controller.abort();
  }, [user.isLoggedIn]);

  return (
    <Paper elevation={5} sx={{ width: { xs: 1 } }}>
      {passengers &&
        passengers.map((person) => {
          return <PassengerChip data={person} key={person.passengerId} />;
        })}
    </Paper>
  );
}
