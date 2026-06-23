import { NavLink, Link, useNavigate } from "react-router-dom"
import {
  Grid2X2,
  LogOut,
  Map,
  MapPin,
  MessageCircle,
  Sprout,
  UserRound,
} from "lucide-react"

import { useAuth } from "../../../context/AuthContext"

function PrivateHeader() {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  async function handleLogout() {
    await signOut()
    navigate("/login")
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-md px-4 py-2 font-medium transition ${
      isActive
        ? "bg-green-100 text-green-900"
        : "text-gray-700 hover:bg-green-50 hover:text-green-900"
    }`

  return (
    <header className="flex items-center justify-between bg-white px-10 py-5 shadow-sm">
      <Link
        to="/dashboard"
        className="flex items-center gap-3 text-3xl font-bold text-green-900"
      >
        <Sprout className="h-9 w-9" />
        <span>MyFarmAI</span>
      </Link>

      <nav className="flex items-center gap-4">
        <NavLink to="/dashboard" className={navLinkClass}>
          <Grid2X2 className="h-5 w-5" />
          Dashboard
        </NavLink>

        <NavLink to="/fields" className={navLinkClass}>
          <Sprout className="h-5 w-5" />
          Flächen
        </NavLink>

        <NavLink to="/map" className={navLinkClass}>
          <MapPin className="h-5 w-5" />
          Fläche anlegen
        </NavLink>

        <NavLink to="/fields-map" className={navLinkClass}>
          <Map className="h-5 w-5" />
          Flächenkarte
        </NavLink>

        <NavLink to="/chat" className={navLinkClass}>
          <MessageCircle className="h-5 w-5" />
          KI-Assistent
        </NavLink>

        <NavLink to="/profile" className={navLinkClass}>
          <UserRound className="h-5 w-5" />
          Profil
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md px-4 py-2 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-900"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </nav>
    </header>
  )
}

export default PrivateHeader
