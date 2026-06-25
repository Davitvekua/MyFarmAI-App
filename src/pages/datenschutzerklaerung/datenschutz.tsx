import {
  ArrowLeft,
  Bot,
  Database,
  Lock,
  Mail,
  ShieldCheck,
  Sprout,
  UserRound,
} from "lucide-react"
import { Link } from "react-router-dom"

import privacyBackground from "../../assets/landing-background.jpg"

function Datenschutz() {
  return (
    <main
      className="flex min-h-[calc(100vh-140px)] flex-col bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${privacyBackground})` }}
    >
      <div className="flex-1 bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <section className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                <ShieldCheck className="h-10 w-10" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-green-900">
                  Datenschutzerklärung
                </h1>
                <p className="mt-2 text-lg text-gray-700">
                  Informationen zur Verarbeitung personenbezogener Daten in
                  MyFarmAI.
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
                Datenschutz bei MyFarmAI
              </h2>
            </div>

            <div className="space-y-5">
              <article className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <Database className="h-6 w-6" />
                  <h3 className="text-xl font-bold">
                    Verarbeitete Nutzerdaten
                  </h3>
                </div>

                <p className="text-gray-600">
                  Bei der Nutzung von MyFarmAI können insbesondere
                  Registrierungs- und Profildaten wie E-Mail-Adresse, Vorname,
                  Land und Stadt verarbeitet werden. Zusätzlich werden die vom
                  Nutzer angelegten Flächendaten gespeichert, zum Beispiel
                  Flächenname, Flächenanzahl, Bodenart, Kulturart, Größe,
                  Notizen und Kartendaten der eingezeichneten Flächen.
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <Bot className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Nutzung des KI-Chatbots</h3>
                </div>

                <p className="text-gray-600">
                  Der integrierte KI-Chatbot verwendet automatisch ausgewählte
                  Informationen aus dem Nutzerprofil und aus den gespeicherten
                  Flächen, damit Antworten besser zum landwirtschaftlichen
                  Kontext passen. Dazu gehören insbesondere Vorname, Land, Stadt
                  sowie Informationen zu den gespeicherten Flächen, wie Anzahl
                  der Flächen, Bodenarten und Kulturarten. Diese Daten werden
                  zusammen mit der jeweiligen Chatnachricht verarbeitet, um eine
                  passende Antwort zu erzeugen.
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <UserRound className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Zweck der Verarbeitung</h3>
                </div>

                <p className="text-gray-600">
                  Die Daten werden verarbeitet, um Nutzerkonten bereitzustellen,
                  landwirtschaftliche Flächen digital zu speichern und zu
                  verwalten, Kartenfunktionen anzubieten und den KI-Assistenten
                  mit relevanten Informationen für hilfreiche Antworten zu
                  versorgen. Ohne diese Verarbeitung können zentrale Funktionen
                  der Anwendung nicht oder nur eingeschränkt genutzt werden.
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <Lock className="h-6 w-6" />
                  <h3 className="text-xl font-bold">
                    Speicherung und Sicherheit
                  </h3>
                </div>

                <p className="text-gray-600">
                  Die Daten werden nur im erforderlichen Umfang gespeichert und
                  durch technische und organisatorische Maßnahmen geschützt. Der
                  Zugriff auf nutzerbezogene Daten ist auf den jeweiligen
                  angemeldeten Nutzer und die für den Betrieb notwendigen
                  Systemfunktionen beschränkt.
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <ShieldCheck className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Rechte der Nutzer</h3>
                </div>

                <p className="text-gray-600">
                  Nutzer haben im Rahmen der gesetzlichen Voraussetzungen das
                  Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
                  Verarbeitung und Datenübertragbarkeit. Außerdem kann einer
                  Verarbeitung widersprochen werden, soweit die gesetzlichen
                  Voraussetzungen dafür vorliegen.
                </p>
              </article>

              <article className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <div className="mb-3 flex items-center gap-3 text-green-900">
                  <Mail className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Kontakt</h3>
                </div>

                <p className="text-gray-600">
                  Fragen zum Datenschutz können per E-Mail an{" "}
                  <span className="font-semibold text-gray-800">
                    davitvekua23@gmail.com
                  </span>{" "}
                  gerichtet werden.
                </p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Datenschutz
