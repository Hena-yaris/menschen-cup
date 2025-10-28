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
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 font-sans">
      <h1 className="text-5xl sm:text-6xl text-center font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 tracking-tight drop-shadow-lg shadow-amber-500/50 border-orange-500/70 border-b-4 rounded-2xl py-3 w-fit">
        Group Standings
      </h1>

      <div className="space-y-10">
        {Object.entries(groupedTeams).map(([group, groupTeams]) => (
          <div
            key={group}
            className="rounded-xl border border-gray-700 bg-gray-800/70 shadow-2xl shadow-orange-900/40 overflow-hidden backdrop-blur-sm transition duration-300 hover:border-orange-500"
          >
            <h2 className="text-xl sm:text-2xl font-bold bg-gray-900/90 px-6 py-4 border-b-4 border-amber-500/50 text-amber-400 tracking-tight">
              Group {group}
            </h2>

            {/* Stat Header Row: grid-cols-9 is correct for alignment */}
            <div className="grid grid-cols-9 gap-2 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-800/90 py-3 px-2 sm:px-4">
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
                if (b.points !== a.points) return b.points - a.points;
                const gdA = a.goals_for - a.goals_against;
                const gdB = b.goals_for - b.goals_against;
                const gda = a.goals_for - a.goals_against;
                const gdb = b.goals_for - b.goals_against;
                if (gdB !== gdA) return gdB - gdA;
                return b.goals_for - a.goals_for;
            }
        ).map((team, i) => {
              const goalDifference = team.goals_for - team.goals_against;
              const gdDisplay =
                goalDifference > 0 ? `+${goalDifference}` : goalDifference;

              return (
                <div
                  key={team.id}
                  
                  className="grid grid-cols-9 gap-2 items-center text-center py-3 px-2 sm:px-4 border-b border-gray-800 last:border-0 text-sm hover:bg-gray-700/50 transition duration-150"
                >
                  {/* Team Name Column (col-span-2) */}
                  <div className="flex items-center gap-2 sm:gap-3 col-span-2 text-left min-w-0">
                    <span className="text-gray-400 w-4 ">{i + 1}</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold border-2 border-amber-400/50 flex-shrink-0">
                        {team.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>
                      <span
                        className={`inline font-semibold text-white text-sm md:text-base truncate w-full`}
                      >
                        {team.name.length>9? team.name.slice(0,9) +"...": team.name}
                      </span>
                    </div>
                  </div>

                  {/* Statistics Columns (1 column each, aligned perfectly) */}
                  <span className="font-medium text-gray-300">{team.wins}</span>
                  <span className="font-medium text-gray-300">{team.draws}</span>
                  <span className="font-medium text-gray-300">{team.losses}</span>
                  <span className="font-medium text-gray-300">{team.goals_for}</span>
                  <span className="font-medium text-gray-300">{team.goals_against}</span>
                  <span
                    className={
                      // Ensure color differentiation for Goal Difference
                      goalDifference > 0
                        ? "text-lime-400 font-semibold"
                        : goalDifference < 0
                        ? "text-rose-500 font-semibold"
                        : "text-gray-300 font-semibold"
                    }
                  >
                    {gdDisplay}
                  </span>
                  <span className="font-extrabold text-lg text-amber-300 shadow-lg shadow-amber-500/50">
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
  // return (
  //   <div className="min-h-screen bg-gray-950 text-gray-200 py-10 px-6">
  //     <h1 className="text-4xl sm:text-5xl text-center  font-extrabold text-[#0875f3] mb-8 mt-3 md:mt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
  //       Group Standings
  //     </h1>

  //     <div className="space-y-10">
  //       {Object.entries(groupedTeams).map(([group, groupTeams]) => (
  //         <div
  //           key={group}
  //           className="rounded-2xl border border-gray-800 bg-gray-900/60 shadow-lg overflow-hidden"
  //         >
  //           <h2 className="text-2xl font-semibold bg-gray-800/70 px-6 py-3 border-b border-gray-700 tracking-wider">
  //             Group {group}
  //           </h2>

  //           <div className="grid grid-cols-9 gap-3 text-center text-xs font-medium uppercase tracking-wide text-gray-400 bg-gray-900/40 py-3 px-4">
  //             <span className="text-left col-span-2">Club</span>
  //             <span>W</span>
  //             <span>D</span>
  //             <span>L</span>
  //             <span>GF</span>
  //             <span>GA</span>
  //             <span>GD</span>
  //             <span>PTS</span>
  //           </div>

  //           {groupTeams.sort((a,b)=> {
  //               if (b.points !== a.points) return b.points - a.points;
  //               const gdA = a.goals_for - a.goals_against;
  //               const gdB = b.goals_for - b.goals_against;
  //               if (gdB !== gdA) return gdB - gdA;
  //               return b.goals_for - a.goals_for;
  //           }
  //       ).map((team, i) => {
  //             const goalDifference = team.goals_for - team.goals_against;
  //             const gdDisplay =
  //               goalDifference > 0 ? `+${goalDifference}` : goalDifference;

  //             return (
  //               <div
  //                 key={team.id}
  //                 className="grid grid-cols-9 gap-3 items-center text-center py-3 px-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition"
  //               >
  //                 <div className="flex items-center gap-2 sm:gap-3 col-span-2 text-left">
  //                   <span className="text-gray-400 w-4 ">{i + 1}</span>
  //                   <div className="flex items-center gap-2 ">
  //                     <div className="w-8 h-8 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-xs font-bold">
  //                       {team.name
  //                         .split(" ")
  //                         .map((n) => n[0])
  //                         .join("")
  //                         .substring(0, 2)
  //                         .toUpperCase()}
  //                     </div>
  //                     <span
  //                       className={`hidden sm:inline font-semibold text-white text-sm md:text-lg  truncate `}
  //                     >
  //                       {team.name.length>9? team.name.slice(0,9) +"...": team.name}
  //                     </span>
  //                   </div>
  //                 </div>

  //                 <span>{team.wins}</span>
  //                 <span>{team.draws}</span>
  //                 <span>{team.losses}</span>
  //                 <span>{team.goals_for}</span>
  //                 <span>{team.goals_against}</span>
  //                 <span
  //                   className={
  //                     goalDifference > 0
  //                       ? "text-green-400 font-semibold"
  //                       : goalDifference < 0
  //                       ? "text-red-400 font-semibold"
  //                       : "text-gray-300"
  //                   }
  //                 >
  //                   {gdDisplay}
  //                 </span>
  //                 <span className="font-bold text-yellow-400 drop-shadow-sm">
  //                   {team.points}
  //                 </span>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default TeamsList;