import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import './Header.css'
import AbcIcon from '@mui/icons-material/Abc'
import { handleSuccess } from '../../Utils/taost'
import useUserStore from '../../store/userStore'

function Header() {
  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    useUserStore.getState().logout()
    handleSuccess('User Loggedout')
    setTimeout(() => {
      window.location.href = '/login'
    }, 1000)
  }

  return (
    <header className="headerContainer">
      <div className={'searchbarContainer'}>
        <Grid
          style={{ width: '100%' }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link to="/">
            <AbcIcon />
          </Link>
          <Grid
            gap={5}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid
              item
              padding="7px 0"
              justifyContent="flex-end"
              display="flex"
              gap={{ xs: '20px', md: '32px' }}
              alignItems="center"
            >
              <Link to="/profile">Profile</Link>
            </Grid>
            <Grid
              onClick={handleLogout}
              item
              padding="7px 0"
              justifyContent="flex-end"
              display="flex"
              gap={{ xs: '20px', md: '32px' }}
              alignItems="center"
              style={{ cursor: 'pointer' }}
            >
              Logout
            </Grid>
          </Grid>
        </Grid>
      </div>
    </header>
  )
}

export default Header
