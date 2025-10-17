import React from 'react'
import {Routes, Route}  from "react-router-dom";
import AddTeam from './pages/Team/AddTeam';
import Home from './pages/Home/Home';
import TeamsList from './pages/Team/TeamsList';
import RecordMatch from './pages/Match/RecordMatch';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addteam' element={<AddTeam/>}/>
        <Route path='/teamslist' element={<TeamsList/>}/>


        <Route path='/addmatch' element={<RecordMatch/>}/>


      </Routes>
    </>
  )
}

export default App;
