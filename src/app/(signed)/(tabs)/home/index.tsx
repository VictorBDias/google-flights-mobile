import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@contexts/theme-provider';
import { Typography } from '@components/atoms/Typography';
import { Icon } from '@components/atoms/Icon';
import { FlightSearchForm, FlightResultCard } from '@components/molecules';
import { spacings } from '@design/spacings';
import { useFlightStore } from '@zustand/flightStore';
import { IFlightResult, IFlightSearch } from '@models/flight-DTO';
import { getFlightsApi } from '@apis/air-scrapper/flights';

export default function Home() {
  const { colors } = useTheme();
  const {
    searchResults,
    isLoading,
    error,
    setSearchResults,
    setLoading,
    setError,
    addRecentSearch,
    clearResults,
    clearError,
  } = useFlightStore();

  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (searchParams: IFlightSearch) => {
    setLoading(true);
    clearError();
    setShowResults(true);

    try {
      const response = await getFlightsApi({
        query: searchParams.origin,
      });

      console.log(response);
      setSearchResults(response.flights);
      addRecentSearch(searchParams);
    } catch (err) {
      setError('Failed to search flights. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSelect = (flight: IFlightResult) => {
    Alert.alert(
      'Flight Selected',
      `You selected ${flight.airline} flight ${flight.flightNumber} for ${flight.price.amount} ${flight.price.currency}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book Now',
          onPress: () => console.log('Booking flight:', flight.id),
        },
      ]
    );
  };

  const handleNewSearch = () => {
    setShowResults(false);
    clearResults();
  };

  const renderFlightResult = ({ item }: { item: IFlightResult }) => (
    <FlightResultCard flight={item} onSelect={handleFlightSelect} />
  );

  const renderEmptyResults = () => (
    <View style={styles.emptyContainer}>
      <Icon name="plane" size={64} color={colors.textSecondary} />
      <Typography
        variant="subTitle"
        style={[styles.emptyTitle, { color: colors.text }]}
      >
        No flights found
      </Typography>
      <Typography
        variant="regular"
        style={[styles.emptyText, { color: colors.textSecondary }]}
      >
        Try adjusting your search criteria or dates
      </Typography>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Icon name="alert-circle" size={64} color={colors.error} />
      <Typography
        variant="subTitle"
        style={[styles.errorTitle, { color: colors.text }]}
      >
        Search Error
      </Typography>
      <Typography
        variant="regular"
        style={[styles.errorText, { color: colors.textSecondary }]}
      >
        {error}
      </Typography>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {!showResults ? (
        <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
      ) : (
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Typography
              variant="title"
              style={[styles.resultsTitle, { color: colors.text }]}
            >
              Flight Results
            </Typography>
            <TouchableOpacity
              onPress={handleNewSearch}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Results count */}
          {searchResults.length > 0 && (
            <Typography
              variant="regular"
              style={[styles.resultsCount, { color: colors.textSecondary }]}
            >
              {searchResults.length} flights found
            </Typography>
          )}

          {/* Error state */}
          {error && renderError()}

          {/* Loading state */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Icon name="loader" size={32} color={colors.primary} />
              <Typography
                variant="regular"
                style={[styles.loadingText, { color: colors.textSecondary }]}
              >
                Searching for flights...
              </Typography>
            </View>
          )}

          {/* Results */}
          {!isLoading && !error && (
            <FlatList
              data={searchResults}
              renderItem={renderFlightResult}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={renderEmptyResults}
              contentContainerStyle={styles.resultsList}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  resultsContainer: {
    flex: 1,
    padding: spacings.regular,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacings.medium,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    padding: spacings.small,
  },
  resultsCount: {
    marginBottom: spacings.medium,
    fontSize: 14,
  },
  resultsList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacings.xlarge,
  },
  emptyTitle: {
    marginTop: spacings.medium,
    marginBottom: spacings.small,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    paddingHorizontal: spacings.large,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacings.xlarge,
  },
  errorTitle: {
    marginTop: spacings.medium,
    marginBottom: spacings.small,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    paddingHorizontal: spacings.large,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacings.xlarge,
  },
  loadingText: {
    marginTop: spacings.medium,
    textAlign: 'center',
  },
});
