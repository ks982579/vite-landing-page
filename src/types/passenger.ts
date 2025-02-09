export interface Passenger {
  passengerId: string;
  userId: string;
  name: string;
  surname: string;
  title: string | null;
  mobilePhoneNumber: string;
  active: number; // maybe just 0/1
  created: string; // ISO date string
}
