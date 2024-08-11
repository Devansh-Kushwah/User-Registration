import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../../Utils/taost'
import { login } from '../../Utils/api'
import useUserStore from '../../store/userStore'
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    const copyLoginInfo = { ...loginInfo }
    copyLoginInfo[name] = value
    setLoginInfo(copyLoginInfo)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await login(loginInfo)
      const { success, message, jwtToken, data } = res
      if (success) {
        handleSuccess(message)
        localStorage.setItem('auth-token', jwtToken)
        useUserStore.getState().updateUserDetails(data)
        useUserStore.getState().login()
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>{' '}
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={loginInfo.email}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={loginInfo.password}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <span>
            User has not been Registered?{' '}
            <Link style={{ color: 'blue' }} to="/signup">
              Signup
            </Link>
          </span>
        </Box>
        <ToastContainer />
      </Box>
    </Container>
  )
}

export default Login
