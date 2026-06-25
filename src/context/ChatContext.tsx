import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import { getGeminiResponse } from "@/apiService/AiApi"
import { loadProfileFirstNameForChat } from "@/apiService/ProfileApi"
import { useAuth } from "@/context/AuthContext"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

type ChatContextValue = {
  messages: ChatMessage[]
  firstName: string | null
  isLoading: boolean
  errorMessage: string
  sendMessage: (message: string) => Promise<void>
  clearChat: () => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

type ChatProviderProps = {
  children: ReactNode
}

const CHAT_MESSAGES_STORAGE_KEY = "myfarmai-chat-messages"
const GEMINI_MESSAGES_LIMIT = 10

function createMessageId() {
  return `${Date.now()}-${Math.random()}`
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false

  const message = value as ChatMessage

  return (
    typeof message.id === "string" &&
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string"
  )
}

function loadMessagesFromLocalStorage(): ChatMessage[] {
  if (typeof window === "undefined") return []

  try {
    const storedMessages = window.localStorage.getItem(
      CHAT_MESSAGES_STORAGE_KEY
    )

    if (!storedMessages) return []

    const parsedMessages: unknown = JSON.parse(storedMessages)

    if (!Array.isArray(parsedMessages)) return []

    return parsedMessages.filter(isChatMessage)
  } catch {
    return []
  }
}

export function ChatProvider({ children }: ChatProviderProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>(
    loadMessagesFromLocalStorage
  )
  const [firstName, setFirstName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    window.localStorage.setItem(
      CHAT_MESSAGES_STORAGE_KEY,
      JSON.stringify(messages)
    )
  }, [messages])

  useEffect(() => {
    let isCurrent = true

    async function loadFirstName() {
      if (!user?.id) {
        setFirstName(null)
        return
      }

      const profileFirstName = await loadProfileFirstNameForChat(user.id)

      if (isCurrent) {
        setFirstName(profileFirstName)
      }
    }

    loadFirstName()

    return () => {
      isCurrent = false
    }
  }, [user?.id])

  async function sendMessage(message: string) {
    const trimmedMessage = message.trim()

    if (!trimmedMessage || isLoading) return

    setErrorMessage("")

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedMessage,
    }

    const conversation = [...messages, userMessage]
    const recentConversation = conversation.slice(-GEMINI_MESSAGES_LIMIT)

    setMessages(conversation)
    setIsLoading(true)

    try {
      const assistantResponse = await getGeminiResponse(recentConversation)

      const assistantMessage: ChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content: assistantResponse,
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage])
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Antwort konnte nicht geladen werden."
      )
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
        firstName,
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
