import { Sprout } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"

function PublicHeader() {
  const { user } = useAuth()

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
        {user ? (
          <Link
            to="/dashboard"
            className="font-semibold text-gray-800 hover:text-green-800"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="font-semibold text-gray-800 hover:text-green-800"
          >
            Login
          </Link>
        )}

        {user ? (
          <p className="rounded-lg bg-green-50 px-5 py-3 font-semibold text-green-800">
            Bereits angemeldet
          </p>
        ) : (
          <Link
            to="/register"
            className="rounded-lg bg-green-700 px-7 py-3 font-semibold text-white shadow-md hover:bg-green-800"
          >
            Registrieren
          </Link>
        )}
      </nav>
    </header>
  )
}

export default PublicHeader
