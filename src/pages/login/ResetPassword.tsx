import { useState } from "react"
import { Mail, Send, X } from "lucide-react"

import { supabase } from "../../lib/supabaseClient"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ResetPasswordProps = {
  onCancel: () => void
}

function ResetPassword({ onCancel }: ResetPasswordProps) {
  const [resetEmail, setResetEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function handleResetPassword(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setErrorMessage("")
    setSuccessMessage("")

    if (!resetEmail.trim()) {
      setErrorMessage("Bitte gib deine E-Mail-Adresse ein.")
      return
    }

    setIsSending(true)

    const redirectTo = new URL(
      "update-password",
      window.location.origin + import.meta.env.BASE_URL
    ).toString()

    const { error } = await supabase.auth.resetPasswordForEmail(
      resetEmail.trim(),
      {
        redirectTo,
      }
    )

    setIsSending(false)

    if (error) {
      setErrorMessage("E-Mail zum Zurücksetzen konnte nicht gesendet werden.")
      return
    }

    setResetEmail("")
    setSuccessMessage(
      "Wenn ein Konto mit dieser E-Mail existiert, wurde eine E-Mail zum Zurücksetzen gesendet."
    )
  }

  return (
    <div className="rounded-2xl border border-green-100 bg-green-50/60 p-5">
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="resetEmail"
            className="text-base font-semibold text-gray-800"
          >
            E-Mail für Passwort-Zurücksetzung
          </Label>

          <div className="relative">
            <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />

            <Input
              id="resetEmail"
              type="email"
              placeholder="ihre.email@beispiel.de"
              value={resetEmail}
              onChange={(event) => setResetEmail(event.target.value)}
              disabled={isSending}
              className="h-13 rounded-xl border border-gray-300 bg-white pl-12 text-base text-gray-700"
            />
          </div>
        </div>

        {errorMessage && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
            {successMessage}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="submit"
            disabled={isSending}
            className="h-10 rounded-xl bg-green-700 font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
          >
            <Send className="mr-2 h-5 w-5" />
            {isSending ? "Wird gesendet..." : "Neues Passwort anfordern"}
          </Button>

          <Button
            type="button"
            onClick={onCancel}
            disabled={isSending}
            className="h-10 rounded-xl border border-green-700 bg-transparent px-5 py-3 font-semibold text-green-800 hover:bg-green-100"
          >
            <X className="mr-2 h-5 w-5" />
            Abbrechen
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
