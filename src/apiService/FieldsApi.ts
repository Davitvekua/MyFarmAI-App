// dashboard.tsx API service

// fields von Supabase holen

import { supabase } from "@/lib/supabaseClient"
import type { PostgrestError, User } from "@supabase/supabase-js"
import type {
  DashboardField,
  FieldDetailsField,
  FieldEditField,
  FieldInsert,
  FieldsListField,
  FieldsMapField,
  FieldUpdate,
  ProfileInsert,
} from "@/types/appTypes"

type LoadFieldsForDashboardResult = {
  data: DashboardField[] | null
  error: PostgrestError | null
}

export async function loadFieldsforDashboard(
  user: User | null
): Promise<LoadFieldsForDashboardResult> {
  if (!user) {
    return {
      data: null,
      error: null,
    }
  }

  const { data, error } = await supabase
    .from("fields")
    .select("id, name, crop_type, soil_type, area_ha")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return {
    data,
    error,
  }
}

// fieldDetails.tsx Api Service

type LoadFieldForFieldDetailsResult = {
  data: FieldDetailsField | null
  error: PostgrestError | null
}

export async function loadFieldForFieldDetails(
  user: User | null,
  fieldId: string | undefined
): Promise<LoadFieldForFieldDetailsResult> {
  if (!user || !fieldId) {
    return {
      data: null,
      error: null,
    }
  }

  const { data, error } = await supabase
    .from("fields")
    .select(
      "id, user_id, name, crop_type, soil_type, note, area_m2, area_ha, center_lat, center_lng, polygon"
    )
    .eq("id", fieldId)
    .eq("user_id", user.id)
    .single()

  return {
    data,
    error,
  }
}

export async function deleteFieldForFieldDetails(
  fieldId: string,
  userId: string
): Promise<PostgrestError | null> {
  const { error } = await supabase
    .from("fields")
    .delete()
    .eq("id", fieldId)
    .eq("user_id", userId)

  return error
}

// fieldEdit.tsx Api Service

type LoadFieldForFieldEditResult = {
  data: FieldEditField | null
  error: PostgrestError | null
}

export async function loadFieldForFieldEdit(
  fieldId: string,
  userId: string
): Promise<LoadFieldForFieldEditResult> {
  const { data, error } = await supabase
    .from("fields")
    .select(
      "id, user_id, name, crop_type, soil_type, note, area_m2, area_ha, center_lat, center_lng, polygon"
    )
    .eq("id", fieldId)
    .eq("user_id", userId)
    .single()

  return {
    data,
    error,
  }
}

export async function updateFieldForFieldEdit(
  fieldId: string,
  userId: string,
  updatedField: FieldUpdate
): Promise<PostgrestError | null> {
  const { error } = await supabase
    .from("fields")
    .update(updatedField)
    .eq("id", fieldId)
    .eq("user_id", userId)

  return error
}

// fields.tsx Api Service

type LoadFieldsForFieldsListResult = {
  data: FieldsListField[] | null
  error: PostgrestError | null
}

export async function loadFieldsForFieldsList(
  userId: string
): Promise<LoadFieldsForFieldsListResult> {
  const { data, error } = await supabase
    .from("fields")
    .select("id, user_id, name, crop_type, soil_type, area_ha")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return {
    data,
    error,
  }
}

export async function deleteFieldForFieldsList(
  fieldId: string,
  userId: string
): Promise<PostgrestError | null> {
  const { error } = await supabase
    .from("fields")
    .delete()
    .eq("id", fieldId)
    .eq("user_id", userId)

  return error
}

// fieldsMap.tsx Api Service

type LoadFieldsForFieldsMapResult = {
  data: FieldsMapField[] | null
  error: PostgrestError | null
}

export async function loadFieldsForFieldsMap(
  userId: string
): Promise<LoadFieldsForFieldsMapResult> {
  const { data, error } = await supabase
    .from("fields")
    .select("id, name, crop_type, soil_type, area_ha, polygon")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return {
    data,
    error,
  }
}

// map.tsx Api Service

export async function createFieldFromMap(
  newField: FieldInsert
): Promise<PostgrestError | null> {
  const { error } = await supabase.from("fields").insert(newField)

  return error
}

export async function saveProfileForProfilePage(
  profileData: ProfileInsert
): Promise<PostgrestError | null> {
  const { error } = await supabase
    .from("profiles")
    .upsert(profileData, { onConflict: "id" })

  return error
}
