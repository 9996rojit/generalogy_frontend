import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import LocalStorageUtil from '../hooks/localStorage';
interface GuestRouteProps {
  children: ReactNode;
}

function GuestRoute({ children }: GuestRouteProps) {
  const isAuthenticated = !LocalStorageUtil.getItem('authToken'); // Adjust as per your auth logic

  return isAuthenticated ? children : <Navigate to="/dashboard  " replace />;
}


export default GuestRoute;