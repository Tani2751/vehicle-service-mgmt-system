import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage'
import { PlansPage } from './pages/PlansPage'
import AppleStyleCarousel from './components/AppleStyleCarousel'



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
     }

  ])
  return <RouterProvider router={router} />
}

export default App
