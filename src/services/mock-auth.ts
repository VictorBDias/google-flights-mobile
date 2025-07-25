import { IUser } from '../models/user-DTO';

// Mock user database
interface MockUser {
  id: number;
  user_id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// In-memory storage for mock users
let mockUsers: MockUser[] = [
  {
    id: 1,
    user_id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    user_id: 'jane_smith',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://via.placeholder.com/150',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface SignUpData {
  user_id: string;
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  uid: string; // Can be user_id or email
  password: string;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

// Mock sign up function
export const mockSignUp = async (data: SignUpData): Promise<AuthResponse> => {
  await delay(1000); // Simulate network delay

  // Check if user already exists
  const existingUser = mockUsers.find(
    user => user.user_id === data.user_id || user.email === data.email
  );

  if (existingUser) {
    throw new Error('User already exists with this user_id or email');
  }

  // Create new user
  const newUser: MockUser = {
    id: mockUsers.length + 1,
    user_id: data.user_id,
    name: data.name,
    email: data.email,
    password: data.password, // In real app, this would be hashed
    avatar: 'https://via.placeholder.com/150',
  };

  mockUsers.push(newUser);

  // Generate mock token
  const token = `mock_token_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Return user data without password
  const user: IUser = {
    id: newUser.id,
    user_id: newUser.user_id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
  };

  return { token, user };
};

// Mock sign in function
export const mockSignIn = async (data: SignInData): Promise<AuthResponse> => {
  await delay(1000); // Simulate network delay

  // Find user by user_id or email
  const user = mockUsers.find(
    u => u.user_id === data.uid || u.email === data.uid
  );

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== data.password) {
    throw new Error('Invalid password');
  }

  // Generate mock token
  const token = `mock_token_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Return user data without password
  const userData: IUser = {
    id: user.id,
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  return { token, user: userData };
};

// Mock function to get current user by token
export const mockGetCurrentUser = async (
  token: string
): Promise<IUser | null> => {
  await delay(500);

  // In a real app, you would validate the token
  // For mock purposes, we'll just return a default user
  const user = mockUsers[0];

  if (!user) return null;

  return {
    id: user.id,
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
};
