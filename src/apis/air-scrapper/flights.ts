import mockFlightsApi from '@services/mock-flights-api';
import {
  transformAirportData,
  transformFlightData,
  transformPopularAirportsData,
} from '@services/data-transformer';
import { IFlightSearch, IAirport, IFlightResult } from '@models/flight-DTO';

export const getFlightsApi = async ({
  query,
  locale,
}: {
  query: string;
  locale?: string;
}): Promise<IAirport[]> => {
  const response = await mockFlightsApi.searchAirports(query, locale);
  return transformAirportData(response);
};

export const searchFlightsApi = async (
  searchParams: IFlightSearch
): Promise<{
  flights: IFlightResult[];
  totalResults: number;
  searchParams: IFlightSearch;
}> => {
  const response = await mockFlightsApi.searchFlights(searchParams);
  const flights = transformFlightData(response, searchParams);

  return {
    flights,
    totalResults: flights.length,
    searchParams,
  };
};

export const getPopularAirportsApi = async (): Promise<IAirport[]> => {
  const response = await mockFlightsApi.getPopularAirports();
  return transformPopularAirportsData(response);
};
