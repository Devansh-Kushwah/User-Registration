import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useUserStore from '../store/userStore'

function AuthChecker() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      useUserStore.getState().login()
    }
  }, [location, navigate])

  return null
}

export default AuthChecker
