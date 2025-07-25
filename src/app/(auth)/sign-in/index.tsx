import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View, TouchableOpacity } from 'react-native';
import { AuthValidator, authValidator } from '@validations/auth';
import { useAuth } from '@contexts/auth-provider';
import { spacings } from '@design/spacings';
import { Button } from '@components/atoms/Button';
import { FormInput } from '@components/atoms/FormInput';
import { Typography } from '@components/atoms/Typography';
import { Form } from 'tamagui';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function SignInScreen() {
  const router = useRouter();
  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    control,
  } = useForm<AuthValidator>({
    resolver: zodResolver(authValidator),
  });
  const { login, status } = useAuth();

  const { styles } = useStyles(stylesheet);

  const isLoading = status === 'pending' && isSubmitting;

  const onSubmit = handleSubmit(async ({ uid, password }) => {
    try {
      console.log('Attempting to sign in with:', { uid, password });
      await login({ uid, password });
      console.log('Sign in successful, user should be redirected');
      // Navigation will be handled automatically by the auth state change
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  });

  const handleSignUpPress = () => {
    router.push('/(auth)/sign-up');
  };

  return (
    <View style={styles.container}>
      <Form onSubmit={onSubmit}>
        <FormInput
          control={control}
          name={'uid'}
          label={'User ID or Email'}
          placeholder={'Enter your user ID or email'}
          required={true}
          errors={errors.uid}
          errorMessage={errors.uid?.message}
        />
        <FormInput
          control={control}
          name={'password'}
          label={'Password'}
          placeholder={'Enter your password'}
          required={true}
          errors={errors.password}
          errorMessage={errors.password?.message}
          style={{ marginTop: spacings.regular }}
          type="password"
        />

        <Form.Trigger asChild>
          <Button
            style={{ marginTop: spacings.big }}
            isLoading={isLoading}
            onPress={onSubmit}
            content={'Sign In'}
          />
        </Form.Trigger>
      </Form>

      <View style={styles.signUpContainer}>
        <Typography variant="regular" style={styles.signUpText}>
          Don't have an account?
        </Typography>
        <TouchableOpacity onPress={handleSignUpPress}>
          <Typography variant="regular" style={styles.signUpLink}>
            Sign Up
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: spacings.big,
    gap: spacings.regular,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: spacings.large,
    textAlign: 'center',
    color: theme.colors.text,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacings.large,
    gap: spacings.small,
  },
  signUpText: {
    color: theme.colors.textSecondary,
  },
  signUpLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
}));
