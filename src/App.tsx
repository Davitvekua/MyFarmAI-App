import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"

import Profile from "./pages/profile/Profile"
import Root from "./pages/root/root"
import ErrorPage from "./pages/errorRoute/errorRoute"
import Landing from "./pages/landing/landing"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import Dashboard from "./pages/dashboard/dashboard"
import Fields from "./pages/fields/fields"
import FieldDetails from "./pages/fieldDetails/fieldDetails"
import FieldEdit from "./pages/fieldEdit/fieldEdit"
import Mapp from "./pages/map/map"
import Kontakt from "./pages/kontakt/kontakt"
import Impressum from "./pages/impressum/impressum"
import FieldsMap from "./pages/fieldsMap/FieldsMap"

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Landing /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },

          {
            path: "dashboard",
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "fields",
            element: (
              <ProtectedRoute>
                <Fields />
              </ProtectedRoute>
            ),
          },
          {
            path: "fields/:fieldId",
            element: (
              <ProtectedRoute>
                <FieldDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: "fields/:fieldId/edit",
            element: (
              <ProtectedRoute>
                <FieldEdit />
              </ProtectedRoute>
            ),
          },
          {
            path: "map",
            element: (
              <ProtectedRoute>
                <Mapp />
              </ProtectedRoute>
            ),
          },

          {
            path: "/fields-map",
            element: (
              <ProtectedRoute>
                <FieldsMap />
              </ProtectedRoute>
            ),
          },

          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },

          { path: "kontakt", element: <Kontakt /> },
          { path: "impressum", element: <Impressum /> },
        ],
      },
    ],
    {
      basename: import.meta.env.BASE_URL,
    }
  )

  return <RouterProvider router={router} />
}

export default App
