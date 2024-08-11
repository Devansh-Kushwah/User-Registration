import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../../Utils/taost'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { signup } from '../../Utils/api'

function Signup() {
  const navigate = useNavigate()

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    age: 0,
    dateOfBirth: '',
    gender: '',
    about: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const copySignupInfo = { ...signupInfo }
    copySignupInfo[name] = value
    setSignupInfo(copySignupInfo)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const formData = {
        ...signupInfo,
        age: Number(signupInfo.age),
      }

      const response = await signup(formData)
      const { success, message } = response

      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate('/login')
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
          marginTop: 4,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register User
        </Typography>
        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
            value={signupInfo.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            type="number"
            autoComplete="age"
            onChange={handleChange}
            value={signupInfo.age}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dateOfBirth"
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            InputLabelProps={{ shrink: true }}
            autoComplete="bday"
            onChange={handleChange}
            value={signupInfo.dateOfBirth}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={signupInfo.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="">
                <em>Select your gender</em>
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="about"
            label="About"
            name="about"
            multiline
            rows={4}
            inputProps={{ maxLength: 5000 }}
            onChange={handleChange}
            value={signupInfo.about}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={signupInfo.email}
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
            value={signupInfo.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <span>
            User has been Already Registered?{' '}
            <Link style={{ color: 'blue' }} to="/login">
              Login
            </Link>
          </span>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  )
}

export default Signup
