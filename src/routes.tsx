
import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import Dashboard from './pages/home/dashboard';
import ProtectedRoute from './protected';
import Layout from './pages/home/layout';
import Editor from './pages/home/editor';
import LoginOTP from './pages/auth/login-otp';
import Landing from './pages/home/landing';


function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<Layout />} />,
      children: [
        {
          index: true,
          element: <Dashboard />,
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
    {
      path: "/",
      element: <Landing />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
