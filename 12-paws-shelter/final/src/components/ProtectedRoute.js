import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Not logged in → go to /login, and remember where the user wanted to go
  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}

export default ProtectedRoute;
