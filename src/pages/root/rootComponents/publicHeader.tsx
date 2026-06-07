import { Sprout } from "lucide-react"
import { Link } from "react-router-dom"

function PublicHeader() {
  return (
    <header className="flex items-center justify-between bg-white px-10 py-5 shadow-sm">
      <div className="flex items-center gap-3 text-3xl font-bold text-green-900">
        <Sprout className="h-10 w-10" />
        <span>MyFarmAI</span>
      </div>

      <nav className="flex items-center gap-8">
        <Link
          to="/"
          className="font-semibold text-gray-800 hover:text-green-800"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 rounded-md bg-green-50 px-4 py-2 font-semibold text-green-900"
        >
          Login-Modus
        </Link>

        <Link
          to="/login"
          className="font-semibold text-gray-800 hover:text-green-800"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="rounded-lg bg-green-700 px-7 py-3 font-semibold text-white shadow-md hover:bg-green-800"
        >
          Registrieren
        </Link>
      </nav>
    </header>
  )
}

export default PublicHeader
