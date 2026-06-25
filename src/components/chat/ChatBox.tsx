import { useEffect, useRef, useState, type SyntheticEvent } from "react"
import { Bot, Send, Sprout, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@/context/ChatContext"

function ChatBox() {
  const [message, setMessage] = useState("")
  const {
    messages,
    firstName,
    isLoading,
    errorMessage,
    sendMessage,
    clearChat,
  } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const canClearChat =
    !isLoading && (messages.length > 0 || Boolean(errorMessage))

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage || isLoading) return

    setMessage("")
    await sendMessage(trimmedMessage)
  }

  return (
    <Card className="w-full gap-0 overflow-hidden border border-green-100 bg-white py-0 shadow-lg">
      <header className="flex items-center justify-between border-b border-green-100 bg-green-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-800">
            <Sprout className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-white">
              MyFarmAI Assistent
            </h2>
            <p className="text-sm text-white">Bereit für deine Fragen</p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Chatverlauf leeren"
          title="Chatverlauf leeren"
          className="text-white hover:bg-green-100"
          onClick={clearChat}
          disabled={!canClearChat}
        >
          <Trash2 className="size-5" />
        </Button>
      </header>

      <CardContent className="flex max-h-[calc(100vh-20rem)] min-h-100 flex-col gap-5 overflow-y-auto px-6 py-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
            <Bot className="h-5 w-5" />
          </div>
          <div className="max-w-xl rounded-2xl rounded-tl-sm bg-green-50 px-4 py-3 text-base leading-relaxed text-gray-700">
            Hallo{firstName ? ` ${firstName}` : ""}! Ich bin dein MyFarmAI
            Assistent. Wie kann ich dich bei deinen landwirtschaftlichen Flächen
            unterstützen?
          </div>
        </div>

        {messages.map((chatMessage) =>
          chatMessage.role === "assistant" ? (
            <div key={chatMessage.id} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                <Bot className="h-5 w-5" />
              </div>
              <div className="max-w-xl rounded-2xl rounded-tl-sm bg-green-50 px-4 py-3 text-base leading-relaxed whitespace-pre-wrap text-gray-700">
                {chatMessage.content}
              </div>
            </div>
          ) : (
            <div key={chatMessage.id} className="flex justify-end">
              <div className="max-w-xl rounded-2xl rounded-tr-sm bg-green-800 px-4 py-3 text-base leading-relaxed whitespace-pre-wrap text-white">
                {chatMessage.content}
              </div>
            </div>
          )
        )}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
              <Bot className="h-5 w-5" />
            </div>
            <div className="max-w-xl rounded-2xl rounded-tl-sm bg-green-50 px-4 py-3 text-base leading-relaxed text-gray-700">
              Antwort wird erstellt ...
            </div>
          </div>
        )}

        {errorMessage && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      <form
        className="border-t border-green-100 bg-white px-6 py-4"
        onSubmit={handleSubmit}
      >
        <div className="flex items-end gap-3">
          <Textarea
            aria-label="Nachricht an MyFarmAI"
            className="text-bl min-h-11 resize-none border-green-200 pt-2.5 pb-1 text-gray-800 placeholder:text-gray-400 focus-visible:border-green-700 focus-visible:ring-green-700/20"
            placeholder="Stelle MyFarmAI eine Frage ..."
            rows={1}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            aria-label="Nachricht senden"
            className="h-11 bg-green-800 px-4 text-white hover:bg-green-900"
            disabled={!message.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
            Senden
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default ChatBox
