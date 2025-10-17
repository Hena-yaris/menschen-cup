import React, { useEffect, useState } from "react";
import axiosBase from "../../api/axiosBase";

const TeamsList = () => {
  const [teams, setTeams] = useState([]);

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
    const interval = setInterval(fetchTeams,10000);
    return ()=> clearInterval(interval);
  }, []);

  const groupedTeams = teams.reduce((acc, team) => {
    (acc[team.group_name] = acc[team.group_name] || []).push(team);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">
        Group Standings
      </h1>

      <div className="space-y-10">
        {Object.entries(groupedTeams).map(([group, groupTeams]) => (
          <div
            key={group}
            className="rounded-2xl border border-gray-800 bg-gray-900/60 shadow-lg overflow-hidden"
          >
            <h2 className="text-2xl font-semibold bg-gray-800/70 px-6 py-3 border-b border-gray-700 tracking-wider">
              Group {group}
            </h2>

            <div className="grid grid-cols-9 gap-3 text-center text-xs font-medium uppercase tracking-wide text-gray-400 bg-gray-900/40 py-3 px-4">
              <span className="text-left col-span-2">Club</span>
              <span>W</span>
              <span>D</span>
              <span>L</span>
              <span>GF</span>
              <span>GA</span>
              <span>GD</span>
              <span>PTS</span>
            </div>

            {groupTeams.sort((a,b)=> {
                const diff = b.points-a.points;
                if(diff !==0) return diff;
                const gdA = a.goals_for - a.goals_against;
                const gdB = b.goals_for - b.goals_against;
                return gdB - gdA;
            }
        ).map((team, i) => {
              const goalDifference = team.goals_for - team.goals_against;
              const gdDisplay =
                goalDifference > 0 ? `+${goalDifference}` : goalDifference;

              return (
                <div
                  key={team.id}
                  className="grid grid-cols-9 gap-3 items-center text-center py-3 px-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition"
                >
                  <div className="flex items-center gap-2 sm:gap-3 col-span-2 text-left">
                    <span className="text-gray-400 w-4 ">{i + 1}</span>
                    <div className="flex items-center gap-2 ">
                      <div className="w-8 h-8 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-xs font-bold">
                        {team.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>
                      <span
                        className={`hidden sm:inline font-semibold text-white text-sm md:text-lg  truncate `}
                      >
                        {team.name.length>9? team.name.slice(0,9) +"...": team.name}
                      </span>
                    </div>
                  </div>

                  <span>{team.wins}</span>
                  <span>{team.draws}</span>
                  <span>{team.losses}</span>
                  <span>{team.goals_for}</span>
                  <span>{team.goals_against}</span>
                  <span
                    className={
                      goalDifference > 0
                        ? "text-green-400 font-semibold"
                        : goalDifference < 0
                        ? "text-red-400 font-semibold"
                        : "text-gray-300"
                    }
                  >
                    {gdDisplay}
                  </span>
                  <span className="font-bold text-yellow-400 drop-shadow-sm">
                    {team.points}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;

// <div>
//   {groupTeams
//     .sort(
//       (a, b) =>
//         b.points - a.points ||
//         b.goals_for - b.goals_against - (a.goals_for - a.goals_against)
//     )
//     .map((team, index) => {
//       const goalDifference = team.goals_for - team.goals_against;
//       return (
//         <div
//           key={team.id}
//           className="grid grid-cols-12 gap-2 text-center items-center p-3 transition-colors duration-200 hover:bg-gray-700/50 border-b border-gray-800 last:border-0"
//         >
//           {/* Team Name and Logo */}
//           <div className="col-span-5 flex items-center text-left">
//             <span className="w-6 text-center text-gray-400 mr-2">
//               {index + 1}
//             </span>
//             <img
//               src={`https://placehold.co/40x40/334155/ffffff?text=${getInitials(
//                 team.name
//               )}`}
//               alt={`${team.name} logo`}
//               className="w-6 h-6 rounded-full mr-3"
//             />
//             <span className="font-semibold truncate">{team.name}</span>
//           </div>

//           {/* Stats */}
//           <span>{team.wins}</span>
//           <span>{team.draws}</span>
//           <span>{team.losses}</span>
//           <span>{team.goals_for}</span>
//           <span>{team.goals_against}</span>

//           {/* Goal Difference with conditional color */}
//           <span
//             className={`font-semibold ${
//               goalDifference > 0
//                 ? "text-green-400"
//                 : goalDifference < 0
//                 ? "text-red-400"
//                 : "text-gray-400"
//             }`}
//           >
//             {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
//           </span>

//           {/* Points */}
//           <span className="font-black text-lg text-blue-400">
//             {team.points}
//           </span>
//         </div>
//       );
//     })}
// </div>;
