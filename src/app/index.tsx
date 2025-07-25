import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { Spinner } from 'tamagui';
import { useAuth } from '@contexts/auth-provider';

export default function SignedLayout() {
  const { isLogged, user, isLoading } = useAuth();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  console.log(
    'App routing - isLogged:',
    isLogged,
    'user:',
    user,
    'isLoading:',
    isLoading
  );

  if (!loaded) {
    return (
      <View>
        <Spinner size="large" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size="large" />
      </View>
    );
  }

  if (!isLogged) {
    console.log('Redirecting to sign-in');
    return <Redirect href="/(auth)/sign-in" />;
  } else {
    console.log('Redirecting to home');
    return <Redirect href="/(signed)/(tabs)/home" />;
  }
}
