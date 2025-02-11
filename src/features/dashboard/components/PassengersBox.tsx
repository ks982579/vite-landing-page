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
            <Avatar sx={{ bgcolor: "black" }}>
              <AccountBox sx={{ bgcolor: "white", color: "black" }} />
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
    </Paper>
  );
};

interface PassengersBoxProps {
  data?: {
    passengers: Array<Passenger> | null;
  };
}

// Use the <DataBox/> Component to pass data to here
export default function PassengersBox({
  data,
}: PassengersBoxProps): React.JSX.Element {
  // const [passengers, setPassengers] = useState<Array<Passenger> | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const passengers = data?.passengers;
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

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
