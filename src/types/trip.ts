import { Passenger } from "./passenger";

export interface Flight {
  active: number; // probably 0/1
  alerted: number; // probably 0/1
  alertedHash: any | null;
  arrivalDate: string;
  arrivalDateUTC: string;
  blocked: number; // probably 0/1
  cancelled: number; // probably 0/1
  carrierCodes: unknown; // Object { }
  created: string; // "2025-02-09T14:28:14.000Z";
  departed: number; // probably 0/1
  destination: string; // "DBN";
  destinationAirport: string; // "Dublin";
  destinationCountry: string; // "US";
  direction: string; // "OUTBOUND";
  embarkDate: string; // "2025-05-01T06:35:00.000Z";
  embarkDateUTC: string; // "2025-05-01T06:35:00.000Z";
  flightId: string; // "0315f720-e6f2-11ef-8974-ad2ef87a26fa";
  flightNumber: string; // "AC125";
  isMonitored: number; // probably 0/1
  linkId: string; // "0315f720-e6f2-11ef-8974-ad2ef87a26fa";
  notified: number; // probably 0/1
  origin: string; // "DUB";
  originAirport: string; // "Dublin";
  originCountry: string; // "IE";
  properties: any | null;
  rebooking: 0;
  sequence: 1;
  source: string; // "USER" | ???;
  terminal: any | null;
}

export interface TripList {
  trips: Array<Trip>;
}

export interface Trip {
  active: number; // probably 0/1
  alerts: Array<any>;
  bookingRef: any | null;
  cancellation_reason: any | null;
  clientId: any | null;
  created: string; // ISO Date
  delegated_passenger_id: string;
  flights: Array<Flight>;
  fulfilled: number; // probably 0/1
  partnerId: string;
  passengers: Array<Passenger>;
  passengers_count: number;
  payment_status: any | null;
  policyNumber: string;
  propositionId: string;
  transactionId: any | null;
  tripId: string; // Unique for Key
  type: string;
  userId: string;
}
