import { IAirport, IFlightResult, IFlightSearch } from '../models/flight-DTO';

// Mock airports data
export const MOCK_AIRPORTS: IAirport[] = [
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
    name: 'London Heathrow Airport',
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
    code: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Germany',
  },
  {
    code: 'AMS',
    name: 'Amsterdam Airport Schiphol',
    city: 'Amsterdam',
    country: 'Netherlands',
  },
  {
    code: 'MAD',
    name: 'Adolfo Suárez Madrid–Barajas Airport',
    city: 'Madrid',
    country: 'Spain',
  },
  {
    code: 'BCN',
    name: 'Barcelona–El Prat Airport',
    city: 'Barcelona',
    country: 'Spain',
  },
  {
    code: 'FCO',
    name: 'Leonardo da Vinci International Airport',
    city: 'Rome',
    country: 'Italy',
  },
  {
    code: 'MXP',
    name: 'Milan Malpensa Airport',
    city: 'Milan',
    country: 'Italy',
  },
  {
    code: 'ZRH',
    name: 'Zurich Airport',
    city: 'Zurich',
    country: 'Switzerland',
  },
  {
    code: 'VIE',
    name: 'Vienna International Airport',
    city: 'Vienna',
    country: 'Austria',
  },
  {
    code: 'CPH',
    name: 'Copenhagen Airport',
    city: 'Copenhagen',
    country: 'Denmark',
  },
  {
    code: 'ARN',
    name: 'Stockholm Arlanda Airport',
    city: 'Stockholm',
    country: 'Sweden',
  },
  {
    code: 'OSL',
    name: 'Oslo Airport',
    city: 'Oslo',
    country: 'Norway',
  },
  {
    code: 'HEL',
    name: 'Helsinki Airport',
    city: 'Helsinki',
    country: 'Finland',
  },
  {
    code: 'WAW',
    name: 'Warsaw Chopin Airport',
    city: 'Warsaw',
    country: 'Poland',
  },
  {
    code: 'PRG',
    name: 'Václav Havel Airport Prague',
    city: 'Prague',
    country: 'Czech Republic',
  },
  {
    code: 'BUD',
    name: 'Budapest Ferenc Liszt International Airport',
    city: 'Budapest',
    country: 'Hungary',
  },
  {
    code: 'IST',
    name: 'Istanbul Airport',
    city: 'Istanbul',
    country: 'Turkey',
  },
  {
    code: 'DXB',
    name: 'Dubai International Airport',
    city: 'Dubai',
    country: 'United Arab Emirates',
  },
  {
    code: 'DOH',
    name: 'Hamad International Airport',
    city: 'Doha',
    country: 'Qatar',
  },
  {
    code: 'NRT',
    name: 'Narita International Airport',
    city: 'Tokyo',
    country: 'Japan',
  },
  {
    code: 'HND',
    name: 'Haneda Airport',
    city: 'Tokyo',
    country: 'Japan',
  },
  {
    code: 'ICN',
    name: 'Incheon International Airport',
    city: 'Seoul',
    country: 'South Korea',
  },
  {
    code: 'PEK',
    name: 'Beijing Capital International Airport',
    city: 'Beijing',
    country: 'China',
  },
  {
    code: 'PVG',
    name: 'Shanghai Pudong International Airport',
    city: 'Shanghai',
    country: 'China',
  },
  {
    code: 'HKG',
    name: 'Hong Kong International Airport',
    city: 'Hong Kong',
    country: 'China',
  },
  {
    code: 'SIN',
    name: 'Singapore Changi Airport',
    city: 'Singapore',
    country: 'Singapore',
  },
  {
    code: 'BKK',
    name: 'Suvarnabhumi Airport',
    city: 'Bangkok',
    country: 'Thailand',
  },
  {
    code: 'KUL',
    name: 'Kuala Lumpur International Airport',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
  },
  {
    code: 'CGK',
    name: 'Soekarno–Hatta International Airport',
    city: 'Jakarta',
    country: 'Indonesia',
  },
  {
    code: 'MNL',
    name: 'Ninoy Aquino International Airport',
    city: 'Manila',
    country: 'Philippines',
  },
  {
    code: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'Delhi',
    country: 'India',
  },
  {
    code: 'BOM',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    city: 'Mumbai',
    country: 'India',
  },
  {
    code: 'BLR',
    name: 'Kempegowda International Airport',
    city: 'Bangalore',
    country: 'India',
  },
  {
    code: 'SYD',
    name: 'Sydney Airport',
    city: 'Sydney',
    country: 'Australia',
  },
  {
    code: 'MEL',
    name: 'Melbourne Airport',
    city: 'Melbourne',
    country: 'Australia',
  },
  {
    code: 'BNE',
    name: 'Brisbane Airport',
    city: 'Brisbane',
    country: 'Australia',
  },
  {
    code: 'AKL',
    name: 'Auckland Airport',
    city: 'Auckland',
    country: 'New Zealand',
  },
  {
    code: 'YYZ',
    name: 'Toronto Pearson International Airport',
    city: 'Toronto',
    country: 'Canada',
  },
  {
    code: 'YVR',
    name: 'Vancouver International Airport',
    city: 'Vancouver',
    country: 'Canada',
  },
  {
    code: 'YUL',
    name: 'Montréal–Trudeau International Airport',
    city: 'Montreal',
    country: 'Canada',
  },
  {
    code: 'GRU',
    name: 'São Paulo/Guarulhos International Airport',
    city: 'São Paulo',
    country: 'Brazil',
  },
  {
    code: 'GIG',
    name: 'Rio de Janeiro/Galeão International Airport',
    city: 'Rio de Janeiro',
    country: 'Brazil',
  },
  {
    code: 'EZE',
    name: 'Ministro Pistarini International Airport',
    city: 'Buenos Aires',
    country: 'Argentina',
  },
  {
    code: 'MEX',
    name: 'Mexico City International Airport',
    city: 'Mexico City',
    country: 'Mexico',
  },
  {
    code: 'CUN',
    name: 'Cancún International Airport',
    city: 'Cancún',
    country: 'Mexico',
  },
];

