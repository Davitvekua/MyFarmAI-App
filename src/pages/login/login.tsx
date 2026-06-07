import { Link } from "react-router-dom"
import { Lock, LogIn, Mail } from "lucide-react"

import loginBackground from "../../assets/landing-background.jpg"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Login() {
  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat px-6 py-20"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="mx-auto flex max-w-5xl justify-center">
        <Card className="w-full max-w-xl rounded-3xl bg-white/95 px-8 py-10 shadow-xl">
          <CardContent className="p-0">
            <h1 className="mb-10 text-5xl font-bold text-green-950">Login</h1>

            <div className="space-y-7">
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
                    value="ihre.email@beispiel.de"
                    readOnly
                    className="h-16 rounded-xl border-gray-300 pl-14 text-lg text-gray-500"
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
                    type="text"
                    value="Ihr Passwort"
                    readOnly
                    className="h-16 rounded-xl border-gray-300 pl-14 text-lg text-gray-500"
                  />
                </div>
              </div>

              <Button className="h-16 w-full rounded-xl bg-green-700 text-xl font-semibold text-white shadow-md hover:bg-green-800">
                <LogIn className="mr-3 h-6 w-6" />
                Anmelden
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
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Login
