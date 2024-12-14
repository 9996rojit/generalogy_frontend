
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/register';
import VerifyOtp from './pages/otpverify';
import Dashboard from './pages/dashboard'; // Example of a protected route
import ProtectedRoute from './components/protectedroute';
import Login from './pages/login';
import KYCVerify from './pages/verifyKyc';
import FamilyTree from './pages/relations';
import DashboardContent from './pages/dashboard-content';
import DashboardComponent from './pages/DashboardComponent';
import SingleUserPage from './pages/SingleUserPage';
import Home from './pages/Home';
import GuestRoute from './components/GuestRoute';

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
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/create-account",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/verify-kyc",
    element: <KYCVerify />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardComponent>
          <DashboardContent />
        </DashboardComponent>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardComponent>
          <DashboardContent />
        </DashboardComponent>
      </ProtectedRoute>
    ),
    children: [

      { path: 'settings', element: <Settings /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
  {
    path: 'relations', element: (
      <ProtectedRoute>
        <DashboardComponent>
          <FamilyTree />
        </DashboardComponent>
      </ProtectedRoute>)
  },
  {
    path: 'user/:id', element: (
      <ProtectedRoute>
        <DashboardComponent>
          <SingleUserPage />
        </DashboardComponent>
      </ProtectedRoute>
    )
  },
  {
    path: 'overview', element: (
      <ProtectedRoute>
        <DashboardComponent>
          <Overview />
        </DashboardComponent>
      </ProtectedRoute>)
  },
  // Add more routes as needed
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;

