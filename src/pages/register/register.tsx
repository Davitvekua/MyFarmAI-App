import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Eye,
  EyeOff,
  Globe,
  Lock,
  LogIn,
  Mail,
  MapPin,
  User,
  UserPlus,
} from "lucide-react"

import registerBackground from "../../assets/landing-background.jpg"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUserWithProfile } from "@/apiService/AuthApi"

function Register() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    setErrorMessage("")
    setIsLoading(true)

    const result = await registerUserWithProfile({
      email,
      password,
      firstName,
      lastName,
      country,
      city,
    })

    setIsLoading(false)

    if (!result.success) {
      if (result.reason === "register-failed") {
        setErrorMessage("Registrierung fehlgeschlagen. Bitte Eingaben prüfen.")
        return
      }

      if (result.reason === "user-id-missing") {
        setErrorMessage("Nutzer konnte nicht erstellt werden.")
        return
      }

      setErrorMessage("Profil konnte nicht gespeichert werden.")
      return
    }

    navigate("/login")
  }

  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat px-6 py-10"
      style={{ backgroundImage: `url(${registerBackground})` }}
    >
      <div className="mx-auto flex max-w-5xl justify-center">
        <Card className="w-full max-w-xl rounded-3xl bg-white/95 px-8 py-8 shadow-xl">
          <CardContent className="p-0">
            <h1 className="mb-7 text-5xl font-bold text-green-950">
              Registrierung
            </h1>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-base font-semibold text-gray-800"
                >
                  Vorname
                </Label>

                <div className="relative">
                  <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Ihr Vorname"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-base font-semibold text-gray-800"
                >
                  Nachname
                </Label>

                <div className="relative">
                  <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Ihr Nachname"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-base font-semibold text-gray-800"
                >
                  E-Mail-Adresse
                </Label>

                <div className="relative">
                  <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-base font-semibold text-gray-800"
                >
                  Passwort
                </Label>

                <div className="relative">
                  <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Ihr Passwort"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-13 rounded-xl border-gray-300 px-12 text-base text-gray-700"
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
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="country"
                  className="text-base font-semibold text-gray-800"
                >
                  Land
                </Label>

                <div className="relative">
                  <Globe className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />

                  <select
                    id="country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className="h-13 w-full appearance-none rounded-xl border border-gray-300 bg-white pr-12 pl-12 text-base text-gray-700 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                    required
                  >
                    <option value="">Land auswählen</option>
                    <option value="Österreich">Österreich</option>
                    <option value="Deutschland">Deutschland</option>
                    <option value="Schweiz">Schweiz</option>
                  </select>

                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500">
                    ⌄
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-base font-semibold text-gray-800"
                >
                  Ort
                </Label>

                <div className="relative">
                  <MapPin className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="city"
                    type="text"
                    placeholder="Ihr Ort"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-700"
                    required
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 w-full rounded-xl bg-green-700 text-lg font-semibold text-white shadow-md hover:bg-green-800"
              >
                <UserPlus className="mr-3 h-5 w-5" />
                {isLoading ? "Konto wird erstellt..." : "Konto erstellen"}
              </Button>

              <div className="flex items-center gap-5">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-base text-gray-700">
                  Bereits registriert?
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <Button
                asChild
                variant="outline"
                className="h-14 w-full rounded-xl border-green-800 text-lg font-semibold text-green-800 hover:bg-green-50 hover:text-green-900"
              >
                <Link to="/login">
                  <LogIn className="mr-3 h-5 w-5" />
                  Zum Login
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Register
