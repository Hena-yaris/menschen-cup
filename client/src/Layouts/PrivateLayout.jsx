import React from 'react'

import { Outlet } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import StudentsNavbar from '../components/Navbars/StudentsNavbar';

function PrivateLayout() {
  const {user} = useContext(AuthContext)
  return (
    <>
      {user.role ==="admin"? <AdminNavbar/> : <StudentsNavbar/>}
      <Outlet />
    </>
  );
}

export default PrivateLayout