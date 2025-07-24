import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/theme-provider';
import { Typography } from '@components/atoms/Typography';
import { Icon } from '@components/atoms/Icon';
import { spacings } from '@design/spacings';
import { useUserStore } from '@zustand/userStore';

export default function Bookings() {
  const { colors } = useTheme();
  const { user } = useUserStore();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Typography
          variant="title"
          style={[styles.title, { color: colors.text }]}
        >
          My Bookings
        </Typography>
        <Typography
          variant="regular"
          style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          Welcome back, {user?.name || 'User'}
        </Typography>
      </View>

      <View style={styles.emptyContainer}>
        <Icon name="calendar" size={64} color={colors.textSecondary} />
        <Typography
          variant="subTitle"
          style={[styles.emptyTitle, { color: colors.text }]}
        >
          No bookings yet
        </Typography>
        <Typography
          variant="regular"
          style={[styles.emptyText, { color: colors.textSecondary }]}
        >
          Start searching for flights to see your bookings here
        </Typography>
      </View>

      {/* Future: Add booking history, upcoming trips, etc. */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacings.regular,
  },
  header: {
    marginBottom: spacings.large,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacings.small,
  },
  subtitle: {
    fontSize: 16,
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
});
