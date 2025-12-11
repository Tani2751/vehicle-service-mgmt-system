import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage'
import { PlansPage } from './pages/PlansPage'



function App() { 

  const router = createBrowserRouter([
     {
      path: '/',
      element: <HomePage />
     },
     {
      path: "/plans",
      element: <PlansPage />
     }

  ])
  return <RouterProvider router={router} />
}

export default App
