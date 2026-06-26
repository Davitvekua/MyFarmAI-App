import {
  Bot,
  Calculator,
  CheckCircle,
  Info,
  LogIn,
  LogOut,
  MapPinned,
  MessageCircle,
  Sprout,
  UserPlus,
  Users,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import heroPreview from "../../assets/landing-hero-preview.png"
import landingBackground from "../../assets/landing-background.jpg"

import StatsCard from "@/components/StatsCard"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/apiService/AuthApi"
import { useState } from "react"

function Landing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  async function handleLogout() {
    const error = await logoutUser()

    if (error) {
      setErrorMessage("Logout fehlgeschlagen.")
      return
    }

    navigate("/login")
  }

  return (
    <main className="overflow-hidden bg-white text-gray-900">
      <section
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${landingBackground})`,
        }}
      >
        <div className="mx-auto grid min-h-92.5 max-w-6xl grid-cols-2 items-center px-6 py-12">
          <div>
            <h1 className="max-w-xl text-5xl leading-tight font-bold text-green-900">
              Verwalte deine landwirtschaftlichen Flächen digital und
              KI-gestützt
            </h1>

            <p className="mt-6 max-w-lg text-xl leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.65)]">
              MyFarmAI hilft dir, Flächen auf einer Karte zu erfassen, zu
              speichern und zu verwalten.
            </p>

            <div className="mt-8 flex gap-5">
              <Link
                to="/register"
                className="flex items-center gap-3 rounded-lg bg-green-700 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-green-800"
              >
                <UserPlus className="h-6 w-6" />
                Jetzt registrieren
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-3 rounded-lg border border-green-800 bg-white/80 px-8 py-4 text-lg font-semibold text-green-800 hover:bg-green-50"
              >
                <LogIn className="h-6 w-6" />
                Anmelden
              </Link>
            </div>
          </div>

          <div className="flex justify-end">
            <img
              src={heroPreview}
              alt="MyFarmAI Karten-Vorschau"
              className="w-162.5 rounded-2xl object-cover drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-center text-3xl font-bold text-green-900">
            Was bietet MyFarmAI?
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <StatsCard
              label="Interaktive Kartenansicht"
              value="Flächen direkt auf der Karte markieren, speichern und später wiederfinden."
              icon={MapPinned}
              variant="feature"
            />
            <StatsCard
              label="Flächenverwaltung"
              value="Eigene Felder anlegen, bearbeiten und mit Bodenart, Kulturart und Notizen verwalten."
              icon={Sprout}
              variant="feature"
            />
            <StatsCard
              label="Automatische Berechnung"
              value="Die Größe deiner eingezeichneten Flächen wird übersichtlich in m² und Hektar angezeigt."
              icon={Calculator}
              variant="feature"
            />
            <StatsCard
              label="KI-Assistent"
              value="Stelle Fragen zu deinen Flächen und erhalte Antworten mit Bezug zu Profil, Bodenart und Kulturart."
              icon={Bot}
              variant="feature"
            />
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-50 px-6 py-3 text-green-950">
            <Info className="h-5 w-5 text-green-700" />
            <p>
              <span className="font-semibold">Hinweis:</span>{" "}
              <span className="italic">
                Karten-, Flächen- und KI-Funktionen stehen nach Anmeldung zur
                Verfügung.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between rounded-2xl bg-white/90 px-16 py-8 shadow-sm">
            <div className="flex items-center gap-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-14 w-14" />
              </div>

              <h2 className="text-3xl font-bold text-green-900">
                Warum MyFarmAI?
              </h2>
            </div>

            <ul className="space-y-3 text-gray-800">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-700" />
                Zentrale Verwaltung landwirtschaftlicher Flächen
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-700" />
                Übersichtliche Darstellung auf einer Karte
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-700" />
                Speicherung von Kulturart, Bodenart, Größe und Notizen
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-700" />
                KI-gestützte Antworten auf landwirtschaftliche Fragen
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-700" />
                Kontextbezogene Hilfe anhand deiner gespeicherten Flächen
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8ef] py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center rounded-2xl bg-white px-12 py-8 shadow-sm">
            <div className="flex w-full items-center gap-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
                <MessageCircle className="h-12 w-12" />
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-green-900">
                  KI-Assistent für deine Flächen
                </h2>
                <p className="mt-3 leading-relaxed text-gray-700">
                  Der Chatbot berücksichtigt dein Profil und deine gespeicherten
                  Flächen, zum Beispiel Vorname, Land, Stadt, Bodenart und
                  Kulturart. Dadurch kann er praxisnäher antworten und Fragen
                  besser auf deine landwirtschaftliche Situation beziehen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {errorMessage && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}
      <section
        className="bg-cover bg-center py-8"
        style={{ backgroundImage: `url(${landingBackground})` }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/95 px-12 py-8 shadow-lg">
            <div className="flex items-center gap-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Users className="h-12 w-12" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-green-900">
                  Starte mit MyFarmAI
                </h2>
                <p className="mt-3 max-w-md text-gray-700">
                  Erstelle ein Konto, um eigene Flächen zu speichern, die
                  Kartenfunktionen zu nutzen und den KI-Assistenten zu befragen.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <Link
                to="/register"
                className="flex items-center gap-3 rounded-lg bg-green-700 px-8 py-4 font-semibold text-white shadow-md hover:bg-green-800"
              >
                <UserPlus className="h-5 w-5" />
                Kostenlos registrieren
              </Link>

              {user ? (
                <Button
                  type="button"
                  onClick={handleLogout}
                  variant="destructive"
                  className="h-14 rounded-xl border-red-500 px-4 text-lg font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-3 size-6" />
                  Logout
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-3 rounded-lg border border-green-800 bg-white px-8 py-4 font-semibold text-green-800 hover:bg-green-50"
                >
                  <LogIn className="h-5 w-5" />
                  Zum Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
