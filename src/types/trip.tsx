import { Passenger } from "./passenger";

export interface Trip {
  active: number; // probably 0/1
  alerts: Array<any>;
  bookingRef: any | null;
  cancellation_reason: any | null;
  clientId: any | null;
  created: string; // ISO Date
  delegated_passenger_id: string;
  flights: Array<any>;
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
