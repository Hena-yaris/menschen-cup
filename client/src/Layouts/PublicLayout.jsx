import React from 'react'
import PublicNavbar from '../components/Navbars/PublicNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function PublicLayout() {
  return (
    <>
    <PublicNavbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default PublicLayout