import React from 'react'
import {Routes, Route}  from "react-router-dom";
import AddTeam from './pages/Team/AddTeam';
import Home from './pages/Home/Home';
import TeamsList from './pages/Team/TeamsList';
import RecordMatch from './pages/Match/RecordMatch';
import Fixtures from './pages/Match/Fixtures';
import KnockoutBracket from './pages/Match/KnockoutBracket';
import Navbar from './components/Navbar';


function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addteam' element={<AddTeam/>}/>
        <Route path='/teamslist' element={<TeamsList/>}/>


        <Route path='/addmatch' element={<RecordMatch/>}/>
        <Route path='/fixtures' element={<Fixtures/>}/>
        <Route path='/knockout' element={<KnockoutBracket/>}/>


      </Routes>
    </>
  )
}

export default App;
