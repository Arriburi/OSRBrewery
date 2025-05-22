'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <>
      {/*p-[20px] to align it to logo*/}
      <div className="flex-1 p-6 rounded-lg flex flex-col justify-between">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to OSRBrewery</h1>
          <p className="text-justify mt-8 hyphens-auto">
            OSRBrewery is a hub for tabletop RPG enthusiasts to create, share, and discover homebrew content. It streamlines saving, organizing, and accessing custom monsters, magic items, and more. By gathering homebrew from various sources, OSRBrewery simplifies sharing and bookmarking, fostering a thriving Old School Renaissance community.
          </p>
        </div>
        <div className="text-center mt-auto">
          <p className="text-foreground/70 mb-2">Already have an account?</p>
          <a href="/login" className="text-accent hover:underline font-medium">Login here</a>
        </div>
      </div>

      <div className="flex-1 p-6 rounded-lg ml-8">
        <form action={action} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {state?.errors?.email && (<span className="text-red-500 text-sm">{state.errors.email}</span>)}
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input
              id="username"
              name="username"
              placeholder="Choose a username"
              className="w-full px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {state?.errors?.username && (<span className="text-red-500 text-sm">{state.errors.username}</span>)}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {state?.errors?.password && (
              <div className="mt-2">
                <p className="text-red-500 text-sm">Password must:</p>
                <ul className="text-red-500 text-sm ml-5 list-disc">
                  {state.errors.password.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 bg-primary text-foreground rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {state?.errors?.confirmPassword && (
              <span className="text-red-500 text-sm">{state.errors.confirmPassword}</span>
            )}
          </div>

          <button
            disabled={pending}
            type="submit"
            className="w-full bg-accent hover:bg-secondary py-2 px-4 rounded-md text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Register
          </button>
        </form>
      </div>
    </>
  );
}