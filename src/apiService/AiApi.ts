import { supabase } from "@/lib/supabaseClient"

type ChatHistoryMessage = {
  role: "user" | "assistant"
  content: string
}

type ChatFunctionResponse = {
  answer?: string
  error?: string
}

async function readFunctionError(error: unknown) {
  if (
    error &&
    typeof error === "object" &&
    "context" in error &&
    error.context instanceof Response
  ) {
    const data = (await error.context.json().catch(() => null)) as
      | ChatFunctionResponse
      | null

    if (data?.error) {
      return data.error
    }
  }

  return error instanceof Error
    ? error.message
    : "Edge Function konnte nicht aufgerufen werden."
}

export async function getGeminiResponse(
  messages: ChatHistoryMessage[]
): Promise<string> {
  const { data, error } = await supabase.functions.invoke<ChatFunctionResponse>(
    "chat-with-ai",
    {
      body: { messages },
    }
  )

  if (error) {
    throw new Error(await readFunctionError(error))
  }

  if (data?.error) {
    throw new Error(data.error)
  }

  const answer = data?.answer?.trim()

  if (!answer) {
    throw new Error("KI hat keine Antwort zurückgegeben.")
  }

  return answer
}
