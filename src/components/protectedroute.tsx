import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import LocalStorageUtil from '../hooks/localStorage';
interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = !!LocalStorageUtil.getItem('authToken'); // Adjust as per your auth logic

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}


export default ProtectedRoute;