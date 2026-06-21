// Dashboard API service

import { supabase } from "@/lib/supabaseClient"
import type { ProfileData } from "@/types/appTypes"
import type { PostgrestError, User } from "@supabase/supabase-js"

type ProfileNameData = {
  first_name: string | null
  last_name: string | null
}

export async function loadProfileforDashboard(
  user: User | null
): Promise<ProfileNameData | null> {
  if (!user) return null

  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .maybeSingle()

  if (error) {
    console.error("Profil konnte nicht geladen werden:", error.message)
    return null
  }

  return data
}

// Profile.tsx Api Service

type LoadProfileForProfilePageResult = {
  data: ProfileData | null
  error: PostgrestError | null
}

export async function loadProfileForProfilePage(
  userId: string
): Promise<LoadProfileForProfilePageResult> {
  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, country, city")
    .eq("id", userId)
    .maybeSingle()

  return {
    data,
    error,
  }
}
