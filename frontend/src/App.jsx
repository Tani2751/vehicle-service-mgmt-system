import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage'
import { PlansPage } from './pages/PlansPage'
import AppleStyleCarousel from './components/AppleStyleCarousel'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegistrationPage'




function App() { 

  const router = createBrowserRouter([
     {
      path: '/',
      element: <HomePage />
     },
     {
      path: "/plans",
      element: <PlansPage />
     },
     {
      path:"/test",
      element: <AppleStyleCarousel />
     },
     {
      path:"/login",
      element: <LoginPage />
     },
     {
      path:"/register",
      element: <RegisterPage />
     },


  ])
  return <RouterProvider router={router} />
}

export default App
