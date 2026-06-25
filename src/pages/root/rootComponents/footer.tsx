import { Link } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"

function Footer() {
  const { user } = useAuth()
  const homePath = user ? "/dashboard" : "/"

  return (
    <footer className="bg-green-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-6 py-4 text-sm">
        <Link to={homePath} className="hover:underline">
          MyFarmAI
        </Link>
        <span>|</span>
        <Link to="/datenschutz" className="hover:underline">
          Datenschutzerklärung
        </Link>
        <span>|</span>
        <Link to="/impressum" className="hover:underline">
          Impressum
        </Link>
      </div>
    </footer>
  )
}

export default Footer
