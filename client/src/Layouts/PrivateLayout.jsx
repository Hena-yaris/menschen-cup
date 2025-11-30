import React from 'react'
import PrivateNavbar from '../components/Navbars/PrivateNavbar'
import { Outlet } from 'react-router-dom'

function PrivateLayout() {
  return (
    <>
      <PrivateNavbar />
      <Outlet />
    </>
  );
}

export default PrivateLayout