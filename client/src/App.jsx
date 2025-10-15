import React from 'react'
import {Routes, Route}  from "react-router-dom";
import AddTeam from './pages/Team/AddTeam';
import Home from './pages/Home/Home';
import TeamsList from './pages/Team/TeamsList';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addteam' element={<AddTeam/>}/>
        <Route path='/teamslist' element={<TeamsList/>}/>
      </Routes>
    </>
  )
}

export default App;
