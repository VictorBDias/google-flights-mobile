import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View, TouchableOpacity } from 'react-native';
import { SignUpValidator, signUpValidator } from '@validations/auth';
import { useAuth } from '@contexts/auth-provider';
import { spacings } from '@design/spacings';
import { Button } from '@components/atoms/Button';
import { FormInput } from '@components/atoms/FormInput';
import { Typography } from '@components/atoms/Typography';
import { Form } from 'tamagui';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function SignUpScreen() {
  const router = useRouter();
  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    control,
  } = useForm<SignUpValidator>({
    resolver: zodResolver(signUpValidator),
  });
  const { signUp, status } = useAuth();

  const { styles } = useStyles(stylesheet);

  const isLoading = status === 'pending' && isSubmitting;

  const onSubmit = handleSubmit(async data => {
    try {
      await signUp(data);
      router.push('/(signed)/(tabs)/home');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  });

  const handleSignInPress = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <View style={styles.container}>
      <Typography variant="title" style={styles.title}>
        Create Account
      </Typography>

      <Form onSubmit={onSubmit}>
        <FormInput
          control={control}
          name={'user_id'}
          label={'User ID'}
          placeholder={'Enter your user ID'}
          required={true}
          errors={errors.user_id}
          errorMessage={errors.user_id?.message}
        />

        <FormInput
          control={control}
          name={'name'}
          label={'Full Name'}
          placeholder={'Enter your full name'}
          required={true}
          errors={errors.name}
          errorMessage={errors.name?.message}
          style={{ marginTop: spacings.regular }}
        />

        <FormInput
          control={control}
          name={'email'}
          label={'Email'}
          placeholder={'Enter your email'}
          required={true}
          errors={errors.email}
          errorMessage={errors.email?.message}
          style={{ marginTop: spacings.regular }}
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

        <FormInput
          control={control}
          name={'confirmPassword'}
          label={'Confirm Password'}
          placeholder={'Confirm your password'}
          required={true}
          errors={errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          style={{ marginTop: spacings.regular }}
          type="password"
        />

        <Form.Trigger asChild>
          <Button
            style={{ marginTop: spacings.big }}
            isLoading={isLoading}
            onPress={onSubmit}
            content={'Sign Up'}
          />
        </Form.Trigger>
      </Form>

      <View style={styles.signInContainer}>
        <Typography variant="regular" style={styles.signInText}>
          Already have an account?
        </Typography>
        <TouchableOpacity onPress={handleSignInPress}>
          <Typography variant="regular" style={styles.signInLink}>
            Sign In
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
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacings.large,
    gap: spacings.small,
  },
  signInText: {
    color: theme.colors.textSecondary,
  },
  signInLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
}));
