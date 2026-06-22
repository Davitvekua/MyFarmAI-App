import { Outlet, useLocation } from "react-router-dom"
import PublicHeader from "./rootComponents/publicHeader"
import PrivateHeader from "./rootComponents/privatHeader"
import Footer from "./rootComponents/footer"

function Root() {
  const location = useLocation()

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/reset-password",
    "/update-password",
    "/kontakt",
    "/impressum",
  ]

  const isPublicRoute = publicRoutes.includes(location.pathname)

  return (
    <div className="flex min-h-screen flex-col">
      {isPublicRoute ? <PublicHeader /> : <PrivateHeader />}

      <main className="flex flex-1 flex-col [&>main]:flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Root
