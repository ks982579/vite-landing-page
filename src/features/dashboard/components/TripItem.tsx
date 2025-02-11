import { Trip } from "@/types/trip";
import { useState } from "react";
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
  Alert,
} from "@mui/material";
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

  const flights = data.flights?.sort((a, b) => {
    const timeA = Date.parse(a.embarkDate);
    const timeB = Date.parse(b.embarkDate);
    return timeA - timeB;
  });

  // Earliest Departure Date
  const departureDate = flights[0]?.embarkDate;

  const lastLanding = flights[flights.length - 1]?.arrivalDate;

  console.log(lastLanding);

  const formattedDate = departureDate
    ? new Date(departureDate).toDateString()
    : "No Date";

  const formatDateInfo = (dateString: string): string => {
    const flightDate = new Date(dateString);
    return flightDate
      ? `${flightDate.toDateString()} at ${String(flightDate.getHours()).padStart(2, "0")}:${String(flightDate.getMinutes()).padStart(2, "0")}`
      : "No flight information";
  };

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
          {Date.now() < new Date(departureDate).getTime() ? (
            <Alert severity="info">Upcoming Flight</Alert>
          ) : Date.now() > new Date(lastLanding).getTime() ? (
            <Alert severity="success">Trip Complete</Alert>
          ) : (
            <Alert severity="info">Trip In Progress</Alert>
          )}
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
          {flights &&
            flights.map((flight, index) => (
              <Box key={flight.flightId} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="primary">
                  Flight {index + 1}: {flight.flightNumber}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <FlightTakeoff fontSize="small" />
                  <Typography variant="body2">
                    {flight.originAirport ?? ""} ({flight.origin ?? ""}) -{" "}
                    {formatDateInfo(flight.embarkDate)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FlightLand fontSize="small" />
                  <Typography variant="body2">
                    {flight.destinationAirport ?? ""} (
                    {flight.destination ?? ""}) -{" "}
                    {formatDateInfo(flight.arrivalDate)}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default TripItem;
