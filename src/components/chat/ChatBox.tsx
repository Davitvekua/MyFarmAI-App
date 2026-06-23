import { Bot, Send, Sprout } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

function ChatBox() {
  return (
    <Card className="w-full gap-0 overflow-hidden border border-green-100 bg-white py-0 shadow-lg">
      <header className="flex items-center gap-3 border-b border-green-100 bg-green-50 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 text-white">
          <Sprout className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-green-900">
            MyFarmAI Assistent
          </h2>
          <p className="text-sm text-green-800">Bereit für deine Fragen</p>
        </div>
      </header>

      <CardContent className="flex min-h-100 flex-col gap-5 px-6 py-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
            <Bot className="h-5 w-5" />
          </div>
          <div className="max-w-xl rounded-2xl rounded-tl-sm bg-green-50 px-4 py-3 text-base leading-relaxed text-gray-700">
            Hallo! Ich bin dein MyFarmAI Assistent. Wie kann ich dich bei deinen
            landwirtschaftlichen Flächen unterstützen?
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-xl rounded-2xl rounded-tr-sm bg-green-800 px-4 py-3 text-base leading-relaxed text-white">
            Welche Informationen kann ich zu meinen Flächen verwalten?
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
            <Bot className="h-5 w-5" />
          </div>
          <div className="max-w-xl rounded-2xl rounded-tl-sm bg-green-50 px-4 py-3 text-base leading-relaxed text-gray-700">
            Du kannst beispielsweise Flächennamen, Größen, Kulturen und Notizen
            zu deinen Feldern verwalten.
          </div>
        </div>
      </CardContent>

      <div className="border-t border-green-100 bg-white px-6 py-4">
        <div className="flex items-end gap-3">
          <Textarea
            aria-label="Nachricht an MyFarmAI"
            className="min-h-11 resize-none border-green-200 focus-visible:border-green-700 focus-visible:ring-green-700/20"
            placeholder="Stelle MyFarmAI eine Frage ..."
            rows={1}
          />
          <Button
            type="button"
            aria-label="Nachricht senden"
            className="h-11 bg-green-800 px-4 text-white hover:bg-green-900"
          >
            <Send className="h-5 w-5" />
            Senden
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ChatBox
