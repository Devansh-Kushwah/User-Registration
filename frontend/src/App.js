import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Home from './pages/Home/Home'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './components/Header'
import Profile from './pages/Profile'
import useUserStore from './store/userStore'
import AuthChecker from './components/AuthChecker'

function App() {
  const defaultTheme = createTheme()
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Header />
        <AuthChecker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
