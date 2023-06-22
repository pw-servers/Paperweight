import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

const requiresNoAuth = ['/login', '/signup']

const useAuth = () => {
  const auth = getAuth()
  const [user, setUser] = useState(auth?.user)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        // console.log(requiresNoAuth.includes(location.pathname))
        // if (requiresNoAuth.includes(location.pathname)) {
        //   console.log('redirecting')
        //   navigate('/app')
        // }
      } else {
        setUser(null)
        // navigate('/login')
      } 
    })
  }, [auth])

  return { auth, user }

}

export default useAuth