import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@contexts/theme-provider';
import { Typography } from '@components/atoms/Typography';
import { Icon } from '@components/atoms/Icon';
import { IAirport } from '../../../models/flight-DTO';
import { flightsService } from '../../../services/flights-api';
import { spacings } from '@design/spacings';

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
}) => {
  const { colors } = useTheme();
  const [airports, setAirports] = useState<IAirport[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (value.length >= 2) {
      searchAirports(value);
    } else if (value.length === 0) {
      setAirports([]);
      setShowResults(false);
    }
  }, [value]);

  const searchAirports = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await flightsService.searchAirports(query);
      setAirports(results);
      setShowResults(true);
    } catch (error) {
      console.error('Airport search failed:', error);
      // Fallback to popular airports
      const popular = await flightsService.getPopularAirports();
      setAirports(
        popular.filter(
          airport =>
            airport.code.toLowerCase().includes(query.toLowerCase()) ||
            airport.city.toLowerCase().includes(query.toLowerCase())
        )
      );
      setShowResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectAirport = (airport: IAirport) => {
    onSelect(airport);
    onTextChange(`${airport.code} - ${airport.city}`);
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

  return (
    <View style={styles.container}>
      <Typography
        variant="regular"
        style={[styles.label, { color: colors.text }]}
      >
        {label}
      </Typography>
      <View style={[styles.inputContainer, { borderColor: colors.border }]}>
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
          onFocus={() => setShowResults(true)}
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

      {showResults && airports.length > 0 && (
        <View
          style={[
            styles.resultsContainer,
            { backgroundColor: colors.background, borderColor: colors.border },
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
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
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 2,
    maxHeight: 200,
    zIndex: 1000,
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
});
