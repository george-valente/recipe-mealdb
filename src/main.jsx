import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Route
} from 'react-router-dom'
import { Recipe } from './components/Recipe.jsx'
import { Header } from './components/Header.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header/>,

    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/meal/:idMeal',
        element: <Recipe />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
