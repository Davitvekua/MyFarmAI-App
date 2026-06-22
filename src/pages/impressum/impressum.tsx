import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  Scale,
  Sprout,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"

import impressumBackground from "../../assets/landing-background.jpg"

function Impressum() {
  return (
    <main
      className="flex min-h-[calc(100vh-140px)] flex-col bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${impressumBackground})` }}
    >
      <div className="flex-1 bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <section className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Scale className="h-10 w-10" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-green-900">Impressum</h1>
                <p className="mt-2 text-lg text-gray-700">
                  Rechtliche Angaben zum Anbieter dieser Website.
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg border border-green-700 bg-white px-6 py-3 text-lg font-semibold text-green-800 hover:bg-green-50"
            >
              <ArrowLeft className="h-5 w-5" />
              Zurück
            </Link>
          </section>

          <section className="rounded-2xl bg-white/95 p-8 shadow-lg">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-7 w-7" />
              </div>

              <h2 className="text-3xl font-bold text-green-900">
                Angaben gemäß § 5 TMG
              </h2>
            </div>

            <div className="space-y-5">
              <div className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <User className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Anbieter</h3>
                </div>

                <p className="text-lg text-gray-800">Davit Vekua</p>
                <p className="mt-1 text-gray-600">
                  Musterstraße 1
                  <br />
                  12345 Musterstadt
                  <br />
                  Deutschland
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <Mail className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Kontakt</h3>
                </div>

                <p className="text-gray-600">
                  E-Mail:{" "}
                  <span className="font-semibold text-gray-800">
                    davitvekuavekua@gmail.com
                  </span>
                </p>
                <p className="text-gray-600">
                  Telefon:{" "}
                  <span className="font-semibold text-gray-800">
                    Nicht angegeben
                  </span>
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <Building2 className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Projekt</h3>
                </div>

                <p className="text-gray-600">
                  MyFarmAI ist eine webbasierte Anwendung zur Verwaltung
                  landwirtschaftlicher Flächen. Diese Seite ist Teil eines
                  nicht-kommerziellen Lern- und Entwicklungsprojekts.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <MapPin className="h-6 w-6" />
                  <h3 className="text-xl font-bold">
                    Verantwortlich für den Inhalt
                  </h3>
                </div>

                <p className="text-lg text-gray-800">Davit Vekua</p>
                <p className="mt-1 text-gray-600">
                  Anschrift wie oben angegeben.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <Scale className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Haftungsausschluss</h3>
                </div>

                <p className="text-gray-600">
                  Die Inhalte dieser Website wurden sorgfältig erstellt. Für die
                  Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird
                  jedoch keine Gewähr übernommen.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Impressum
