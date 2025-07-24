import axios from 'axios';
import {
  IFlightSearch,
  IFlightSearchResponse,
  IAirport,
} from '../models/flight-DTO';

const RAPIDAPI_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com';

const flightsApi = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  },
});

export const flightsService = {
  // Search for flights
  searchFlights: async (
    searchParams: IFlightSearch
  ): Promise<IFlightSearchResponse> => {
    try {
      const response = await flightsApi.get('/api/v1/flights/search', {
        params: {
          originSkyId: searchParams.origin,
          destinationSkyId: searchParams.destination,
          date: searchParams.date,
          returnDate: searchParams.returnDate,
          adults: searchParams.adults || 1,
          cabinClass: searchParams.cabinClass || 'economy',
          currency: 'USD',
          market: 'US',
          locale: 'en-US',
        },
      });

      // Transform the response to match our interface
      const flights = response.data.data.itineraries.map((itinerary: any) => ({
        id: itinerary.id,
        airline: itinerary.legs[0]?.carriers?.marketing?.[0]?.name || 'Unknown',
        flightNumber:
          itinerary.legs[0]?.carriers?.marketing?.[0]?.flightNumber || '',
        departure: {
          airport: itinerary.legs[0]?.origin?.displayCode || '',
          time: itinerary.legs[0]?.departure || '',
          terminal: itinerary.legs[0]?.origin?.terminal,
        },
        arrival: {
          airport: itinerary.legs[0]?.destination?.displayCode || '',
          time: itinerary.legs[0]?.arrival || '',
          terminal: itinerary.legs[0]?.destination?.terminal,
        },
        duration: itinerary.legs[0]?.durationInMinutes || 0,
        price: {
          amount: itinerary.pricingOptions?.[0]?.price?.amount || 0,
          currency: itinerary.pricingOptions?.[0]?.price?.currency || 'USD',
        },
        stops: itinerary.legs.length - 1,
        cabinClass: searchParams.cabinClass || 'economy',
        aircraft: itinerary.legs[0]?.aircraft?.name,
      }));

      return {
        flights,
        totalResults: flights.length,
        searchParams,
      };
    } catch (error) {
      console.error('Flight search error:', error);
      throw new Error('Failed to search flights');
    }
  },

  // Search for airports
  searchAirports: async (query: string): Promise<IAirport[]> => {
    try {
      const response = await flightsApi.get('/api/v1/flights/auto-complete', {
        params: {
          query,
          market: 'US',
          locale: 'en-US',
        },
      });

      return response.data.data.map((airport: any) => ({
        code: airport.iataCode,
        name: airport.name,
        city: airport.address.cityName,
        country: airport.address.countryName,
      }));
    } catch (error) {
      console.error('Airport search error:', error);
      throw new Error('Failed to search airports');
    }
  },

  // Get popular airports
  getPopularAirports: async (): Promise<IAirport[]> => {
    // Return a list of popular airports as fallback
    return [
      {
        code: 'JFK',
        name: 'John F. Kennedy International Airport',
        city: 'New York',
        country: 'United States',
      },
      {
        code: 'LAX',
        name: 'Los Angeles International Airport',
        city: 'Los Angeles',
        country: 'United States',
      },
      {
        code: 'ORD',
        name: "O'Hare International Airport",
        city: 'Chicago',
        country: 'United States',
      },
      {
        code: 'DFW',
        name: 'Dallas/Fort Worth International Airport',
        city: 'Dallas',
        country: 'United States',
      },
      {
        code: 'ATL',
        name: 'Hartsfield-Jackson Atlanta International Airport',
        city: 'Atlanta',
        country: 'United States',
      },
      {
        code: 'LHR',
        name: 'Heathrow Airport',
        city: 'London',
        country: 'United Kingdom',
      },
      {
        code: 'CDG',
        name: 'Charles de Gaulle Airport',
        city: 'Paris',
        country: 'France',
      },
      {
        code: 'NRT',
        name: 'Narita International Airport',
        city: 'Tokyo',
        country: 'Japan',
      },
    ];
  },
};
