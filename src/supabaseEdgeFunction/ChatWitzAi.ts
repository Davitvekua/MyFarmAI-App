// Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts"
// import { withSupabase } from "jsr:@supabase/server@^1"

// type ChatMessage = {
//   role: "user" | "assistant"
//   content: string
// }

// type ReqPayload = {
//   messages: ChatMessage[]
// }

// type GeminiResponse = {
//   candidates?: Array<{
//     content?: {
//       parts?: Array<{
//         text?: string
//       }>
//     }
//   }>
//   error?: {
//     message?: string
//   }
// }

// const GEMINI_MODEL = "gemini-2.5-flash"

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
// }

// function jsonResponse(body: unknown, status = 200) {
//   return Response.json(body, {
//     status,
//     headers: corsHeaders,
//   })
// }

// function formatContextValue(value: string | null | undefined) {
//   return value?.trim() || "Nicht hinterlegt"
// }

// function isValidMessages(messages: unknown): messages is ChatMessage[] {
//   return (
//     Array.isArray(messages) &&
//     messages.every(
//       (message) =>
//         typeof message === "object" &&
//         message !== null &&
//         ((message as ChatMessage).role === "user" ||
//           (message as ChatMessage).role === "assistant") &&
//         typeof (message as ChatMessage).content === "string"
//     )
//   )
// }

// const chatHandler = withSupabase({ auth: "user" }, async (req, ctx) => {
//   if (req.method !== "POST") {
//     return jsonResponse({ error: "Methode nicht erlaubt." }, 405)
//   }

//   const apiKey = Deno.env.get("GEMINI_API_KEY")

//   if (!apiKey) {
//     return jsonResponse({ error: "Gemini API-Schlüssel fehlt." }, 500)
//   }

//   const userId = ctx.userClaims?.sub ?? ctx.userClaims?.id

//   if (!userId) {
//     return jsonResponse({ error: "Nutzer konnte nicht erkannt werden." }, 401)
//   }

//   const body = (await req.json().catch(() => null)) as ReqPayload | null

//   if (!body || !isValidMessages(body.messages)) {
//     return jsonResponse({ error: "Ungültiger Chatverlauf." }, 400)
//   }

//   const [profileResult, fieldsResult] = await Promise.all([
//     ctx.supabase
//       .from("profiles")
//       .select("first_name, country, city")
//       .eq("id", userId)
//       .maybeSingle(),
//     ctx.supabase
//       .from("fields")
//       .select("name, soil_type, crop_type")
//       .eq("user_id", userId)
//       .order("created_at", { ascending: false }),
//   ])

//   if (profileResult.error) {
//     return jsonResponse(
//       { error: "Profilkontext konnte nicht geladen werden." },
//       500
//     )
//   }

//   if (fieldsResult.error) {
//     return jsonResponse(
//       { error: "Flächenkontext konnte nicht geladen werden." },
//       500
//     )
//   }

//   const profile = profileResult.data
//   const fields = fieldsResult.data

//   const profileContext = [
//     `Vorname: ${formatContextValue(profile?.first_name)}`,
//     `Land: ${formatContextValue(profile?.country)}`,
//     `Stadt: ${formatContextValue(profile?.city)}`,
//   ].join("\n")

//   const fieldsContext =
//     fields && fields.length > 0
//       ? fields
//           .map(
//             (field) =>
//               `- ${formatContextValue(field.name)}: Bodenart ${formatContextValue(
//                 field.soil_type
//               )}, Kulturart ${formatContextValue(field.crop_type)}`
//           )
//           .join("\n")
//       : "Keine gespeicherten Flächen vorhanden."

//   const dynamicContext = `Nutzerprofil:\n${profileContext}\n\nGespeicherte Flächen:\n${fieldsContext}`

//   const geminiResponse = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(
//       apiKey
//     )}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         systemInstruction: {
//           parts: [
//             {
//               text: `Du bist der MyFarmAI Assistent. Antworte auf Deutsch, hilfreich, präzise und praxisorientiert zu landwirtschaftlichen Themen.

// Berücksichtige bei deinen Antworten den folgenden dynamischen Nutzer- und Flächenkontext. Wenn Daten nicht hinterlegt sind, weise nicht ungefragt darauf hin.

// ${dynamicContext}`,
//             },
//           ],
//         },
//         contents: body.messages.map((message) => ({
//           role: message.role === "assistant" ? "model" : "user",
//           parts: [{ text: message.content }],
//         })),
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 512,
//         },
//       }),
//     }
//   )

//   const data = (await geminiResponse
//     .json()
//     .catch(() => null)) as GeminiResponse | null

//   if (!geminiResponse.ok) {
//     return jsonResponse(
//       {
//         error: data?.error?.message ?? "Gemini konnte keine Antwort erstellen.",
//       },
//       500
//     )
//   }

//   const answer = data?.candidates?.[0]?.content?.parts
//     ?.map((part) => part.text ?? "")
//     .join("")
//     .trim()

//   if (!answer) {
//     return jsonResponse(
//       { error: "Gemini hat keine Antwort zurückgegeben." },
//       500
//     )
//   }

//   return jsonResponse({ answer })
// })

// export default {
//   async fetch(req: Request) {
//     if (req.method === "OPTIONS") {
//       return new Response("ok", {
//         status: 200,
//         headers: corsHeaders,
//       })
//     }

//     return chatHandler(req)
//   },
// }
