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
    "/update-password",
    "/kontakt",
    "/impressum",
  ]

  const isPublicRoute = publicRoutes.includes(location.pathname)

  return (
    <>
      {isPublicRoute ? <PublicHeader /> : <PrivateHeader />}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default Root
