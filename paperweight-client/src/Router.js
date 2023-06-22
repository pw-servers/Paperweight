import React from 'react'
import { Outlet, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import App from './App.js'
import Home from './components/pages/Home.js'
import Login from './components/pages/Login/Login.js'
import useAuth from './hooks/useAuth.js'

export default function Router({ children }) {
  const { auth, user } = useAuth()

  const requireAuth = () => {
    if (!user) {
      return redirect('/login')
    }
    return null
  }

  const redirectIfUser = () => {
    if (user) {
      return redirect('/app')
    }
    return null
  }

  const findAppropriatePath = ({ request }) => {
    const url = new URL(request.url)
    if (url.pathname === '/') {
      redirectIfUser()
      requireAuth()
    }
    return null
  }

  const router = createBrowserRouter([
    {
      path: '/',
      Component: Outlet,
      loader: findAppropriatePath,
      children: [
        {
          path: 'login',
          Component: Login,
          loader: redirectIfUser
        },
        {
          path: 'signup',
          element: <span>sign up here</span>,
          loader: redirectIfUser
        },
        {
          path: 'app',
          Component: App,
          loader: requireAuth,
          children: [
            {
              index: true,
              Component: Home
            }
          ]
        }
      ]
    }
  ])


  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  )
}
