import { createContext, useContext, useState, type ReactNode } from "react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

type ChatContextValue = {
  messages: ChatMessage[]
  isLoading: boolean
  errorMessage: string
  sendMessage: (message: string) => Promise<void>
  clearChat: () => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

type ChatProviderProps = {
  children: ReactNode
}

function createMessageId() {
  return `${Date.now()}-${Math.random()}`
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function sendMessage(message: string) {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) return

    setErrorMessage("")

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedMessage,
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setIsLoading(true)

    try {
      // Später wird hier AiApi.ts benutzt.
      // Aktuell ist es nur eine Test-Antwort.
      await new Promise((resolve) => window.setTimeout(resolve, 600))

      const assistantMessage: ChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content:
          "Das ist eine Test-Antwort vom MyFarmAI Assistenten. Die echte KI wird später verbunden.",
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage])
    } catch {
      setErrorMessage("Antwort konnte nicht geladen werden.")
    } finally {
      setIsLoading(false)
    }
  }

  function clearChat() {
    setMessages([])
    setErrorMessage("")
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        errorMessage,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error("useChat muss innerhalb von ChatProvider verwendet werden.")
  }

  return context
}
