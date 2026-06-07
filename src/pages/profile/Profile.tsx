import { KeyRound, LogOut, Save, User } from "lucide-react"

import profileBackground from "../../assets/profile_background.jpg"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Profile() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${profileBackground})` }}
    >
      <div className="min-h-screen bg-[#f7f8ef]/70">
        <main className="mx-auto max-w-5xl px-6 py-12">
          <Card className="rounded-2xl bg-white/95 p-6 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <User className="h-9 w-9" />
                </div>

                <CardTitle className="text-4xl font-bold text-green-900">
                  Benutzerprofil
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="firstName" className="text-gray-700">
                  Vorname
                </Label>
                <Input id="firstName" value="Max" readOnly />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="lastName" className="text-gray-700">
                  Nachname
                </Label>
                <Input id="lastName" value="Mustermann" readOnly />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="email" className="text-gray-700">
                  E-Mail-Adresse
                </Label>
                <Input id="email" value="max.mustermann@example.com" readOnly />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="country" className="text-gray-700">
                  Land
                </Label>
                <Input id="country" value="Deutschland" readOnly />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="city" className="text-gray-700">
                  Ort
                </Label>
                <Input id="city" value="München" readOnly />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <div />

                <Button className="w-fit bg-green-700 px-8 py-6 text-base font-semibold hover:bg-green-800">
                  <Save className="mr-2 h-5 w-5" />
                  Änderungen speichern
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 rounded-2xl bg-white/95 p-6 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <KeyRound className="h-8 w-8" />
                </div>

                <CardTitle className="text-3xl font-bold text-green-900">
                  Konto
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                <Button
                  variant="outline"
                  className="border-green-700 py-6 text-base font-semibold text-green-800 hover:bg-green-50 hover:text-green-900"
                >
                  <KeyRound className="mr-2 h-5 w-5" />
                  Passwort ändern
                </Button>

                <Button
                  variant="outline"
                  className="border-red-500 py-6 text-base font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default Profile
