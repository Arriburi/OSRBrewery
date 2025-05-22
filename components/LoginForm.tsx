'use client'

import { login } from '@/app/actions/auth'
import { useActionState } from 'react'
import Form from 'next/form'

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <>
      {/*p-[20px] to align it to logo*/}
      <div className="flex-1 p-6 rounded-lg flex flex-col justify-between">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-foreground/70">We're glad to see you again</p>
        </div>
        <div className="text-center mt-auto">
          <p className="text-foreground/70 mb-2">Don't have an account yet?</p>
          <a href="/register" className="text-accent hover:underline font-medium">Create one here</a>
        </div>
      </div>
      <div className="flex-1 p-6 rounded-lg ml-8">
        <Form action={action} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {state?.errors?.email && (
              <span className="text-red-500 text-sm">{state.errors.email}</span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {state?.errors?.password && (
              <span className="text-red-500 text-sm">{state.errors.password}</span>
            )}
          </div>

          <button
            disabled={pending}
            type="submit"
            className="w-full bg-accent hover:bg-secondary py-2 px-4 rounded-md text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Login
          </button>
        </Form>
      </div>
    </>
  );
}