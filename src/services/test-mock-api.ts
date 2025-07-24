import mockFlightsApi from './mock-flights-api';
import { transformAirportData, transformFlightData } from './data-transformer';

// Test function to verify mock API functionality
export const testMockApi = async () => {
  console.log('🧪 Testing Mock API...\n');

  try {
    // Test 1: Search airports
    console.log('1. Testing airport search for "new york"...');
    const airportResults = await mockFlightsApi.searchAirports('new york');
    console.log(
      '✅ Airport search results:',
      airportResults.status,
      airportResults.data.length,
      'airports found'
    );

    // Test 2: Transform airport data
    console.log('\n2. Testing airport data transformation...');
    const transformedAirports = transformAirportData(airportResults);
    console.log(
      '✅ Transformed airports:',
      transformedAirports.length,
      'airports'
    );
    console.log('Sample airport:', transformedAirports[0]);

    // Test 3: Search flights
    console.log('\n3. Testing flight search for JFK-LHR...');
    const flightResults = await mockFlightsApi.searchFlights({
      origin: 'JFK',
      destination: 'LHR',
      date: '2024-01-15',
      adults: 1,
      cabinClass: 'economy',
    });
    console.log(
      '✅ Flight search results:',
      flightResults.status,
      flightResults.data.itineraries.length,
      'itineraries found'
    );

    // Test 4: Transform flight data
    console.log('\n4. Testing flight data transformation...');
    const transformedFlights = transformFlightData(flightResults, {
      origin: 'JFK',
      destination: 'LHR',
      date: '2024-01-15',
      adults: 1,
      cabinClass: 'economy',
    });
    console.log(
      '✅ Transformed flights:',
      transformedFlights.length,
      'flights'
    );
    console.log('Sample flight:', transformedFlights[0]);

    // Test 5: Get popular airports
    console.log('\n5. Testing popular airports...');
    const popularAirports = await mockFlightsApi.getPopularAirports();
    console.log(
      '✅ Popular airports:',
      popularAirports.status,
      popularAirports.data.length,
      'airports'
    );

    console.log('\n🎉 All tests passed! Mock API is working correctly.');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Export for use in development
export default testMockApi;
