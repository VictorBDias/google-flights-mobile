import { z } from 'zod';

export const authValidator = z.object({
  uid: z.string({ required_error: 'Uid is required' }).min(3, {
    message: 'Uid must be at least 3 characters long',
  }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters long',
    }),
});

export const signUpValidator = z
  .object({
    user_id: z.string({ required_error: 'User ID is required' }).min(3, {
      message: 'User ID must be at least 3 characters long',
    }),
    name: z.string({ required_error: 'Name is required' }).min(2, {
      message: 'Name must be at least 2 characters long',
    }),
    email: z.string({ required_error: 'Email is required' }).email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, {
        message: 'Password must be at least 6 characters long',
      }),
    confirmPassword: z.string({
      required_error: 'Please confirm your password',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type AuthValidator = z.infer<typeof authValidator>;
export type SignUpValidator = z.infer<typeof signUpValidator>;
