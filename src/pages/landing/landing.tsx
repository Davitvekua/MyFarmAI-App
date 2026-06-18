import {
  Calculator,
  CheckCircle,
  Info,
  LogIn,
  MapPinned,
  Sprout,
  UserPlus,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

import heroPreview from "../../assets/landing-hero-preview.png"
import landingBackground from "../../assets/landing-background.jpg"

function Landing() {
  return (
    <main className="overflow-hidden bg-white text-gray-900">
      <section
        className="grid min-h-92.5 grid-cols-2 items-center bg-cover bg-center px-20 py-12"
        style={{ backgroundImage: `url(${landingBackground})` }}
      >
        <div>
          <h1 className="max-w-xl text-5xl leading-tight font-bold text-green-950">
            Verwalte deine landwirtschaftlichen Flächen digital und
            übersichtlich
          </h1>

          <p className="mt-6 max-w-lg text-xl leading-relaxed text-white">
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
      </section>

      <section className="bg-white px-20 py-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-green-900">
          Was bietet MyFarmAI?
        </h2>

        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8">
          <div className="flex items-center gap-6 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
              <MapPinned className="h-11 w-11" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-900">
                Kartenansicht
              </h3>
              <p className="mt-2 text-gray-700">Flächen auf Karte markieren</p>
            </div>
          </div>

          <div className="flex items-center gap-6 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
              <Sprout className="h-11 w-11" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-900">
                Flächenverwaltung
              </h3>
              <p className="mt-2 text-gray-700">
                Felder anlegen, bearbeiten und löschen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 rounded-xl bg-white p-6 shadow-md">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
              <Calculator className="h-11 w-11" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-900">Berechnung</h3>
              <p className="mt-2 text-gray-700">Größe in m² oder ha anzeigen</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-5xl items-center justify-center gap-3 rounded-lg bg-green-50 px-6 py-3 text-green-950">
          <Info className="h-5 w-5 text-green-700" />
          <p>
            <span className="font-semibold">Hinweis:</span>{" "}
            <span className="italic">
              Diese Funktionen stehen nach Anmeldung zur Verfügung.
            </span>
          </p>
        </div>
      </section>

      <section className="px-20 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl bg-white/90 px-16 py-8 shadow-sm">
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
              Speicherung von Kulturart, Bodenart und Notizen
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-700" />
              Einfache Bearbeitung und Verwaltung eigener Flächen
            </li>
          </ul>
        </div>
      </section>

      <section
        className="bg-cover bg-center px-20 py-8"
        style={{ backgroundImage: `url(${landingBackground})` }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-2xl bg-white/95 px-12 py-8 shadow-lg">
          <div className="flex items-center gap-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
              <Users className="h-12 w-12" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-900">
                Starte mit MyFarmAI
              </h2>
              <p className="mt-3 max-w-md text-gray-700">
                Erstelle ein Konto, um eigene Flächen zu speichern und die
                Kartenfunktionen zu nutzen.
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

            <Link
              to="/login"
              className="flex items-center gap-3 rounded-lg border border-green-800 bg-white px-8 py-4 font-semibold text-green-800 hover:bg-green-50"
            >
              <LogIn className="h-5 w-5" />
              Zum Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
