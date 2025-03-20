import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcrypt';

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
  /*
    // 3. Insert the user into the database or call an Auth Library's API
    //  https://nextjs.org/docs/app/building-your-application/authentication#database-sessions
       const data = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id })
  
    const user = data[0]
  
    if (!user) {
      return {
        message: 'An error occurred while creating your account.',
      }
    }
  */
  // TODO:
  // 4. Create user session
  // 5. Redirect user
}