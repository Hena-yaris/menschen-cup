// import React, { useState, useEffect } from "react";
// import axiosBase from "../../api/axiosBase";

// const RecordMatch = () => {
// const [teams, setTeams] = useState([]);
// const [teamA, setTeamA] = useState("");
// const [teamB, setTeamB] = useState("");
// const [scoreA, setScoreA] = useState("");
// const [scoreB, setScoreB] = useState("");
// const [group, setGroup] = useState("");

// useEffect(() => {
//   const fetchTeams = async () => {
//     const res = await axiosBase.get("/teams/teamslist");
//     setTeams(res.data);
//   };
//   fetchTeams();
// }, []);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await axiosBase.post("/matches/add-match", {
//       team_a_id: teamA,
//       team_b_id: teamB,
//       score_a: Number(scoreA),
//       score_b: Number(scoreB),
//       group_name: group,
//       stage: "group",
//     });
//     alert("Match recorded successfully");
//     setTeamA("");
//     setTeamB("");
//     setScoreA("");
//     setScoreB("");
//   } catch (err) {
//     console.error(err);
//     alert("Error recording match");
//   }
// };


//     return (
//       <form
//         onSubmit={handleSubmit}
//         className="p-4 bg-gray-100 rounded shadow-md w-96 mx-auto"
//       >
//         <h2 className="text-xl font-bold mb-4 text-center">Record Match</h2>

//         <select
//           value={group}
//           onChange={(e) => setGroup(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//           required
//         >
//           <option value="">Select Group</option>
//           <option value="A">Group A</option>
//           <option value="B">Group B</option>
//           <option value="C">Group C</option>
//           <option value="D">Group D</option>
//         </select>

//         <select
//           value={teamA}
//           onChange={(e) => setTeamA(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//           required
//         >
//           <option value="">Select Team A</option>
//           {teams.map((team) => (
//             <option key={team.id} value={team.id}>
//               {team.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={teamB}
//           onChange={(e) => setTeamB(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//           required
//         >
//           <option value="">Select Team B</option>
//           {teams.map((team) => (
//             <option key={team.id} value={team.id}>
//               {team.name}
//             </option>
//           ))}
//         </select>

//         <div className="flex gap-2 mb-2">
//           <input
//             type="number"
//             value={scoreA}
//             onChange={(e) => setScoreA(e.target.value)}
//             placeholder="Score A"
//             className="w-1/2 p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             value={scoreB}
//             onChange={(e) => setScoreB(e.target.value)}
//             placeholder="Score B"
//             className="w-1/2 p-2 border rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//     );
// };



// export default RecordMatch;

import React, { useState, useEffect } from "react";
import axiosBase from "../../api/axiosBase";

const RecordMatch = () => {
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [scoreA, setScoreA] = useState("");
  const [scoreB, setScoreB] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axiosBase.get("/teams/teamslist");
        setTeams(res.data);
      } catch (err) {
        console.error(err);
        alert("Error loading teams");
      }
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosBase.post("/matches/add-match", {
        team_a_id: teamA,
        team_b_id: teamB,
        score_a: Number(scoreA),
        score_b: Number(scoreB),
        group_name: group,
        stage: "group",
      });

      alert("✅ Match recorded successfully");
      setTeamA("");
      setTeamB("");
      setScoreA("");
      setScoreB("");
      setGroup("");
    } catch (err) {
      console.error(err);
      alert("❌ Error recording match");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl p-6 space-y-5"
      >
        <h2 className="text-3xl font-semibold text-center text-[#0875f3] tracking-wide">
          Record Match
        </h2>

        {/* Group */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Group</label>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0875f3]"
            required
          >
            <option value="">Select Group</option>
            <option value="A">Group A</option>
            <option value="B">Group B</option>
            <option value="C">Group C</option>
            <option value="D">Group D</option>
          </select>
        </div>

        {/* Team A */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Team A</label>
          <select
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0875f3]"
            required
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
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0875f3]"
            required
          >
            <option value="">Select Team B</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Scores */}
        <div className="flex gap-3">
          <input
            type="number"
            value={scoreA}
            onChange={(e) => setScoreA(e.target.value)}
            placeholder="Score A"
            className="w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0875f3]"
            required
          />
          <input
            type="number"
            value={scoreB}
            onChange={(e) => setScoreB(e.target.value)}
            placeholder="Score B"
            className="w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0875f3]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-3 bg-[#0875f3] text-white font-semibold rounded-lg shadow-md hover:bg-[#0563d1] transition duration-300"
        >
          Submit Match
        </button>
      </form>
    </div>
  );
};

export default RecordMatch;
