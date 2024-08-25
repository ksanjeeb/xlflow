
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/home/dashboard';
import ProtectedRoute from './protected';
import Settings from './pages/home/settings';
import Layout from './pages/home/layout';
import Editor from './pages/home/editor';
import LoginOTP from './pages/auth/login-otp';


function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<Layout />} />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "settings",
          element: <Settings />,
        }
      ],
    },
    {
      path: "/editor/:workflowID",
      element:  <ProtectedRoute element={<Editor />} />,
    },
    {
      path: "/login",
      element: <LoginOTP />,
    },

  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
