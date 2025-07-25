import { mockSignIn, SignInData, AuthResponse } from '@services/mock-auth';

export const signInAPi = async ({
  uid,
  password,
}: SignInData): Promise<AuthResponse> => {
  return await mockSignIn({ uid, password });
};
