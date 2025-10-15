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
   }, []);

   // group teams by group_name
   const groupedTeams = teams.reduce((acc, team) => {
     (acc[team.group_name] = acc[team.group_name] || []).push(team);
     return acc;
   }, {});

   return (
     <div className="p-4">
       {Object.entries(groupedTeams).map(([group, groupTeams]) => (
         <div key={group} className="mb-6">
           <h2 className="text-xl font-bold mb-2">Group {group}</h2>
           <ul className="border rounded p-2 bg-gray-50">
             <li className="grid grid-cols-6 text-center font-bold border-b pb-1">
               <span className="text-left">Team</span>
               <span>W</span>
               <span>D</span>
               <span>L</span>
               <span>G</span>
               <span>Pts</span>
             </li>
             {groupTeams.map((team) => (
               <li
                 key={team.id}
                 className="p-2 border-b last:border-none grid grid-cols-6 text-center"
               >
                 <span className="font-semibold text-left">{team.name}</span>
                 <span>{team.wins}</span>
                 <span>{team.draws}</span>
                 <span>{team.losses}</span>
                 <span>{team.goals_against}</span>
                 <span className="font-bold">{team.points}</span>
               </li>
             ))}
           </ul>
         </div>
       ))}
     </div>
   );
};

export default TeamsList;



















