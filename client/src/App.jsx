import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AddTeam from "./pages/Team/AddTeam";
import TeamsList from "./pages/Team/TeamsList";
import RecordMatch from "./pages/Match/RecordMatch";
import Fixtures from "./pages/Match/Fixtures";
import KnockoutBracket from "./pages/Match/KnockoutBracket";
import Register from "./pages/Users/Register";
import Login from "./pages/Users/Login";

import PublicLayout from "./Layouts/PublicLayout";
import PrivateLayout from "./Layouts/PrivateLayout";
import PublicHome from "./pages/Home/publicHome";

import PrivateNavbar from "./components/Navbars/PrivateNavbar";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PublicHome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* + PRIVATE ROUTES + Protected*/}
          <Route
            element={
              <ProtectedRoute allowedRolles={["student", "admin"]}>
                <PrivateLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/addteam" element={<AddTeam />} />
            <Route path="/teamslist" element={<TeamsList />} />
            <Route path="/addmatch" element={<RecordMatch />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/knockout" element={<KnockoutBracket />} />
          </Route>

          <Route path="/pnb" element={<PrivateNavbar />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
