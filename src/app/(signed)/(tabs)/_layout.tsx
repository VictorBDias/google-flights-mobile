import { Icon } from '@components/atoms';
import { useAuth } from '@contexts/auth-provider';
import { useTheme } from '@contexts/theme-provider';
import { spacings } from '@design/spacings';
import { Redirect, Tabs } from 'expo-router';

export default function TabLayout() {
  const { isLogged } = useAuth();
  const { colors } = useTheme();

  if (!isLogged) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: colors.background,
        paddingHorizontal: spacings.regular,
        marginTop: spacings.regular,
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          shadowColor: 'transparent',
          backgroundColor: colors.background,
          borderTopColor: colors.background,
          borderColor: colors.background,
          gap: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: 'Flights',
          tabBarIcon: ({ color }) => <Icon color={color} name="plane" />,
        }}
      />
    </Tabs>
  );
}
