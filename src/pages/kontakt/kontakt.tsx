import {
  ArrowLeft,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sprout,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"

import contactBackground from "../../assets/landing-background.jpg"

function Kontakt() {
  return (
    <main
      className="flex min-h-[calc(100vh-140px)] flex-col bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${contactBackground})` }}
    >
      <div className="flex-1 bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Mail className="h-10 w-10" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-green-900">Kontakt</h1>
                <p className="mt-2 text-lg text-gray-700">
                  Bei Fragen zu MyFarmAI kannst du über diese Seite Kontakt
                  aufnehmen.
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

          <section className="grid grid-cols-[1fr_1.2fr] gap-8">
            <div className="rounded-2xl bg-white/95 p-8 shadow-lg">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <Sprout className="h-7 w-7" />
                </div>

                <h2 className="text-3xl font-bold text-green-900">
                  Kontaktdaten
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
                  <User className="h-6 w-6 text-green-800" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Davit Vekua
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
                  <Mail className="h-6 w-6 text-green-800" />
                  <div>
                    <p className="text-sm text-gray-500">E-Mail</p>
                    <p className="text-lg font-semibold text-gray-800">
                      davitvekuavekua@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
                  <Phone className="h-6 w-6 text-green-800" />
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Nicht angegeben
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
                  <MapPin className="h-6 w-6 text-green-800" />
                  <div>
                    <p className="text-sm text-gray-500">Standort</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Deutschland
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/95 p-8 shadow-lg">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <MessageSquare className="h-7 w-7" />
                </div>

                <h2 className="text-3xl font-bold text-green-900">
                  Nachricht senden
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    Name
                  </label>
                  <input
                    readOnly
                    value="Ihr Name"
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    E-Mail-Adresse
                  </label>
                  <input
                    readOnly
                    value="ihre.email@beispiel.de"
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    Betreff
                  </label>
                  <input
                    readOnly
                    value="Frage zu MyFarmAI"
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    Nachricht
                  </label>
                  <textarea
                    readOnly
                    value="Hier kann eine Nachricht eingegeben werden..."
                    className="h-32 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-500 outline-none"
                  />
                </div>

                <button className="flex items-center gap-3 rounded-lg bg-green-700 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-green-800">
                  <Send className="h-5 w-5" />
                  Nachricht senden
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Kontakt
