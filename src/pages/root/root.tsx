import { matchPath, Outlet, useLocation } from "react-router-dom"

import PublicHeader from "./rootComponents/publicHeader"
import PrivateHeader from "./rootComponents/privatHeader"
import Footer from "./rootComponents/footer"
import ChatPopup from "@/components/chat/ChatPopup"

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

  const routesWithoutChatPopup = [...publicRoutes, "/profile", "/chat"]

  // const isPublicRoute = publicRoutes.includes(location.pathname)

  const isPublicRoute = publicRoutes.some((route) =>
    Boolean(matchPath({ path: route, end: true }, location.pathname))
  )

  const shouldShowChatPopup = !routesWithoutChatPopup.some((route) =>
    Boolean(matchPath({ path: route, end: true }, location.pathname))
  )

  return (
    <div className="flex min-h-screen flex-col">
      {isPublicRoute ? <PublicHeader /> : <PrivateHeader />}

      <main className="flex flex-1 flex-col [&>main]:flex-1">
        <Outlet />
      </main>

      {shouldShowChatPopup && <ChatPopup />}

      <Footer />
    </div>
  )
}

export default Root
