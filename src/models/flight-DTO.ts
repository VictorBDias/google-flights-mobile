export interface IFlightSearch {
  origin: string;
  destination: string;
  date: string;
  returnDate?: string;
  adults?: number;
  cabinClass?: string;
}

export interface IFlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
    terminal?: string;
  };
  arrival: {
    airport: string;
    time: string;
    terminal?: string;
  };
  duration: string;
  price: {
    amount: number;
    currency: string;
  };
  stops: number;
  cabinClass: string;
  aircraft?: string;
}

export interface IFlightSearchResponse {
  flights: IFlightResult[];
  totalResults: number;
  searchParams: IFlightSearch;
}

export interface IAirport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface ICabinClass {
  value: string;
  label: string;
}

export const CABIN_CLASSES: ICabinClass[] = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First Class' },
];
