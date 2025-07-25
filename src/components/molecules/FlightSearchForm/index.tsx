import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Modal,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
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

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select an option',
}) => {
  const { colors } = useTheme();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsFullScreen(false);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  const renderOption = ({ item }: { item: DropdownOption }) => (
    <TouchableOpacity
      style={[styles.dropdownOption, { borderBottomColor: colors.border }]}
      onPress={() => handleSelect(item.value)}
    >
      <Typography
        variant="regular"
        style={[styles.dropdownOptionText, { color: colors.text }]}
      >
        {item.label}
      </Typography>
    </TouchableOpacity>
  );

  const renderFullScreenDropdown = () => (
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
          <FlatList
            data={options}
            renderItem={renderOption}
            keyExtractor={item => item.value}
            style={styles.fullScreenResultsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.fullScreenResultsContent}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.dropdownContainer}>
      <Typography
        variant="regular"
        style={[styles.label, { color: colors.text }]}
      >
        {label}
      </Typography>
      <TouchableOpacity
        style={[styles.dropdownSelector, { borderColor: colors.border }]}
        onPress={() => setIsFullScreen(true)}
      >
        <Typography
          variant="regular"
          style={[styles.dropdownValue, { color: colors.text }]}
        >
          {selectedOption?.label || placeholder}
        </Typography>
        <Icon name="chevron-down" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      {renderFullScreenDropdown()}
    </View>
  );
};

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

      {/* Cabin Class Dropdown */}
      <View style={styles.cabinContainer}>
        <Dropdown
          label="Cabin Class"
          value={cabinClass}
          options={CABIN_CLASSES}
          onSelect={setCabinClass}
          placeholder="Select cabin class"
        />
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
  },
  // Dropdown styles
  dropdownContainer: {
    position: 'relative',
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
  },
  dropdownValue: {
    flex: 1,
  },
  dropdownOption: {
    paddingHorizontal: spacings.regular,
    paddingVertical: spacings.medium,
    borderBottomWidth: 1,
  },
  dropdownOptionText: {
    textAlign: 'center',
    fontSize: 16,
  },
  // Full screen dropdown styles
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
  searchButton: {
    marginTop: spacings.medium,
  },
});
