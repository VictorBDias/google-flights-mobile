import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@contexts/theme-provider';
import { Typography } from '@components/atoms/Typography';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { AirportSearch } from '../AirportSearch';
import {
  IAirport,
  IFlightSearch,
  CABIN_CLASSES,
} from '../../../models/flight-DTO';
import { spacings } from '@design/spacings';

interface FlightSearchFormProps {
  onSearch: (searchParams: IFlightSearch) => void;
  isLoading?: boolean;
}

export const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const { colors } = useTheme();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [adults, setAdults] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [showCabinOptions, setShowCabinOptions] = useState(false);

  const handleOriginSelect = (airport: IAirport) => {
    setOrigin(airport.code);
  };

  const handleDestinationSelect = (airport: IAirport) => {
    setDestination(airport.code);
  };

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      return;
    }

    const searchParams: IFlightSearch = {
      origin,
      destination,
      date: departureDate,
      adults,
      cabinClass,
      ...(isRoundTrip && returnDate && { returnDate }),
    };

    onSearch(searchParams);
  };

  const swapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getToday = () => {
    const today = new Date();
    return formatDate(today);
  };

  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };

  const getNextWeek = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return formatDate(nextWeek);
  };

  const getNextMonth = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return formatDate(nextMonth);
  };

  return (
    <View style={styles.container}>
      <Typography
        variant="title"
        style={[styles.title, { color: colors.text }]}
      >
        Find Your Flight
      </Typography>

      {/* Trip Type Toggle */}
      <View style={styles.tripTypeContainer}>
        <Typography
          variant="regular"
          style={[styles.tripTypeLabel, { color: colors.text }]}
        >
          Round Trip
        </Typography>
        <Switch
          value={isRoundTrip}
          onValueChange={setIsRoundTrip}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.background}
        />
      </View>

      {/* Airport Selection */}
      <View style={styles.airportContainer}>
        <AirportSearch
          label="From"
          placeholder="Departure airport"
          value={origin}
          onSelect={handleOriginSelect}
          onTextChange={setOrigin}
        />

        <TouchableOpacity style={styles.swapButton} onPress={swapAirports}>
          <Icon name="arrow-up-down" size={20} color={colors.primary} />
        </TouchableOpacity>

        <AirportSearch
          label="To"
          placeholder="Arrival airport"
          value={destination}
          onSelect={handleDestinationSelect}
          onTextChange={setDestination}
        />
      </View>

      {/* Date Selection */}
      <View style={styles.dateContainer}>
        <Typography
          variant="regular"
          style={[styles.label, { color: colors.text }]}
        >
          Departure Date
        </Typography>
        <View style={styles.dateButtons}>
          <TouchableOpacity
            style={[styles.dateButton, { backgroundColor: colors.primary }]}
            onPress={() => setDepartureDate(getToday())}
          >
            <Typography
              variant="regular"
              style={[styles.dateButtonText, { color: colors.background }]}
            >
              Today
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateButton, { backgroundColor: colors.primary }]}
            onPress={() => setDepartureDate(getTomorrow())}
          >
            <Typography
              variant="regular"
              style={[styles.dateButtonText, { color: colors.background }]}
            >
              Tomorrow
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateButton, { backgroundColor: colors.primary }]}
            onPress={() => setDepartureDate(getNextWeek())}
          >
            <Typography
              variant="regular"
              style={[styles.dateButtonText, { color: colors.background }]}
            >
              Next Week
            </Typography>
          </TouchableOpacity>
        </View>
        {departureDate && (
          <Typography
            variant="regular"
            style={[styles.selectedDate, { color: colors.text }]}
          >
            Selected: {departureDate}
          </Typography>
        )}
      </View>

      {isRoundTrip && (
        <View style={styles.dateContainer}>
          <Typography
            variant="regular"
            style={[styles.label, { color: colors.text }]}
          >
            Return Date
          </Typography>
          <View style={styles.dateButtons}>
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor: colors.primary }]}
              onPress={() => setReturnDate(getNextWeek())}
            >
              <Typography
                variant="regular"
                style={[styles.dateButtonText, { color: colors.background }]}
              >
                Next Week
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor: colors.primary }]}
              onPress={() => setReturnDate(getNextMonth())}
            >
              <Typography
                variant="regular"
                style={[styles.dateButtonText, { color: colors.background }]}
              >
                Next Month
              </Typography>
            </TouchableOpacity>
          </View>
          {returnDate && (
            <Typography
              variant="regular"
              style={[styles.selectedDate, { color: colors.text }]}
            >
              Selected: {returnDate}
            </Typography>
          )}
        </View>
      )}

      {/* Cabin Class Selection */}
      <View style={styles.cabinContainer}>
        <TouchableOpacity
          style={[styles.cabinSelector, { borderColor: colors.border }]}
          onPress={() => setShowCabinOptions(!showCabinOptions)}
        >
          <Typography
            variant="regular"
            style={[styles.label, { color: colors.text }]}
          >
            Cabin Class
          </Typography>
          <Typography
            variant="regular"
            style={[styles.cabinValue, { color: colors.text }]}
          >
            {CABIN_CLASSES.find(c => c.value === cabinClass)?.label ||
              'Economy'}
          </Typography>
          <Icon name="chevron-down" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        {showCabinOptions && (
          <View
            style={[
              styles.cabinOptions,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            {CABIN_CLASSES.map(cabin => (
              <TouchableOpacity
                key={cabin.value}
                style={[
                  styles.cabinOption,
                  { borderBottomColor: colors.border },
                ]}
                onPress={() => {
                  setCabinClass(cabin.value);
                  setShowCabinOptions(false);
                }}
              >
                <Typography
                  variant="regular"
                  style={[styles.cabinOptionText, { color: colors.text }]}
                >
                  {cabin.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Search Button */}
      <Button
        content={isLoading ? 'Searching...' : 'Search Flights'}
        onPress={handleSearch}
        isDisabled={!origin || !destination || !departureDate || isLoading}
        style={styles.searchButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacings.regular,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacings.large,
    textAlign: 'center',
  },
  tripTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacings.large,
    paddingHorizontal: spacings.regular,
  },
  tripTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  airportContainer: {
    marginBottom: spacings.large,
  },
  swapButton: {
    alignSelf: 'center',
    marginVertical: spacings.small,
    padding: spacings.small,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  dateContainer: {
    marginBottom: spacings.large,
  },
  label: {
    marginBottom: spacings.small,
    fontWeight: '600',
  },
  dateButtons: {
    flexDirection: 'row',
    gap: spacings.small,
    marginBottom: spacings.small,
  },
  dateButton: {
    paddingHorizontal: spacings.medium,
    paddingVertical: spacings.small,
    borderRadius: 8,
  },
  dateButtonText: {
    fontWeight: '600',
  },
  selectedDate: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  cabinContainer: {
    marginBottom: spacings.large,
    position: 'relative',
  },
  cabinSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
  },
  cabinValue: {
    flex: 1,
    textAlign: 'right',
    marginRight: spacings.small,
  },
  cabinOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 2,
    zIndex: 1000,
  },
  cabinOption: {
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
    borderBottomWidth: 1,
  },
  cabinOptionText: {
    textAlign: 'center',
  },
  searchButton: {
    marginTop: spacings.medium,
  },
});
