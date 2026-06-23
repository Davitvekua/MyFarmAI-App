import { MessageCircle } from "lucide-react"

import chatBackground from "../../assets/landing-background.jpg"

import ChatBox from "@/components/chat/ChatBox"

function Chat() {
  return (
    <main
      className="flex min-h-[calc(100vh-140px)] flex-col bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${chatBackground})` }}
    >
      <div className="flex-1 bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-800 text-green-50">
              <MessageCircle className="h-8 w-8" />
            </div>

            <div>
              <h1 className="text-5xl font-bold text-green-900">
                MyFarmAI Assistent
              </h1>
              <p className="mt-2 text-lg text-gray-700">
                Stelle Fragen zu deinen landwirtschaftlichen Flächen.
              </p>
            </div>
          </section>

          <ChatBox />
        </div>
      </div>
    </main>
  )
}

export default Chat
