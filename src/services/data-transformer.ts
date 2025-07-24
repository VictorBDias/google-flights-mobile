import { IAirport, IFlightResult, IFlightSearch } from '@models/flight-DTO';

// Transform sky-scrapper airport data to app format
export const transformAirportData = (skyScrapperData: any): IAirport[] => {
  if (!skyScrapperData?.data || !Array.isArray(skyScrapperData.data)) {
    return [];
  }

  return skyScrapperData.data.map((item: any) => {
    const flightParams = item.navigation?.relevantFlightParams;
    const presentation = item.presentation;

    return {
      code: flightParams?.skyId || '',
      name: presentation?.title || '',
      city: presentation?.title?.split(' ')[0] || '', // Extract city from title
      country: presentation?.subtitle || '',
    };
  });
};

// Transform sky-scrapper flight data to app format
export const transformFlightData = (
  skyScrapperData: any,
  searchParams: IFlightSearch
): IFlightResult[] => {
  if (
    !skyScrapperData?.data?.itineraries ||
    !Array.isArray(skyScrapperData.data.itineraries)
  ) {
    return [];
  }

  return skyScrapperData.data.itineraries
    .map((itinerary: any) => {
      const leg = itinerary.legs?.[0];
      const pricingOption = itinerary.pricingOptions?.[0];
      const carrier = leg?.carriers?.marketing?.[0];

      if (!leg || !pricingOption || !carrier) {
        return null;
      }

      // Parse duration from ISO 8601 format (PT7H30M)
      const durationMatch = leg.duration?.match(/PT(\d+)H(\d+)M/);
      const hours = durationMatch ? parseInt(durationMatch[1]) : 0;
      const minutes = durationMatch ? parseInt(durationMatch[2]) : 0;
      const duration = `${hours}h ${minutes}m`;

      // Generate flight number
      const flightNumber = `${carrier.iataCode}${
        Math.floor(Math.random() * 9999) + 1000
      }`;

      return {
        id: itinerary.id,
        airline: carrier.name,
        flightNumber,
        departure: {
          airport: leg.origin?.iataCode || searchParams.origin,
          time: leg.departure,
          terminal: leg.origin?.terminal,
        },
        arrival: {
          airport: leg.destination?.iataCode || searchParams.destination,
          time: leg.arrival,
          terminal: leg.destination?.terminal,
        },
        duration,
        price: {
          amount: pricingOption.price?.amount || 0,
          currency: pricingOption.price?.currency || 'USD',
        },
        stops: leg.numberOfStops || 0,
        cabinClass: searchParams.cabinClass || 'economy',
        aircraft: 'Boeing 737', // Default aircraft type
      };
    })
    .filter(Boolean) as IFlightResult[];
};

// Transform popular airports data
export const transformPopularAirportsData = (
  skyScrapperData: any
): IAirport[] => {
  return transformAirportData(skyScrapperData);
};
