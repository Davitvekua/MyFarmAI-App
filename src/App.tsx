import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Profile from "./pages/profile/Profile"
import Root from "./pages/root/root"
import ErrorPage from "./pages/errorRoute/errorRoute"
import Landing from "./pages/landing/landing"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import Dashboard from "./pages/dashboard/dashboard"
import Fields from "./pages/fields/fields"
import FieldDetails from "./pages/fieldDetails/fieldDetails"
import Mapp from "./pages/map/map"
import Kontakt from "./pages/kontakt/kontakt"
import Impressum from "./pages/impressum/impressum"

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Landing /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "fields", element: <Fields /> },
        { path: "fields/:fieldId", element: <FieldDetails /> },
        { path: "map", element: <Mapp /> },
        { path: "profile", element: <Profile /> },
        { path: "contact", element: <Kontakt /> },
        { path: "impressum", element: <Impressum /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
