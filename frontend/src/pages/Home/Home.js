import React from 'react'
import { ToastContainer } from 'react-toastify'

import './home.css'
import blueBlob from '../../images/Blue.png'
import yellowBlob from '../../images/Yellow.png'

function Home() {
  return (
    <div className="heroSection">
      <img className="yellow" src={yellowBlob} alt="kuch bi" />
      <div className="heroInner">
        <h1>User Registration System</h1>
        <p>Streamlined Onboarding with Secure User Authentication</p>
      </div>
      <img className="blue" src={blueBlob} alt="kuch bi" />
      <ToastContainer />
    </div>
  )
}

export default Home
