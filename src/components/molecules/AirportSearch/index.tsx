import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTheme } from '@contexts/theme-provider';
import { Typography } from '@components/atoms/Typography';
import { Icon } from '@components/atoms/Icon';
import { IAirport } from '../../../models/flight-DTO';
import { spacings } from '@design/spacings';
import {
  getFlightsApi,
  getPopularAirportsApi,
} from '@apis/air-scrapper/flights';

interface AirportSearchProps {
  label: string;
  placeholder: string;
  value: string;
  onSelect: (airport: IAirport) => void;
  onTextChange: (text: string) => void;
}

export const AirportSearch: React.FC<AirportSearchProps> = ({
  label,
  placeholder,
  value,
  onSelect,
  onTextChange,
  ...rest
}) => {
  const { colors } = useTheme();
  const [airports, setAirports] = useState<IAirport[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inputLayout, setInputLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (value.length >= 2) {
      searchAirports(value);
    } else if (value.length === 0) {
      setAirports([]);
      setShowResults(false);
    } else if (value.length === 1) {
      loadPopularAirports();
    }
  }, [value]);

  const loadPopularAirports = async () => {
    try {
      const popular = await getPopularAirportsApi();
      setAirports(popular);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to load popular airports:', error);
    }
  };

  const searchAirports = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await getFlightsApi({ query });
      setAirports(results);
      setShowResults(true);
    } catch (error) {
      console.error('Airport search failed:', error);
      await loadPopularAirports();
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectAirport = (airport: IAirport) => {
    onSelect(airport);
    onTextChange(`${airport.code} - ${airport.city}`);
    setShowResults(false);
    setIsFullScreen(false);
  };

  const handleInputLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setInputLayout({ x, y, width, height });
  };

  const handleInputFocus = () => {
    setIsFullScreen(true);
    setShowResults(true);
    if (value.length === 0) {
      loadPopularAirports();
    }
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    setShowResults(false);
  };

  const renderAirportItem = ({ item }: { item: IAirport }) => (
    <TouchableOpacity
      style={[styles.airportItem, { borderBottomColor: colors.border }]}
      onPress={() => handleSelectAirport(item)}
    >
      <View style={styles.airportInfo}>
        <Typography
          variant="regular"
          style={[styles.airportCode, { color: colors.text }]}
        >
          {item.code}
        </Typography>
        <Typography
          variant="regular"
          style={[styles.airportName, { color: colors.textSecondary }]}
        >
          {item.name}
        </Typography>
        <Typography
          variant="regular"
          style={[styles.airportLocation, { color: colors.textSecondary }]}
        >
          {item.city}, {item.country}
        </Typography>
      </View>
      <Icon name="plane" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderFullScreenSearch = () => (
    <Modal
      visible={isFullScreen}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView
        style={[
          styles.fullScreenContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />

        <View
          style={[
            styles.fullScreenHeader,
            { borderBottomColor: colors.border },
          ]}
        >
          <TouchableOpacity
            onPress={handleCloseFullScreen}
            style={styles.closeButton}
          >
            <Icon name="x" size={24} color={colors.text} />
          </TouchableOpacity>
          <Typography
            variant="regular"
            style={[styles.fullScreenTitle, { color: colors.text }]}
          >
            {label}
          </Typography>
          <View style={styles.placeholderView} />
        </View>

        <View style={styles.fullScreenResultsContainer}>
          {showResults && airports.length > 0 ? (
            <FlatList
              data={airports}
              renderItem={renderAirportItem}
              keyExtractor={item => item.code}
              style={styles.fullScreenResultsList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.fullScreenResultsContent}
            />
          ) : (
            <View style={styles.emptyState}>
              <Icon name="search" size={48} color={colors.textSecondary} />
              <Typography
                variant="regular"
                style={[styles.emptyStateText, { color: colors.textSecondary }]}
              >
                Start typing to search airports
              </Typography>
            </View>
          )}
        </View>

        <View
          style={[
            styles.fullScreenInputContainer,
            { borderTopColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.fullScreenInputWrapper,
              { borderColor: colors.border },
            ]}
          >
            <Icon
              name="map-pin"
              size={20}
              color={colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.fullScreenInput, { color: colors.text }]}
              placeholder={placeholder}
              placeholderTextColor={colors.textSecondary}
              value={value}
              onChangeText={onTextChange}
              autoFocus={true}
            />
            {isSearching && (
              <Icon
                name="loader"
                size={16}
                color={colors.primary}
                style={styles.loadingIcon}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Typography
        variant="regular"
        style={[styles.label, { color: colors.text }]}
      >
        {label}
      </Typography>
      <View
        style={[styles.inputContainer, { borderColor: colors.border }]}
        onLayout={handleInputLayout}
      >
        <Icon
          name="map-pin"
          size={20}
          color={colors.textSecondary}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onTextChange}
          onFocus={handleInputFocus}
        />
        {isSearching && (
          <Icon
            name="loader"
            size={16}
            color={colors.primary}
            style={styles.loadingIcon}
          />
        )}
      </View>

      {showResults && airports.length > 0 && !isFullScreen && (
        <View
          style={[
            styles.resultsContainer,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
              left: inputLayout.x,
              top: inputLayout.y + inputLayout.height + 2,
              width: inputLayout.width,
            },
          ]}
        >
          <FlatList
            data={airports}
            renderItem={renderAirportItem}
            keyExtractor={item => item.code}
            style={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {renderFullScreenSearch()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 9998,
  },
  label: {
    marginBottom: spacings.small,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
  },
  inputIcon: {
    marginRight: spacings.small,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loadingIcon: {
    marginLeft: spacings.small,
  },
  resultsContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  resultsList: {
    maxHeight: 200,
  },
  airportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
    borderBottomWidth: 1,
  },
  airportInfo: {
    flex: 1,
  },
  airportCode: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  airportName: {
    fontSize: 14,
    marginBottom: 2,
  },
  airportLocation: {
    fontSize: 12,
  },
  // Full screen styles
  fullScreenContainer: {
    flex: 1,
  },
  fullScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: spacings.small,
  },
  fullScreenTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholderView: {
    width: 40,
  },
  fullScreenResultsContainer: {
    flex: 1,
  },
  fullScreenResultsList: {
    flex: 1,
  },
  fullScreenResultsContent: {
    paddingBottom: spacings.large,
  },
  fullScreenInputContainer: {
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
    borderTopWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  fullScreenInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
    backgroundColor: 'white',
  },
  fullScreenInput: {
    flex: 1,
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacings.large,
  },
  emptyStateText: {
    marginTop: spacings.medium,
    fontSize: 16,
    textAlign: 'center',
  },
});
