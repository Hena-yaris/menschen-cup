

import React, { useState, useEffect } from "react";
import axiosBase from "../../api/axiosBase";

const RecordMatch = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [groupForm, setGroupForm] = useState({
    teamA: "",
    teamB: "",
    scoreA: "",
    scoreB: "",
    group: "",
  });

  const [knockoutForm, setKnockoutForm] = useState({
    teamA: "",
    teamB: "",
    scoreA: "",
    scoreB: "",
    stage: "",
  });

  const handleGroupChange = async (e) => {
    const { name, value } = e.target;
    setGroupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKnockoutForm = async (e) => {
    const { name, value } = e.target;
    setKnockoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axiosBase.get("/teams/teamslist");
        // console.log(res.data);
        setTeams(res.data);
      } catch (err) {
        console.error(err);
        alert("Error loading teams");
      }
    };
    fetchTeams();
  }, []);

  // 3. Updated Group Match Submission
  const groupHandleSubmit = async (e) => {
    e.preventDefault();
    const { teamA, teamB, scoreA, scoreB, group } = groupForm;
    setIsLoading(true);

    // Check for validation logic here (e.g., teamA !== teamB)

    try {
      await axiosBase.post("/matches/add-match", {
        team_a_id: teamA,
        team_b_id: teamB,
        score_a: Number(scoreA),
        score_b: Number(scoreB),
        group_name: group,
        stage: "group", // Fixed stage value for group matches
      });

      alert("✅ Group Match recorded successfully");
      // Reset ONLY the group form data
      setGroupForm({
        teamA: "",
        teamB: "",
        scoreA: "",
        scoreB: "",
        group: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error recording group match");
    } finally {
      setIsLoading(false);
    }
  };

  const KnockoutHandleSubmit = async (e) => {
    e.preventDefault();
    const { teamA, teamB, scoreA, scoreB, stage } = knockoutForm;
    setIsLoading(true);
    try {
      await axiosBase.post("/matches/add-match", {
        team_a_id: teamA,
        team_b_id: teamB,
        score_a: Number(scoreA),
        score_b: Number(scoreB),
        group_name: null, // Knockout doesn't use group, or use a default/null
        stage: stage,
      });
      alert("✅ Knockout Match recorded successfully");
      // Reset ONLY the knockout form data
      setKnockoutForm({
        teamA: "",
        teamB: "",
        scoreA: "",
        scoreB: "",
        stage: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Error recording knockout match");
    }finally {
      setIsLoading(false);
    }
  };

  const handleQuarterSelection = async (e)=> {
    setIsLoading(true);
    try {
      const res = await axiosBase.post("/matches/quarterSelection");
      alert(res.data.message)
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error generating quarterfinal matches")
    }finally{
      setIsLoading(false)
    }
  }

  const handleSemiSelection = async (e) => {
     setIsLoading(true);

     try {
      const res = await axiosBase.post("/matches/semiSelection");
      alert(res.data.message);
     } catch (err) {
      console.error(err);
      alert(err.response?.data?.message)
     }finally{
      setIsLoading(false);
     }
  };

  const handleFinalSelection = async (e) => {
    setIsLoading(true);

    try {
      const res = await axiosBase.post("/matches/finalSelection");
      alert(res?.data?.message)
      
    } catch (err) {
      console.error("Error to decide how's the winner");
      alert(err.response?.data?.message);
    }finally{
      setIsLoading(false)
    }
  };


  
  const filteredTeams = groupForm.group
    ? teams.filter((t) => t.group_name === groupForm.group)
    : [];

  // Custom button styling for progressive tournament actions
  const progressionBtnClasses =
    "w-full sm:w-auto py-3 px-6 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Custom button styling for form submission
  const submitBtnClasses =
    "w-full py-3 mt-3 bg-gradient-to-r from-[#0875f3] to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen p-4 flex flex-col items-center bg-gray-950 text-gray-100">
      <h1 className="text-4xl sm:text-5xl text-center  font-extrabold text-[#0875f3] mb-8 mt-3 md:mt-6  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
        Tournament Match Recorder
      </h1>

      {/* Tournament Progression Buttons */}
      <div className="w-full max-w-4xl mb-10 p-6 bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-4 justify-between">
        <button
          onClick={handleQuarterSelection}
          className={`${progressionBtnClasses} bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700`}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          {isLoading ? "Generating..." : "Generate Quarter Finals"}
        </button>

        <button
          onClick={handleSemiSelection}
          className={`${progressionBtnClasses} bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700`}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7h12a1 1 0 010 2H4a1 1 0 010-2zM3 11a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" />
          </svg>
          {isLoading ? "Generating..." : "Generate Semi Finals"}
        </button>

        <button
          onClick={handleFinalSelection}
          className={`${progressionBtnClasses} bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600`}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-9a1 1 0 001 1h2a1 1 0 100-2H4a1 1 0 00-1 1zm12 0a1 1 0 00-1 1h-2a1 1 0 100-2h2a1 1 0 001 1zM9 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm-.01 8a1 1 0 001 1h.01a1 1 0 100-2H10a1 1 0 00-1 1z"
              clipRule="evenodd"
            />
          </svg>
          {isLoading ? "Generating..." : "Generate Final Match"}
        </button>
      </div>

      {/* Forms Container */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center items-center ">
        {/* Group Match Form */}
        <form
          onSubmit={groupHandleSubmit}
          className="w-full max-w-md bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl p-6 space-y-5 flex-1"
        >
          <h2 className="text-2xl font-semibold text-center text-teal-400 tracking-wide">
            Record Group Stage Match
          </h2>

          {/* Group */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Group</label>
            <select
              name="group"
              value={groupForm.group}
              onChange={handleGroupChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Group</option>
              <option value="A">Group A</option>
              <option value="B">Group B</option>
              <option value="C">Group C</option>
            </select>
          </div>

          {/* Team A */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Team A</label>
            <select
              name="teamA"
              value={groupForm.teamA}
              onChange={handleGroupChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              disabled={!groupForm.group}
            >
              <option value="">Select Team A</option>
              {filteredTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Team B */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Team B</label>
            <select
              name="teamB"
              value={groupForm.teamB}
              onChange={handleGroupChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              disabled={!groupForm.group || groupForm.teamA === ""}
            >
              <option value="">Select Team B</option>
              {filteredTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Scores */}
          <div className="flex gap-3 items-center">
            <span className="text-lg font-bold text-gray-300 w-1/4 text-right">
              Score:
            </span>
            <input
              type="number"
              name="scoreA"
              value={groupForm.scoreA}
              onChange={handleGroupChange}
              placeholder="A"
              className="w-1/4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-center"
              required
            />
            <span className="text-xl font-extrabold text-gray-400">-</span>
            <input
              type="number"
              name="scoreB"
              value={groupForm.scoreB}
              onChange={handleGroupChange}
              placeholder="B"
              className="w-1/4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-center"
              required
            />
          </div>

          <button
            type="submit"
            className={submitBtnClasses}
            disabled={
              isLoading ||
              !groupForm.teamA ||
              !groupForm.teamB ||
              groupForm.teamA === groupForm.teamB
            }
          >
            {isLoading ? "Recording..." : "Record Group Match"}
          </button>
        </form>

        {/* Knockout Match Form */}
        <form
          onSubmit={KnockoutHandleSubmit}
          className="w-full max-w-md bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl p-6 space-y-5 flex-1"
        >
          <h2 className="text-2xl font-semibold text-center text-red-400 tracking-wide">
            Record Knockout Stage Match
          </h2>

          {/* Stage */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Stage</label>
            <select
              name="stage"
              value={knockoutForm.stage}
              onChange={handleKnockoutForm}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select Stage</option>
              <option value="quarter">Quarterfinals</option>
              <option value="semi">Semifinals</option>
              <option value="final">Finals</option>
            </select>
          </div>

          {/* Team A */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Team A</label>
            <select
              name="teamA"
              value={knockoutForm.teamA}
              onChange={handleKnockoutForm}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={!knockoutForm.stage}
            >
              <option value="">Select Team A</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Team B */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Team B</label>
            <select
              name="teamB"
              value={knockoutForm.teamB}
              onChange={handleKnockoutForm}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={knockoutForm.teamA === ""}
            >
              <option value="">Select Team B</option>
              {teams
                .filter((t) => t.id != knockoutForm.teamA)
                .map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Scores */}
          <div className="flex gap-3 items-center">
            <span className="text-lg font-bold text-gray-300 w-1/4 text-right">
              Score:
            </span>
            <input
              type="number"
              name="scoreA"
              value={knockoutForm.scoreA}
              onChange={handleKnockoutForm}
              placeholder="A"
              className="w-1/4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
              required
            />
            <span className="text-xl font-extrabold text-gray-400">-</span>
            <input
              type="number"
              name="scoreB"
              value={knockoutForm.scoreB}
              onChange={handleKnockoutForm}
              placeholder="B"
              className="w-1/4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
              required
            />
          </div>

          <button
            type="submit"
            className={submitBtnClasses}
            disabled={
              isLoading ||
              !knockoutForm.teamA ||
              !knockoutForm.teamB ||
              knockoutForm.teamA === knockoutForm.teamB
            }
          >
            {isLoading ? "Recording..." : "Record Knockout Match"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecordMatch;
