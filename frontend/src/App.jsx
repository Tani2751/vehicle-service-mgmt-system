import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage'
import { PlansPage } from './pages/PlansPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegistrationPage'
import ServicePage from './pages/ServicePage'
import { FallBackUI_Route } from './components/FallBackUI_Route'
import { AppLayout } from './components/AppLayout'
import { DashboardLayout } from './pages/DashboardLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { DashboardHomePage } from './pages/AdminDashboard_Pages/DashboardHomePage'
import { DashboardUsers } from './pages/AdminDashboard_Pages/DashboardUsers'
import { ToastContainer } from "react-toastify";
import { SuperAdminDashboardHomePage } from './pages/SuperAdminDashboard/SuperAdminDashboardHomePage'
import { CreateUserPage } from './pages/SuperAdminDashboard/CreateUserPage'
import PasswordReset from './pages/PasswordReset'
import { InviteUserPage } from './pages/InviteUserPage'
import ForgotPassword from './pages/ForgotPassword'


function App() { 

  const router = createBrowserRouter([

    {
      element: <AppLayout />,
      errorElement: <FallBackUI_Route />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: "/plans",
          element: <PlansPage />
        },
        {
          path:"/login",
          element: <LoginPage />
        },
        {
          path:"/register",
          element: <RegisterPage />
        },
        {
          path:"/service",
          element: <ServicePage />
        },

        {
          path: "/invite-user",
          element: <InviteUserPage />
        },

        {
          path: `/password-reset/:id`,
          element: <PasswordReset />
        },

        {
          path: `/forgot-password`,
          element: <ForgotPassword />
        },

        {
          path: `/forgot-password-user`,
          element: <InviteUserPage />
        },

        {           
          element: <ProtectedRoute role="super_admin" />,
          children: [
            {
              path: "/superAdminDashboard",
              element: <DashboardLayout />,
              children: [
                {
                  index: true,
                  element: <SuperAdminDashboardHomePage />
                },
                {
                  path: "/superAdminDashboard/users",
                  element: <DashboardUsers />
                },
                {
                  path: "/superAdminDashboard/createUser",
                  element: <CreateUserPage />
                }
              ]
            }
          ]
        },


        {           
          element: <ProtectedRoute role="garage_admin" />,
          children: [
            {
              path: "/garageAdminDashboard",
              element: <DashboardLayout />,
              children: [
                {
                  index: true,
                  element: <DashboardHomePage />
                },
                {
                  path: "/garageAdminDashboard/users",
                  element: <DashboardUsers />
                }
              ]
            }
          ]
        },


      ]
    }
     


  ])
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )      
  
}

export default App
