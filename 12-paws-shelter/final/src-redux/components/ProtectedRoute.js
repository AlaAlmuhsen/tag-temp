import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // Not logged in → go to /login, and remember where the user wanted to go
  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}

export default ProtectedRoute;
