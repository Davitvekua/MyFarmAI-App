import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Mail, Send } from "lucide-react"

import { supabase } from "../../lib/supabaseClient"
import updatePasswordBackground from "../../assets/landing-background.jpg"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ResetPassword() {
  const [resetEmail, setResetEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
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
    <main
      className="min-h-[calc(100vh-140px)] bg-[#f7f8ef] px-6 py-12 text-gray-900"
      style={{
        backgroundImage: `url(${updatePasswordBackground})`,
        backgroundPosition: "center -100px",
      }}
    >
      <section className="mx-auto max-w-xl rounded-2xl bg-white/95 p-8 shadow-lg">
        <div className="mb-8">
          <Link
            to="/login"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Login
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800">
              <Mail className="h-8 w-8" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-green-900">
                Passwort zurücksetzen
              </h1>
              <p className="mt-2 text-gray-700">
                Gib deine E-Mail-Adresse ein. Du erhältst danach einen Link zum
                Festlegen eines neuen Passworts.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="resetEmail"
              className="text-base font-semibold text-gray-800"
            >
              E-Mail-Adresse
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
                className="h-13 rounded-xl border border-gray-400 bg-white pl-12 text-base text-gray-700"
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

          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button
              type="submit"
              disabled={isSending}
              className="h-12 rounded-xl bg-green-700 font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
            >
              <Send className="mr-2 h-5 w-5" />
              {isSending ? "Wird gesendet..." : "Neues Passwort anfordern"}
            </Button>

            <Link
              to="/login"
              className="flex h-12 items-center justify-center rounded-xl border border-green-700 bg-white px-5 font-semibold text-green-800 hover:bg-green-50"
            >
              Abbrechen
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}

export default ResetPassword
