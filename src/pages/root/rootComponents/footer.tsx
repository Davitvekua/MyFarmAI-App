import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-6 py-4 text-sm">
        <span>MyFarmAI</span>
        <span>|</span>
        <Link to="/contact" className="hover:underline">
          Kontakt
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
