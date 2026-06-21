import type { Tables, TablesInsert, TablesUpdate } from "./supabaseTypes"

// Types from Supabase

export type Field = Tables<"fields">
export type FieldInsert = TablesInsert<"fields">
export type FieldUpdate = TablesUpdate<"fields">

export type Profile = Tables<"profiles">
export type ProfileInsert = TablesInsert<"profiles">
export type ProfileUpdate = TablesUpdate<"profiles">

// Custom Types

export type DashboardField = Pick<
  Field,
  "id" | "name" | "crop_type" | "soil_type" | "area_ha"
>

export type FieldDetailsField = Pick<
  Field,
  | "id"
  | "user_id"
  | "name"
  | "crop_type"
  | "soil_type"
  | "note"
  | "area_m2"
  | "area_ha"
  | "center_lat"
  | "center_lng"
  | "polygon"
>

export type FieldEditField = Pick<
  Field,
  | "id"
  | "user_id"
  | "name"
  | "crop_type"
  | "soil_type"
  | "note"
  | "area_m2"
  | "area_ha"
  | "center_lat"
  | "center_lng"
  | "polygon"
>

export type FieldsListField = Pick<
  Field,
  "id" | "user_id" | "name" | "crop_type" | "soil_type" | "area_ha"
>

export type FieldsMapField = Pick<
  Field,
  "id" | "name" | "crop_type" | "soil_type" | "area_ha" | "polygon"
>

export type ProfileData = Pick<
  Profile,
  "first_name" | "last_name" | "country" | "city"
>
