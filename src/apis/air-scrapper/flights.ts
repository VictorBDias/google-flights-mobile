import flightsApi from '@services/flights-api';

export const getFlightsApi = async ({
  query,
  locale,
}: {
  query: string;
  locale?: string;
}): Promise<any> => {
  const response = await flightsApi.get('flights/searchAirport', {
    params: { query, locale },
  });
  return response.data;
};
