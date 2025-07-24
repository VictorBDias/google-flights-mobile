import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/theme-provider';
import { Typography } from '@components/atoms/Typography';
import { Icon } from '@components/atoms/Icon';
import { IFlightResult } from '../../../models/flight-DTO';
import { spacings } from '@design/spacings';

interface FlightResultCardProps {
  flight: IFlightResult;
  onSelect: (flight: IFlightResult) => void;
}

export const FlightResultCard: React.FC<FlightResultCardProps> = ({
  flight,
  onSelect,
}) => {
  const { colors } = useTheme();

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDuration = (duration: string) => {
    // If duration is already formatted, return as is
    if (duration.includes('h') || duration.includes('m')) {
      return duration;
    }
    // Try to parse as minutes
    const durationMinutes = parseInt(duration, 10);
    if (isNaN(durationMinutes)) {
      return duration;
    }
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  };

  const getStopsText = (stops: number) => {
    if (stops === 0) return 'Direct';
    if (stops === 1) return '1 stop';
    return `${stops} stops`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
      onPress={() => onSelect(flight)}
    >
      {/* Airline and Flight Info */}
      <View style={styles.header}>
        <View style={styles.airlineInfo}>
          <Typography
            variant="regular"
            style={[styles.airline, { color: colors.text }]}
          >
            {flight.airline}
          </Typography>
          <Typography
            variant="regular"
            style={[styles.flightNumber, { color: colors.textSecondary }]}
          >
            {flight.flightNumber}
          </Typography>
        </View>
        <View style={styles.priceContainer}>
          <Typography
            variant="title"
            style={[styles.price, { color: colors.primary }]}
          >
            {formatPrice(flight.price.amount, flight.price.currency)}
          </Typography>
          <Typography
            variant="regular"
            style={[styles.priceLabel, { color: colors.textSecondary }]}
          >
            per passenger
          </Typography>
        </View>
      </View>

      {/* Flight Route */}
      <View style={styles.routeContainer}>
        <View style={styles.departure}>
          <Typography
            variant="subTitle"
            style={[styles.time, { color: colors.text }]}
          >
            {formatTime(flight.departure.time)}
          </Typography>
          <Typography
            variant="regular"
            style={[styles.airport, { color: colors.text }]}
          >
            {flight.departure.airport}
          </Typography>
          {flight.departure.terminal && (
            <Typography
              variant="regular"
              style={[styles.terminal, { color: colors.textSecondary }]}
            >
              Terminal {flight.departure.terminal}
            </Typography>
          )}
        </View>

        <View style={styles.flightPath}>
          <View style={styles.pathLine}>
            <View
              style={[styles.pathDot, { backgroundColor: colors.primary }]}
            />
            <View
              style={[styles.pathLineInner, { backgroundColor: colors.border }]}
            />
            <View
              style={[styles.pathDot, { backgroundColor: colors.primary }]}
            />
          </View>
          <View style={styles.flightInfo}>
            <Typography
              variant="regular"
              style={[styles.duration, { color: colors.textSecondary }]}
            >
              {formatDuration(flight.duration)}
            </Typography>
            <Typography
              variant="regular"
              style={[styles.stops, { color: colors.textSecondary }]}
            >
              {getStopsText(flight.stops)}
            </Typography>
          </View>
        </View>

        <View style={styles.arrival}>
          <Typography
            variant="subTitle"
            style={[styles.time, { color: colors.text }]}
          >
            {formatTime(flight.arrival.time)}
          </Typography>
          <Typography
            variant="regular"
            style={[styles.airport, { color: colors.text }]}
          >
            {flight.arrival.airport}
          </Typography>
          {flight.arrival.terminal && (
            <Typography
              variant="regular"
              style={[styles.terminal, { color: colors.textSecondary }]}
            >
              Terminal {flight.arrival.terminal}
            </Typography>
          )}
        </View>
      </View>

      {/* Additional Info */}
      <View style={styles.footer}>
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Icon name="briefcase" size={14} color={colors.textSecondary} />
            <Typography
              variant="regular"
              style={[styles.infoText, { color: colors.textSecondary }]}
            >
              {flight.cabinClass}
            </Typography>
          </View>
          {flight.aircraft && (
            <View style={styles.infoItem}>
              <Icon name="plane" size={14} color={colors.textSecondary} />
              <Typography
                variant="regular"
                style={[styles.infoText, { color: colors.textSecondary }]}
              >
                {flight.aircraft}
              </Typography>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[styles.selectButton, { backgroundColor: colors.primary }]}
        >
          <Typography
            variant="regular"
            style={[styles.selectButtonText, { color: colors.background }]}
          >
            Select
          </Typography>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacings.regular,
    marginBottom: spacings.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacings.medium,
  },
  airlineInfo: {
    flex: 1,
  },
  airline: {
    fontWeight: '600',
    marginBottom: 2,
  },
  flightNumber: {
    fontSize: 12,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  priceLabel: {
    fontSize: 10,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacings.medium,
  },
  departure: {
    flex: 1,
    alignItems: 'flex-start',
  },
  arrival: {
    flex: 1,
    alignItems: 'flex-end',
  },
  time: {
    fontWeight: '600',
    marginBottom: 4,
  },
  airport: {
    fontWeight: '500',
    marginBottom: 2,
  },
  terminal: {
    fontSize: 10,
  },
  flightPath: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacings.small,
  },
  pathLine: {
    width: '100%',
    height: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pathDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pathLineInner: {
    flex: 1,
    height: 1,
    marginHorizontal: 4,
  },
  flightInfo: {
    alignItems: 'center',
  },
  duration: {
    fontWeight: '500',
    marginBottom: 2,
  },
  stops: {
    fontSize: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacings.medium,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  additionalInfo: {
    flexDirection: 'row',
    gap: spacings.medium,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 10,
  },
  selectButton: {
    paddingHorizontal: spacings.medium,
    paddingVertical: spacings.small,
    borderRadius: 8,
  },
  selectButtonText: {
    fontWeight: '600',
  },
});
