'use server'

import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '../lib/supabase'

export async function signup(state: FormState, formData: FormData) {
  console.log('Signup attempt:', formData.get('email'));
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    console.log('Signup validation failed:', validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const { username, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        username,
        email,
        password_hash: hashedPassword,
      })
      .select()
      .single()

    if (error) {
      console.log('Signup error:', error);
      if (error.code === '23505') { // Unique violation
        if (error.message.includes('email')) {
          return {
            errors: {
              email: ['This email is already in use']
            }
          }
        }
        if (error.message.includes('username')) {
          return {
            errors: {
              username: ['This username is already taken']
            }
          }
        }
      }
      throw error
    }

    console.log('Signup successful for:', email);
    return { redirect: '/login' }
  } catch (error: unknown) {
    console.log('Signup exception:', error);
    return {
      message: 'An error occurred during signup'
    }
  }
}

export async function login(state: FormState, formData: FormData) {
  console.log('Login attempt:', formData.get('email'));
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    console.log('Login validation failed:', validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const { email, password } = validatedFields.data

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      console.log('User not found or error:', error);
      return {
        message: 'Invalid email or password'
      }
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      console.log('Password mismatch for:', email);
      return {
        message: 'Invalid email or password'
      }
    }

    console.log('Login successful for:', email);
    await createSession({
      userId: user.id,
      username: user.username,
    })

    return { redirect: '/' }
  } catch (error) {
    console.log('Login exception:', error);
    return {
      message: 'An error occurred during login'
    }
  }
}

export async function logout() {
  console.log('Logout attempt');
  await deleteSession()
  return { redirect: '/login' }
}