import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom"
import { AlertTriangle, ArrowLeft, Home } from "lucide-react"

function ErrorPage() {
  const error = useRouteError()

  let title = "Seite nicht gefunden"
  let message = "Die angeforderte Seite existiert nicht oder wurde verschoben."

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 – Seite nicht gefunden"
      message =
        "Die gesuchte Seite konnte nicht gefunden werden. Bitte prüfe die Adresse oder gehe zurück zur Startseite."
    } else {
      title = `${error.status} – ${error.statusText}`
      message =
        error.data?.message ||
        "Beim Laden dieser Seite ist ein Fehler aufgetreten."
    }
  } else if (error instanceof Error) {
    title = "Unerwarteter Fehler"
    message = error.message
  }

  function handleGoBack() {
    window.history.back()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8ef] px-6 text-gray-900">
      <section className="w-full max-w-xl rounded-3xl bg-white px-8 py-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-11 w-11" />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-green-950">{title}</h1>

        <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-gray-700">
          {message}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center justify-center gap-3 rounded-xl border border-green-700 bg-white px-6 py-4 text-lg font-semibold text-green-800 transition hover:bg-green-50"
          >
            <ArrowLeft className="h-5 w-5" />
            Zurück
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-3 rounded-xl bg-green-700 px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-green-800"
          >
            <Home className="h-5 w-5" />
            Startseite
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ErrorPage
