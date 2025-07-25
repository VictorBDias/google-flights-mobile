import { mockSignUp, SignUpData, AuthResponse } from '@services/mock-auth';

export const signUpApi = async (data: SignUpData): Promise<AuthResponse> => {
  return await mockSignUp(data);
};
