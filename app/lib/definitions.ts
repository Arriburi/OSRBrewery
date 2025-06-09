import { z } from 'zod'

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(6, { message: 'Be at least 6 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(1, 'Password is required'),
});

export type FormState =
  | {
    errors?: {
      username?: string[]
      email?: string[]
      password?: string[]
      confirmPassword?: string[]
    }
    message?: string
  }
  | undefined

export type SessionPayload = {
  userId: number
  username: string
}

export type User = {
  id: number
  username: string
  email: string
  created_at: string
}

export type Comment = {
  id: number
  content: string
  created_at: string
  username:  string
}
