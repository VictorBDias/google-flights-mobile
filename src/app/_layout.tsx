import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router, Slot } from 'expo-router';
import AuthProvider from '../contexts/auth-provider';
import { I18nextProvider } from 'react-i18next';
import i18n from '@translations/i18n';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import ThemeProvider from '@contexts/theme-provider';
import '../unistyles';
import { Header } from '@components/molecules';
import { spacings } from '@design/spacings';
import { Alert, TouchableOpacity, View } from 'react-native';
import { colors } from '@design/colors';
import { useAuth } from '@contexts/auth-provider';
import { Spinner } from 'tamagui';
import { Icon } from '@components/atoms';

function AppContent() {
  const insets = useSafeAreaInsets();
  const { isLogged, isLoading, user, logout } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: colors.background,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner size="large" />
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          router.push('/(auth)/sign-in');
        },
      },
    ]);
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        height: '100%',
        paddingTop: insets.top + spacings.regular,
      }}
    >
      {isLogged && user && (
        <Header
          content={user.name}
          avatar={user.avatar}
          sideElements={
            <TouchableOpacity onPress={handleLogout}>
              <Icon name="logout" />
            </TouchableOpacity>
          }
          style={{
            paddingHorizontal: spacings.regular,
          }}
        />
      )}

      <Slot />
    </View>
  );
}

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <SafeAreaProvider>
                <AppContent />
              </SafeAreaProvider>
            </AuthProvider>
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
