import mockDatabase from './mock-database.json';
import { IFlightSearch } from '@models/flight-DTO';

// Type definitions for the mock database
interface MockDatabase {
  searchAirports: Record<string, any>;
  searchFlights: Record<string, any>;
  getPopularAirports: any;
}

// Helper function to simulate API delay
const simulateApiDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to find best match for airport search
const findBestMatches = (query: string, airports: any[]) => {
  const normalizedQuery = query.toLowerCase().trim();

  return airports.filter(airport => {
    const title = airport.presentation.title.toLowerCase();
    const suggestionTitle = airport.presentation.suggestionTitle.toLowerCase();
    const subtitle = airport.presentation.subtitle.toLowerCase();

    return (
      title.includes(normalizedQuery) ||
      suggestionTitle.includes(normalizedQuery) ||
      subtitle.includes(normalizedQuery)
    );
  });
};

// Mock API class that mimics the sky-scrapper API structure
class MockFlightsApi {
  // Search airports - mimics the searchAirport endpoint
  async searchAirports(query: string, locale?: string) {
    await simulateApiDelay();

    const normalizedQuery = query.toLowerCase().trim();
    const db = mockDatabase as MockDatabase;

    // Check if we have exact matches in our database
    if (db.searchAirports[normalizedQuery]) {
      return db.searchAirports[normalizedQuery];
    }

    // If no exact match, search through all airports
    const allAirports = Object.values(db.searchAirports).flatMap(
      (cityData: any) => cityData.data
    );

    const matches = findBestMatches(query, allAirports);

    if (matches.length > 0) {
      return {
        status: true,
        timestamp: Date.now(),
        data: matches.slice(0, 10), // Limit to 10 results
      };
    }

    // Return empty results if no matches
    return {
      status: true,
      timestamp: Date.now(),
      data: [],
    };
  }

  // Search flights - mimics the searchFlights endpoint
  async searchFlights(searchParams: IFlightSearch) {
    await simulateApiDelay();

    const routeKey = `${searchParams.origin}-${searchParams.destination}`;
    const db = mockDatabase as MockDatabase;

    // Check if we have this route in our database
    if (db.searchFlights[routeKey]) {
      return db.searchFlights[routeKey];
    }

    // If no exact match, generate a mock response
    return this.generateMockFlightResponse(searchParams);
  }

  // Get popular airports - mimics the getPopularAirports endpoint
  async getPopularAirports() {
    await simulateApiDelay();
    const db = mockDatabase as MockDatabase;

    return db.getPopularAirports;
  }

  // Generate mock flight response for routes not in our database
  private generateMockFlightResponse(searchParams: IFlightSearch) {
    const airlines = [
      { code: 'AA', name: 'American Airlines' },
      { code: 'DL', name: 'Delta Air Lines' },
      { code: 'UA', name: 'United Airlines' },
      { code: 'BA', name: 'British Airways' },
      { code: 'AF', name: 'Air France' },
      { code: 'LH', name: 'Lufthansa' },
      { code: 'KL', name: 'KLM' },
      { code: 'IB', name: 'Iberia' },
    ];

    const itineraries = [];
    const numFlights = Math.floor(Math.random() * 8) + 3; // 3-10 flights

    for (let i = 0; i < numFlights; i++) {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const basePrice = 200 + Math.random() * 800; // $200-$1000

      // Generate departure time (between 6 AM and 10 PM)
      const departureHour = Math.floor(Math.random() * 16) + 6;
      const departureMinute = Math.floor(Math.random() * 60);
      const departureDate = new Date(searchParams.date);
      departureDate.setHours(departureHour, departureMinute, 0, 0);

      // Generate flight duration (1-12 hours)
      const flightDurationHours = Math.floor(Math.random() * 11) + 1;
      const flightDurationMinutes = Math.floor(Math.random() * 60);
      const arrivalDate = new Date(
        departureDate.getTime() +
          (flightDurationHours * 60 + flightDurationMinutes) * 60000
      );

      const itinerary = {
        id: `itinerary_${Date.now()}_${i}`,
        pricingOptions: [
          {
            id: `option_${i}`,
            fareType: 'PUBLIC',
            includedCheckedBagsOnly: true,
            price: {
              amount: Math.round(basePrice),
              currency: 'USD',
            },
            pricingOptions: [
              {
                id: `pricing_${i}`,
                fareType: 'PUBLIC',
                includedCheckedBagsOnly: true,
                price: {
                  amount: Math.round(basePrice),
                  currency: 'USD',
                },
              },
            ],
          },
        ],
        legs: [
          {
            id: `leg_${i}`,
            origin: {
              iataCode: searchParams.origin,
              terminal: `${Math.floor(Math.random() * 5) + 1}`,
            },
            destination: {
              iataCode: searchParams.destination,
              terminal: `${Math.floor(Math.random() * 5) + 1}`,
            },
            duration: `PT${flightDurationHours}H${flightDurationMinutes}M`,
            departure: departureDate.toISOString(),
            arrival: arrivalDate.toISOString(),
            carriers: {
              marketing: [
                {
                  iataCode: airline.code,
                  name: airline.name,
                },
              ],
              operating: [
                {
                  iataCode: airline.code,
                  name: airline.name,
                },
              ],
            },
            operating: {
              carrierCode: airline.code,
            },
            numberOfStops:
              Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0,
            blacklistedInEU: false,
          },
        ],
      };

      itineraries.push(itinerary);
    }

    return {
      status: true,
      timestamp: Date.now(),
      data: {
        itineraries,
      },
    };
  }
}

// Export singleton instance
const mockFlightsApi = new MockFlightsApi();
export default mockFlightsApi;
