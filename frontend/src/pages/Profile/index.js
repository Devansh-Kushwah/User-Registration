import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import useUserStore from '../../store/userStore'
import {
  getUserDetailsByToken,
  updateUserDetails as apiUpdateUser,
  deleteUser,
} from '../../Utils/api'
import { handleSuccess } from '../../Utils/taost'

function Profile() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState()
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState('male')
  const [about, setAbout] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  const fetchUserDetails = async () => {
    try {
      setLoading(true)
      const response = await getUserDetailsByToken()()
      const data = response?.data?.data
      if (data.name) {
        setName(data.name)
      }
      if (data.age) {
        setAge(data.age)
      }
      if (data.gender) {
        setGender(data.gender)
      }
      if (data.about) {
        setAbout(data.about)
      }
      if (data.dateOfBirth) {
        setDateOfBirth(data.dateOfBirth.split('T')[0])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const submitUpdatedDetails = async (e) => {
    e.preventDefault()
    try {
      const response = await apiUpdateUser()({
        name: name,
        age: age,
        gender: gender,
        about: about,
        dateOfBirth: dateOfBirth,
      })
      handleSuccess(response?.data?.message)
      useUserStore.getState().updateUserDetails(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteAccount = async () => {
    try {
      const response = await deleteUser()()
      handleSuccess(response?.data?.message)
      useUserStore.getState().logout()
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
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
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box
          component="form"
          onSubmit={submitUpdatedDetails}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
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
            onChange={(e) => setAge(e.target.value)}
            value={age}
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
            onChange={(e) => setDateOfBirth(e.target.value)}
            value={dateOfBirth}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
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
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Profile
          </Button>
          <Button
            fullWidth
            onClick={DeleteAccount}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: 'red' }}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  )
}

export default Profile
