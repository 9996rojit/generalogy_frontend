
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/register';
import VerifyOtp from './pages/otpverify';
import Dashboard from './pages/dashboard'; // Example of a protected route
import ProtectedRoute from '/components/protectedroute';
import Login from './pages/login';
import KYCVerify from './pages/verifyKyc';
import FamilyTree from './pages/relations';
import DashboardContent from './pages/dashboard-content';
import DashboardComponent from './pages/DashboardComponent';
import SingleUserPage from './pages/SingleUserPage';
import Home from './pages/Home';

// Child Components
function Overview() {
  return <div>Overview Content</div>;
}

function Profile() {
  return <div>Profile Content</div>;
}

function Settings() {
  return <div>Settings Content</div>;
}

function Reports() {
  return <div>Reports Content</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <Register />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/verify-kyc",
    element: (
      // <ProtectedRoute>
      <KYCVerify />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      <DashboardComponent>
        <DashboardContent />
      </DashboardComponent>
      // </ProtectedRoute>
    ),
    children: [

      { path: 'settings', element: <Settings /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
  {
    path: 'relations', element: (
      <DashboardComponent>
        <FamilyTree />
      </DashboardComponent>)
  },
  {
    path: 'user/:id', element: (
      <DashboardComponent>
        <SingleUserPage />
      </DashboardComponent>)
  },
  {
    path: 'overview', element: (
      <DashboardComponent>
        <Overview />
      </DashboardComponent>)
  },
  // Add more routes as needed
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;

