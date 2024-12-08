import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Adjust as per your auth logic

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;