
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/home/dashboard';
import ProtectedRoute from './protected';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Editor from './pages/home/editor';
import Settings from './pages/home/settings';
import Cart from './pages/home/cart';
import Layout from './pages/home/layout';
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
        },
        {
          path: "shopping",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/editor",
      element: <ProtectedRoute element={<Editor />} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
