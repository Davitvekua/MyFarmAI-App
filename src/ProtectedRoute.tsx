import { Navigate } from "react-router-dom"

import { useAuth } from "./context/AuthContext"

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, isLoading } = useAuth()

  if (isLoading) {
    return <p className="p-10 text-center text-lg">Wird geladen...</p>
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
