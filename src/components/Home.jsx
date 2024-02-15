import React from 'react'
import Navbar from './Navbar.jsx'
import Products from './Products.jsx'
import '../css/Home.css'

function Home() {
    return (
      <div className='home-wrapper'>
        <Navbar />
        <Products />
      </div>
    )
  }


export default Home
