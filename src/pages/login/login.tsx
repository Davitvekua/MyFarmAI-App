import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react"

import loginBackground from "../../assets/landing-background.jpg"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/apiService/AuthApi"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    setErrorMessage("")
    setIsLoading(true)

    const error = await loginUser(email, password)

    setIsLoading(false)

    if (error) {
      setErrorMessage("Login fehlgeschlagen. Bitte E-Mail und Passwort prüfen.")
      return
    }

    navigate("/dashboard")
  }

  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat px-6 py-20"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="mx-auto flex max-w-5xl justify-center">
        <Card className="w-full max-w-xl rounded-3xl bg-white/95 px-8 py-10 shadow-xl">
          <CardContent className="p-0">
            <h1 className="mb-10 text-5xl font-bold text-green-800">Login</h1>

            <form onSubmit={handleLogin} className="space-y-7">
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-lg font-semibold text-gray-800"
                >
                  E-Mail-Adresse
                </Label>

                <div className="relative">
                  <Mail className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-500" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-16 rounded-xl border-gray-300 pl-14 text-lg text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="text-lg font-semibold text-gray-800"
                >
                  Passwort
                </Label>

                <div className="relative">
                  <Lock className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-500" />

                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Ihr Passwort"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-16 rounded-xl border-gray-300 px-14 text-lg text-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                    aria-label={
                      isPasswordVisible
                        ? "Passwort verbergen"
                        : "Passwort anzeigen"
                    }
                    aria-pressed={isPasswordVisible}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                </div>

                <Link
                  to="/reset-password"
                  className="text-sm font-semibold text-green-800 hover:text-green-900"
                >
                  Passwort vergessen?
                </Link>
              </div>

              {errorMessage && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="h-16 w-full rounded-xl bg-green-700 text-xl font-semibold text-white shadow-md hover:bg-green-800"
              >
                <LogIn className="mr-3 h-6 w-6" />
                {isLoading ? "Wird angemeldet..." : "Anmelden"}
              </Button>

              <div className="flex items-center gap-5">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-lg text-gray-700">Noch kein Konto?</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <Button
                asChild
                variant="outline"
                className="h-16 w-full rounded-xl border-green-800 text-xl font-semibold text-green-800 hover:bg-green-50 hover:text-green-900"
              >
                <Link to="/register">
                  <LogIn className="mr-3 h-6 w-6" />
                  Zur Registrierung
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Login
