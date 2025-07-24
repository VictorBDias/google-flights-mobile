import { create } from 'zustand';
import { IFlightSearch, IFlightResult, IAirport } from '../models/flight-DTO';
import { getPopularAirports } from '../services/mock-data';

interface FlightState {
  searchParams: IFlightSearch | null;
  searchResults: IFlightResult[];
  isLoading: boolean;
  error: string | null;
  recentSearches: IFlightSearch[];
  popularAirports: IAirport[];
}

interface FlightStore extends FlightState {
  setSearchParams: (params: IFlightSearch) => void;
  setSearchResults: (results: IFlightResult[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addRecentSearch: (search: IFlightSearch) => void;
  setPopularAirports: (airports: IAirport[]) => void;
  clearResults: () => void;
  clearError: () => void;
}

export const useFlightStore = create<FlightStore>((set, get) => ({
  searchParams: null,
  searchResults: [],
  isLoading: false,
  error: null,
  recentSearches: [],
  popularAirports: getPopularAirports(),

  setSearchParams: params => set({ searchParams: params }),

  setSearchResults: results => set({ searchResults: results }),

  setLoading: loading => set({ isLoading: loading }),

  setError: error => set({ error }),

  addRecentSearch: search => {
    const { recentSearches } = get();
    const newSearches = [
      search,
      ...recentSearches.filter(
        s =>
          s.origin !== search.origin ||
          s.destination !== search.destination ||
          s.date !== search.date
      ),
    ].slice(0, 5);
    set({ recentSearches: newSearches });
  },

  setPopularAirports: airports => set({ popularAirports: airports }),

  clearResults: () => set({ searchResults: [], error: null }),

  clearError: () => set({ error: null }),
}));
