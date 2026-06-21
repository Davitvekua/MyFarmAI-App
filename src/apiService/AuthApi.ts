// login.tsx Api Service

import { supabase } from "@/lib/supabaseClient"
import type { ProfileInsert } from "@/types/appTypes"
import type { AuthError, PostgrestError } from "@supabase/supabase-js"

export async function loginUser(
  email: string,
  password: string
): Promise<AuthError | null> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  return error
}

//changePasswort.tsx (profile) Api Service

type ChangePasswordResult =
  | {
      success: true
    }
  | {
      success: false
      reason: "wrong-current-password" | "update-failed"
      error: AuthError
    }

export async function changePasswordWithCurrentPassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordResult> {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  })

  if (signInError) {
    return {
      success: false,
      reason: "wrong-current-password",
      error: signInError,
    }
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (updateError) {
    return {
      success: false,
      reason: "update-failed",
      error: updateError,
    }
  }

  return {
    success: true,
  }
}

//profile.tsx Api Service

export async function logoutUser(): Promise<AuthError | null> {
  const { error } = await supabase.auth.signOut()

  return error
}

// Register.tsx Api Service

type RegisterUserInput = {
  email: string
  password: string
  firstName: string
  lastName: string
  country: string
  city: string
}

type RegisterUserResult =
  | {
      success: true
    }
  | {
      success: false
      reason: "register-failed" | "user-id-missing" | "profile-save-failed"
      error?: AuthError | PostgrestError
    }

export async function registerUserWithProfile(
  input: RegisterUserInput
): Promise<RegisterUserResult> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
  })

  if (error) {
    return {
      success: false,
      reason: "register-failed",
      error,
    }
  }

  const userId = data.user?.id

  if (!userId) {
    return {
      success: false,
      reason: "user-id-missing",
    }
  }

  const profileData: ProfileInsert = {
    id: userId,
    first_name: input.firstName.trim() || null,
    last_name: input.lastName.trim() || null,
    country: input.country.trim() || null,
    city: input.city.trim() || null,
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .insert(profileData)

  if (profileError) {
    return {
      success: false,
      reason: "profile-save-failed",
      error: profileError,
    }
  }

  return {
    success: true,
  }
}

// resetPassword.tsx Api Service

export async function resetPasswordByEmail(
  email: string,
  redirectTo: string
): Promise<AuthError | null> {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo,
  })

  return error
}

// UpdatePassword.tsx Api Service

export async function updatePassword(
  newPassword: string
): Promise<AuthError | null> {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  return error
}
