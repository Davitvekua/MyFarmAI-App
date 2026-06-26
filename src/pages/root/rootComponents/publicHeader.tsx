import {
  CircleCheck,
  Grid2X2,
  HomeIcon,
  LogIn,
  Sprout,
  UserPlus,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"

function PublicHeader() {
  const { user } = useAuth()

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-md px-4 py-2 font-medium transition ${
      isActive
        ? "bg-green-800 text-white"
        : "font-semibold text-gray-800 hover:bg-green-50 hover:text-green-900"
    }`

  return (
    <header className="flex items-center justify-between bg-white px-10 py-5 shadow-sm">
      <div className="flex items-center gap-3 text-3xl font-bold text-green-900">
        <Sprout className="h-10 w-10" />
        <span>MyFarmAI</span>
      </div>

      <nav className="flex items-center gap-7">
        <NavLink to="/" className={navLinkClass}>
          <HomeIcon className="h-5 w-5" />
          Home
        </NavLink>
        {user ? (
          <NavLink to="/dashboard" className={navLinkClass}>
            <Grid2X2 className="h-5 w-5" />
            Dashboard
          </NavLink>
        ) : (
          <NavLink to="/login" className={navLinkClass}>
            <LogIn className="h-5 w-5" />
            Login
          </NavLink>
        )}

        {user ? (
          <p className="flex items-center gap-2 rounded-lg bg-green-50 px-5 py-3 font-semibold text-green-800">
            <CircleCheck className="h-5 w-5" />
            Sie sind bereits angemeldet
          </p>
        ) : (
          <NavLink to="/register" className={navLinkClass}>
            <UserPlus className="h-5 w-5" />
            Registrieren
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default PublicHeader
