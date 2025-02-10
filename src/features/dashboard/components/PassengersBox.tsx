import { useContext, useEffect, useState } from "react";
import { Passenger, PassengerList } from "@/types/passenger";
import { getPassengersData } from "@/services/userdata";
import {
  Paper,
  Box,
  Typography,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Collapse,
  Divider,
  CircularProgress,
  List,
} from "@mui/material";
import { Result, GenericResponseError } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import { AuthContextType, AuthContext } from "@/context/AuthContext";
import {
  AccountBox,
  CalendarToday,
  Fingerprint,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Phone,
} from "@mui/icons-material";

interface PassengerItemProps {
  data: Passenger;
}

const PassengerItem: React.FC<PassengerItemProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <Paper elevation={2} sx={{ m: 1 }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen((p) => !p)}>
          <ListItemAvatar>
            <Avatar>
              <AccountBox />
            </Avatar>
          </ListItemAvatar>
          {/* Using span because cannot nest in p-tags */}
          <ListItemText
            primary={
              <Typography variant="subtitle1" component="span">
                {data.title ?? ""}
                {data.title && " "}
                {data.name ?? ""}
                {data.name && " "}
                {data.surname ?? ""}
              </Typography>
            }
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Box>
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 5, pr: 2, pb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              Info:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Phone fontSize="small" />
              <Typography variant="body2">
                {data.mobilePhoneNumber ?? "Not Listed"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Fingerprint fontSize="small" />
              <Typography variant="body2">
                {`ID: ${data.passengerId ?? "Not Available"}`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <CalendarToday fontSize="small" />
              <Typography variant="body2">
                {`Created: ${new Date(data.created).toDateString()}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Collapse>
      <Divider />
    </Paper>
  );
};

export default function PassengersBox(): React.JSX.Element {
  const [passengers, setPassengers] = useState<Array<Passenger> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
            if (passengerRes.error.status === 401) {
              user.logout();
            } // else display error
            break;
        }
        setIsLoading(false);
      })();
    }
    return () => controller.abort();
  }, [user.isLoggedIn]);

  // TODO: Duplicates code from TripsBox - must abstract
  return (
    <Paper
      elevation={5}
      sx={{
        width: { xs: 1 },
        maxHeight: { md: "70vh" },
        minHeight: { md: "50vh" },
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
      ) : passengers && passengers.length > 0 ? (
        <List disablePadding>
          {passengers &&
            passengers.map((person) => {
              return <PassengerItem data={person} key={person.passengerId} />;
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
