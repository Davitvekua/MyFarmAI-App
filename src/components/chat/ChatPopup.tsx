import { type SyntheticEvent, useEffect, useRef, useState } from "react"
import { Bot, MessageCircle, Send, Sprout, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@/context/ChatContext"

function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false)
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
    if (!isOpen) return

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [isOpen, messages, isLoading])

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage || isLoading) return

    setMessage("")
    await sendMessage(trimmedMessage)
  }

  return (
    <div className="fixed right-6 bottom-3 z-1100 flex flex-col items-end gap-3">
      {isOpen && (
        <section
          id="chat-popup"
          className="w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-2xl border border-green-100 bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between bg-green-800 px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-800">
                <Sprout className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-heading font-bold">MyFarmAI Assistent</h2>
                <p className="text-xs text-green-100">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Chatverlauf leeren"
                title="Chatverlauf leeren"
                className="text-white hover:bg-white/15 hover:text-white"
                onClick={clearChat}
                disabled={!canClearChat}
              >
                <Trash2 className="size-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Chat schließen"
                className="text-white hover:bg-white/15 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
          </header>

          <div className="max-h-96 space-y-4 overflow-y-auto bg-[#f7f8ef] px-4 py-5">
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                <Bot className="h-4 w-4" />
              </div>
              <p className="rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 text-sm leading-relaxed text-gray-700 shadow-sm">
                Hallo{firstName ? ` ${firstName}` : ""}! Wie kann ich dir heute
                helfen?
              </p>
            </div>

            {messages.map((chatMessage) =>
              chatMessage.role === "assistant" ? (
                <div key={chatMessage.id} className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                    <Bot className="h-4 w-4" />
                  </div>
                  <p className="rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 text-sm leading-relaxed text-gray-700 shadow-sm">
                    {chatMessage.content}
                  </p>
                </div>
              ) : (
                <div key={chatMessage.id} className="flex justify-end">
                  <p className="rounded-2xl rounded-tr-sm bg-green-800 px-3 py-2.5 text-sm leading-relaxed text-white">
                    {chatMessage.content}
                  </p>
                </div>
              )
            )}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                  <Bot className="h-4 w-4" />
                </div>
                <p className="rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm">
                  Antwort wird erstellt ...
                </p>
              </div>
            )}

            {errorMessage && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="flex gap-2 border-t border-green-100 bg-white p-3"
            onSubmit={handleSubmit}
          >
            <Textarea
              aria-label="Nachricht an MyFarmAI"
              className="max-h-19 min-h-10 resize-none overflow-y-auto border-green-200 text-gray-800 placeholder:text-gray-400 focus-visible:border-green-700 focus-visible:ring-green-700/20"
              placeholder="Nachricht schreiben ..."
              rows={1}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Nachricht senden"
              className="bg-green-800 text-white hover:bg-green-900"
              disabled={!message.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </section>
      )}

      <Button
        type="button"
        size="icon-lg"
        onClick={() => setIsOpen((current) => !current)}
        aria-controls="chat-popup"
        aria-expanded={isOpen}
        aria-label="Chat mit MyFarmAI öffnen"
        className="size-14 rounded-full border-2 border-gray-400 bg-green-800 text-white shadow-lg hover:bg-green-900"
      >
        <MessageCircle className="size-6" />
      </Button>
    </div>
  )
}

export default ChatPopup
