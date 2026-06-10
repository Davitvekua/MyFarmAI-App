import type { Tables, TablesInsert, TablesUpdate } from "./supabaseTypes"

export type Field = Tables<"fields">
export type FieldInsert = TablesInsert<"fields">
export type FieldUpdate = TablesUpdate<"fields">

export type Profile = Tables<"profiles">
export type ProfileInsert = TablesInsert<"profiles">
export type ProfileUpdate = TablesUpdate<"profiles">