// Mock airlines
const AIRLINES = [
  'American Airlines',
  'Delta Air Lines',
  'United Airlines',
  'Southwest Airlines',
  'JetBlue Airways',
  'Alaska Airlines',
  'Spirit Airlines',
  'Frontier Airlines',
  'British Airways',
  'Lufthansa',
  'Air France',
  'KLM Royal Dutch Airlines',
  'Iberia',
  'Swiss International Air Lines',
  'Austrian Airlines',
  'Scandinavian Airlines',
  'Finnair',
  'Turkish Airlines',
  'Emirates',
  'Qatar Airways',
  'Japan Airlines',
  'All Nippon Airways',
  'Korean Air',
  'China Eastern Airlines',
  'China Southern Airlines',
  'Cathay Pacific',
  'Singapore Airlines',
  'Thai Airways',
  'Malaysia Airlines',
  'Garuda Indonesia',
  'Philippine Airlines',
  'Air India',
  'IndiGo',
  'Qantas',
  'Air New Zealand',
  'Air Canada',
  'WestJet',
  'LATAM Airlines',
  'Avianca',
  'Aeromexico',
  'Volaris',
];

// Generate mock flight results
export const generateMockFlights = (
  searchParams: IFlightSearch
): IFlightResult[] => {
  const flights: IFlightResult[] = [];
  const numFlights = Math.floor(Math.random() * 15) + 5; // 5-20 flights

  for (let i = 0; i < numFlights; i++) {
    const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
    const flightNumber = `${airline.substring(0, 2).toUpperCase()}${
      Math.floor(Math.random() * 9999) + 1000
    }`;

    // Generate departure time (between 6 AM and 10 PM)
    const departureHour = Math.floor(Math.random() * 16) + 6;
    const departureMinute = Math.floor(Math.random() * 60);
    const departureTime = new Date(searchParams.date);
    departureTime.setHours(departureHour, departureMinute, 0, 0);

    // Generate arrival time (1-8 hours later)
    const flightDurationMinutes = Math.floor(Math.random() * 420) + 60; // 1-8 hours
    const arrivalTime = new Date(
      departureTime.getTime() + flightDurationMinutes * 60000
    );

    // Generate price based on cabin class and duration
    let basePrice = 150 + (flightDurationMinutes / 60) * 25;
    switch (searchParams.cabinClass) {
      case 'premium_economy':
        basePrice *= 1.5;
        break;
      case 'business':
        basePrice *= 3;
        break;
      case 'first':
        basePrice *= 5;
        break;
      default:
        basePrice *= 1;
    }

    // Add some randomness to price
    basePrice *= 0.8 + Math.random() * 0.4; // ±20% variation

    const flight: IFlightResult = {
      id: `flight_${Date.now()}_${i}`,
      airline,
      flightNumber,
      departure: {
        airport: searchParams.origin,
        time: departureTime.toISOString(),
        terminal: `${Math.floor(Math.random() * 5) + 1}`,
      },
      arrival: {
        airport: searchParams.destination,
        time: arrivalTime.toISOString(),
        terminal: `${Math.floor(Math.random() * 5) + 1}`,
      },
      duration: `${Math.floor(flightDurationMinutes / 60)}h ${
        flightDurationMinutes % 60
      }m`,
      price: {
        amount: Math.round(basePrice),
        currency: 'USD',
      },
      stops: Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0, // 30% chance of stops
      cabinClass: searchParams.cabinClass || 'economy',
      aircraft: [
        'Boeing 737',
        'Boeing 777',
        'Boeing 787',
        'Airbus A320',
        'Airbus A350',
        'Airbus A380',
      ][Math.floor(Math.random() * 6)],
    };

    flights.push(flight);
  }

  // Sort by price (lowest first)
  return flights.sort((a, b) => a.price.amount - b.price.amount);
};

// Search airports by query
export const searchAirports = (query: string): IAirport[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_AIRPORTS.filter(
    airport =>
      airport.code.toLowerCase().includes(lowerQuery) ||
      airport.city.toLowerCase().includes(lowerQuery) ||
      airport.name.toLowerCase().includes(lowerQuery) ||
      airport.country.toLowerCase().includes(lowerQuery)
  ).slice(0, 10); // Limit to 10 results
};

// Get popular airports
export const getPopularAirports = (): IAirport[] => {
  const popularCodes = [
    'JFK',
    'LAX',
    'LHR',
    'CDG',
    'FRA',
    'AMS',
    'DXB',
    'NRT',
    'SIN',
    'SYD',
  ];
  return MOCK_AIRPORTS.filter(airport => popularCodes.includes(airport.code));
};
