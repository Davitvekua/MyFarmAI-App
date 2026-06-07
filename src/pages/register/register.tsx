import { Link } from "react-router-dom"
import {
  Eye,
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

function Register() {
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

            <div className="space-y-4">
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
                    value="Ihr Vorname"
                    readOnly
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-500"
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
                    value="Ihr Nachname"
                    readOnly
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-500"
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
                    value="ihre.email@beispiel.de"
                    readOnly
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-500"
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
                    type="text"
                    value="Ihr Passwort"
                    readOnly
                    className="h-13 rounded-xl border-gray-300 px-12 text-base text-gray-500"
                  />
                  <Eye className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
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
                  <Input
                    id="country"
                    value="Land auswählen"
                    readOnly
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-500"
                  />
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
                    value="Ihr Ort"
                    readOnly
                    className="h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-500"
                  />
                </div>
              </div>

              <Button className="h-14 w-full rounded-xl bg-green-700 text-lg font-semibold text-white shadow-md hover:bg-green-800">
                <UserPlus className="mr-3 h-5 w-5" />
                Konto erstellen
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
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Register
