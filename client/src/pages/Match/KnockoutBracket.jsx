


// import React, { useState, useEffect } from "react";
// // import axiosBase from "../../api/axiosBase"; // Use your actual API base

// /**
//  * Mock function to simulate fetching knockout match data.
//  * The data is structured to show placeholders and advancing teams.
//  *
//  * NOTE: The structure assumes QF-1 & QF-3 feed SF-1 (Top Half), and QF-2 & QF-4 feed SF-2 (Bottom Half).
//  */
// const fetchKnockoutMatches = async () => {
//   // In a real application, replace this with your axios call.
//   await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
//   return [
//     // --- QUARTER-FINALS (QF) ---
//     {
//       id: "QF-1",
//       round: "Quarter-Final",
//       team_a_name: "Winner Group A",
//       team_b_name: "Best 3rd Place Team 1",
//       team_a_id: null,
//       team_b_id: null,
//       score_a: null,
//       score_b: null,
//       played: false,
//       winner_to_match: "SF-1",
//     },
//     {
//       id: "QF-2",
//       round: "Quarter-Final",
//       team_a_name: "Winner Group C",
//       team_b_name: "Runner-up Group A",
//       team_a_id: null,
//       team_b_id: null,
//       score_a: null,
//       score_b: null,
//       played: false,
//       winner_to_match: "SF-2",
//     },
//     // Mocking one played QF match where Runner-up Group B won 2-0
//     {
//       id: "QF-3",
//       round: "Quarter-Final",
//       team_a_name: "Runner-up Group B",
//       team_b_name: "Runner-up Group C",
//       team_a_id: 10,
//       team_b_id: 20,
//       score_a: 2,
//       score_b: 0,
//       played: true,
//       winner_to_match: "SF-1",
//     },
//     // Mocking one played QF match where Winner Group B won 4-1
//     {
//       id: "QF-4",
//       round: "Quarter-Final",
//       team_a_name: "Winner Group B",
//       team_b_name: "Best 3rd Place Team 2",
//       team_a_id: 30,
//       team_b_id: 40,
//       score_a: 4,
//       score_b: 1,
//       played: true,
//       winner_to_match: "SF-2",
//     },

//     // --- SEMI-FINALS (SF) ---
//     // SF-1: Winner of QF-1 (placeholder) vs Winner of QF-3 (Runner-up Group B) -> TOP HALF
//     {
//       id: "SF-1",
//       round: "Semi-Final",
//       team_a_name: "Winner QF-1",
//       team_b_name: "Runner-up Group B",
//       team_a_id: null,
//       team_b_id: 10,
//       score_a: null,
//       score_b: null,
//       played: false,
//       winner_to_match: "FINAL",
//     },
//     // SF-2: Winner of QF-2 (placeholder) vs Winner of QF-4 (Winner Group B) -> BOTTOM HALF
//     {
//       id: "SF-2",
//       round: "Semi-Final",
//       team_a_name: "Winner QF-2",
//       team_b_name: "Winner Group B",
//       team_a_id: null,
//       team_b_id: 30,
//       score_a: null,
//       score_b: null,
//       played: false,
//       winner_to_match: "FINAL",
//     },

//     // --- FINAL ---
//     {
//       id: "FINAL",
//       round: "Final",
//       team_a_name: "Winner SF-1",
//       team_b_name: "Winner SF-2",
//       team_a_id: null,
//       team_b_id: null,
//       score_a: null,
//       score_b: null,
//       played: false,
//       winner_to_match: null,
//     },
//   ];
// };

// // Component to render a single match card
// const MatchCard = ({ match, index, round, reverse = false }) => {
//   // Determine the text content for each team
//   const teamA = match.team_a_id ? match.team_a_name : match.team_a_name;
//   const teamB = match.team_b_id ? match.team_b_name : match.team_b_name;

//   // Determine winner for styling
//   const isWinnerA = match.played && match.score_a > match.score_b;
//   const isWinnerB = match.played && match.score_b > match.score_a;

//   // Status display
//   let statusText = match.played ? "FT" : "Upcoming";
//   let statusColor = match.played ? "bg-green-600" : "bg-blue-600";
//   if (!match.team_a_id || !match.team_b_id) {
//     statusText = "TBD";
//     statusColor = "bg-yellow-600";
//   }

//   return (
//     <div
//       className={`
//             p-2 sm:p-3 shadow-lg rounded-lg transition-transform duration-300 w-full
//             ${
//               round === "Final"
//                 ? "bg-yellow-900/40 border border-yellow-700"
//                 : "bg-gray-800/70 border border-gray-700"
//             }
//             ${reverse ? "sm:ml-auto sm:text-right" : "sm:mr-auto sm:text-left"}
//         `}
//     >
//       <div
//         className={`text-xs font-bold uppercase tracking-widest mb-1 px-1 py-0.5 rounded inline-block ${statusColor} ${
//           reverse ? "sm:float-right" : "sm:float-left"
//         }`}
//       >
//         {statusText}
//       </div>
//       <div className="clear-both"></div>
//       {/* Team A Row */}
//       <div
//         className={`flex justify-between items-center py-1 ${
//           isWinnerA ? "font-extrabold text-white" : "text-gray-300"
//         }`}
//       >
//         <span
//           className={`text-sm ${
//             match.team_a_id ? "truncate" : "text-xs italic text-gray-400"
//           }`}
//         >
//           {teamA}
//         </span>
//         <span
//           className={`font-mono text-base ${
//             isWinnerA ? "text-white" : "text-gray-400"
//           }`}
//         >
//           {match.played ? match.score_a : "-"}
//         </span>
//       </div>
//       <div className="border-t border-gray-700 my-1"></div> {/* Separator */}
//       {/* Team B Row */}
//       <div
//         className={`flex justify-between items-center py-1 ${
//           isWinnerB ? "font-extrabold text-white" : "text-gray-300"
//         }`}
//       >
//         <span
//           className={`text-sm ${
//             match.team_b_id ? "truncate" : "text-xs italic text-gray-400"
//           }`}
//         >
//           {teamB}
//         </span>
//         <span
//           className={`font-mono text-base ${
//             isWinnerB ? "text-white" : "text-gray-400"
//           }`}
//         >
//           {match.played ? match.score_b : "-"}
//         </span>
//       </div>
//     </div>
//   );
// };

// function KnockoutBracket() {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadMatches = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchKnockoutMatches();
//         setMatches(data);
//       } catch (error) {
//         console.error("Failed to load knockout matches:", error);
//         // Handle error state appropriately
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadMatches();
//   }, []);

//   // Group matches by round and visually split them for the symmetrical bracket
//   const getGroupedMatches = (allMatches) => {
//     const qf = allMatches.filter((m) => m.round === "Quarter-Final");
//     const sf = allMatches.filter((m) => m.round === "Semi-Final");
//     const finalMatch = allMatches.find((m) => m.round === "Final");

//     return {
//       qfLeft: [qf[0], qf[2]].filter((m) => m), // QF-1, QF-3 (Top/Left side of the bracket)
//       qfRight: [qf[1], qf[3]].filter((m) => m), // QF-2, QF-4 (Bottom/Right side of the bracket)
//       sfLeft: [sf[0]].filter((m) => m), // SF-1 (Top/Left side)
//       sfRight: [sf[1]].filter((m) => m), // SF-2 (Bottom/Right side)
//       final: finalMatch ? [finalMatch] : [],
//     };
//   };

//   const groupedMatches = getGroupedMatches(matches);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         <p className="ml-4">Loading Knockout Bracket...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 min-h-screen font-sans text-white p-4 sm:p-6 lg:p-10">
//       <div className="max-w-screen-xl mx-auto">
//         <header className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
//             Tournament Knockout Stage
//           </h1>
//           <p className="text-blue-400 mt-2 text-lg">
//             The Path to the Championship
//           </p>
//         </header>

//         {/* Desktop/Tablet Layout: Symmetrical 3-Column Bracket */}
//         <div className="hidden md:grid grid-cols-5 gap-0 justify-items-center items-center w-full">
//           {/* Column 1: Quarter-Finals (Left Side) */}
//           <div className="flex flex-col justify-around h-full py-16 w-full pr-12">
//             <h3 className="text-xl font-bold tracking-wider text-blue-400 text-left mb-6 col-span-1">
//               QF LEFT
//             </h3>
//             {groupedMatches.qfLeft.map((match) => (
//               <div key={match.id} className="relative mb-16 last:mb-0">
//                 <MatchCard match={match} round="Quarter-Final" />
//                 {/* Bracket Line: Horizontal bar coming out of the match */}
//                 <div className="absolute right-[-2.5rem] top-1/2 transform -translate-y-1/2 w-10 h-0.5 bg-gray-600"></div>
//               </div>
//             ))}
//           </div>

//           {/* Column 2: Semi-Finals (Left Side) */}
//           <div className="flex flex-col justify-center h-full py-32 w-full pr-12">
//             <h3 className="text-xl font-bold tracking-wider text-blue-400 text-center mb-6 opacity-0">
//               SF
//             </h3>
//             {groupedMatches.sfLeft.map((match) => (
//               <div key={match.id} className="relative mb-28 last:mb-0">
//                 {/* Bracket Line: Vertical line connecting QF winners */}
//                 <div className="absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2 h-44 border-l-2 border-t-2 border-gray-600 hidden"></div>
//                 <MatchCard match={match} round="Semi-Final" />
//                 {/* Bracket Line: Horizontal bar coming out of the match */}
//                 <div className="absolute right-[-2.5rem] top-1/2 transform -translate-y-1/2 w-10 h-0.5 bg-gray-600"></div>
//               </div>
//             ))}
//           </div>

//           {/* Column 3: FINAL (Center) */}
//           <div className="flex flex-col justify-center h-full py-64 w-full">
//             <h3 className="text-xl font-bold tracking-wider text-yellow-400 text-center mb-6">
//               FINAL
//             </h3>
//             {groupedMatches.final.map((match) => (
//               <div key={match.id} className="relative">
//                 <MatchCard match={match} round="Final" />
//               </div>
//             ))}
//           </div>

//           {/* Column 4: Semi-Finals (Right Side) */}
//           <div className="flex flex-col justify-center h-full py-32 w-full pl-12">
//             <h3 className="text-xl font-bold tracking-wider text-blue-400 text-center mb-6 opacity-0">
//               SF
//             </h3>
//             {groupedMatches.sfRight.map((match) => (
//               <div key={match.id} className="relative mb-28 last:mb-0">
//                 <MatchCard match={match} round="Semi-Final" reverse={true} />
//                 {/* Bracket Line: Horizontal bar coming out of the match */}
//                 <div className="absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2 w-10 h-0.5 bg-gray-600"></div>
//               </div>
//             ))}
//           </div>

//           {/* Column 5: Quarter-Finals (Right Side) */}
//           <div className="flex flex-col justify-around h-full py-16 w-full pl-12">
//             <h3 className="text-xl font-bold tracking-wider text-blue-400 text-right mb-6 col-span-1">
//               QF RIGHT
//             </h3>
//             {groupedMatches.qfRight.map((match) => (
//               <div key={match.id} className="relative mb-16 last:mb-0">
//                 <MatchCard match={match} round="Quarter-Final" reverse={true} />
//                 {/* Bracket Line: Horizontal bar coming out of the match */}
//                 <div className="absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2 w-10 h-0.5 bg-gray-600"></div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Layout: Stacked for readability */}
//         <div className="md:hidden flex flex-col gap-6">
//           <h3 className="text-xl font-bold tracking-wider text-blue-400 border-b border-blue-400 pb-2 mb-4">
//             QUARTER FINALS
//           </h3>
//           {[...groupedMatches.qfLeft, ...groupedMatches.qfRight].map(
//             (match) => (
//               <MatchCard key={match.id} match={match} round="Quarter-Final" />
//             )
//           )}

//           <h3 className="text-xl font-bold tracking-wider text-blue-400 border-b border-blue-400 pb-2 mt-6 mb-4">
//             SEMI FINALS
//           </h3>
//           {[...groupedMatches.sfLeft, ...groupedMatches.sfRight].map(
//             (match) => (
//               <MatchCard key={match.id} match={match} round="Semi-Final" />
//             )
//           )}

//           <h3 className="text-xl font-bold tracking-wider text-yellow-400 border-b border-yellow-400 pb-2 mt-6 mb-4">
//             FINAL
//           </h3>
//           {groupedMatches.final.map((match) => (
//             <MatchCard key={match.id} match={match} round="Final" />
//           ))}
//         </div>

//         <footer className="text-center mt-12 text-sm text-gray-500">
//           The matches marked with "TBD" represent the qualifying slots from the
//           Group Stage.
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default KnockoutBracket;


///////////////////////222222222222222222222222 chat

// import React, { useEffect, useState } from "react";
// import axiosBase from "../../api/axiosBase";

// const KnockoutBracket = () => {
//   const [qfMatches, setQfMatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const res = await axiosBase(
//           "/matches/knockout?stage=quarter"
//         );
        
//         setQfMatches(res.data);
//       } catch (err) {
//         console.error("Error loading matches:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMatches();
//   }, []);

//   const placeholders = [
//     { id: 1, team_a: "Winner A", team_b: "Runner-up B" },
//     { id: 2, team_a: "Winner B", team_b: "Runner-up C" },
//     { id: 3, team_a: "Winner C", team_b: "Best 3rd #1" },
//     { id: 4, team_a: "Runner-up A", team_b: "Best 3rd #2" },
//   ];

//   const listToShow = qfMatches.length > 0 ? qfMatches : placeholders;

//   return (
//     <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex flex-col items-center">
//       <h1 className="text-2xl font-bold text-blue-400 mb-6">Quarter Finals</h1>
//       <div className="flex flex-col gap-4">
//         {listToShow.map((m, idx) => (
//           <div
//             key={idx}
//             className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 flex justify-between w-72"
//           >
//             <span>{m.team_a || m.team_a_name}</span>
//             <span className="text-gray-400">vs</span>
//             <span>{m.team_b || m.team_b_name}</span>
//           </div>
//         ))}
//       </div>
//       {loading && <p className="text-gray-400 mt-4">Loading...</p>}
//     </div>
//   );
// };

// export default KnockoutBracket;





///////////////////////33333333333333333
// export default function KnockoutBracket() {
//   const placeholders = {
//     quarter: [
//       { team_a: "Winner A", team_b: "Runner-up B" },
//       { team_a: "Winner B", team_b: "Runner-up C" },
//       { team_a: "Winner C", team_b: "Best 3rd #1" },
//       { team_a: "Runner-up A", team_b: "Best 3rd #2" },
//     ],
//     semi: [
//       { team_a: "Winner QF1", team_b: "Winner QF2" },
//       { team_a: "Winner QF3", team_b: "Winner QF4" },
//     ],
//     final: [{ team_a: "Winner SF1", team_b: "Winner SF2" }],
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-gray-100 py-10 px-4">
//       <h1 className="text-3xl font-bold text-center text-blue-400 mb-12">
//         Knockout Bracket
//       </h1>

//       {/* grid with 3 columns */}
//       <div className="flex justify-center items-start gap-12 overflow-x-auto">
//         {/* Quarter Finals */}
//         <div className="flex flex-col justify-around relative h-[600px]">
//           <h2 className="text-blue-400 font-semibold mb-4">Quarter Finals</h2>
//           {placeholders.quarter.map((match, i) => (
//             <div key={i} className="relative flex flex-col items-center my-6">
//               <div className="bg-gray-800 w-56 p-3 rounded-lg border border-gray-700 text-center">
//                 <p>{match.team_a}</p>
//                 <p className="text-gray-400 text-sm my-1">vs</p>
//                 <p>{match.team_b}</p>
//               </div>
//               {/* connector line */}
//               {i % 2 === 0 && (
//                 <div className="absolute right-[-50px] top-1/2 w-[50px] h-[2px] bg-gray-600"></div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Semi Finals */}
//         <div className="flex flex-col justify-around relative h-[600px]">
//           <h2 className="text-blue-400 font-semibold mb-4 text-center">
//             Semi Finals
//           </h2>
//           {placeholders.semi.map((match, i) => (
//             <div key={i} className="relative flex flex-col items-center my-24">
//               <div className="bg-gray-800 w-56 p-3 rounded-lg border border-gray-700 text-center">
//                 <p>{match.team_a}</p>
//                 <p className="text-gray-400 text-sm my-1">vs</p>
//                 <p>{match.team_b}</p>
//               </div>
//               {/* connector lines coming in */}
//               <div className="absolute left-[-50px] top-1/2 w-[50px] h-[2px] bg-gray-600"></div>
//               <div className="absolute right-[-50px] top-1/2 w-[50px] h-[2px] bg-gray-600"></div>
//             </div>
//           ))}
//         </div>

//         {/* Final */}
//         <div className="flex flex-col justify-center items-center relative h-[600px]">
//           <h2 className="text-yellow-400 font-semibold mb-4">Final</h2>
//           <div className="bg-gray-800 w-56 p-3 rounded-lg border border-yellow-700 text-center">
//             <p>{placeholders.final[0].team_a}</p>
//             <p className="text-gray-400 text-sm my-1">vs</p>
//             <p>{placeholders.final[0].team_b}</p>
//           </div>
//           {/* connector left */}
//           <div className="absolute left-[-50px] top-1/2 w-[50px] h-[2px] bg-gray-600"></div>
//         </div>
//       </div>
//     </div>
//   );
// }





















// ///////////////////////4
// import React from "react";

// const KnockoutBracket = () => {
//   const stages = {
//     QF: [
//       { id: 1, teamA: "Winner A", teamB: "Runner B" },
//       { id: 2, teamA: "Winner B", teamB: "Runner C" },
//       { id: 3, teamA: "Winner C", teamB: "Best 3rd A" },
//       { id: 4, teamA: "Runner A", teamB: "Best 3rd B" },
//     ],
//     SF: [
//       { id: 1, teamA: "QF1 Winner", teamB: "QF2 Winner" },
//       { id: 2, teamA: "QF3 Winner", teamB: "QF4 Winner" },
//     ],
//     Final: [{ id: 1, teamA: "SF1 Winner", teamB: "SF2 Winner" }],
//   };

//   return (
//     <div className="w-full overflow-x-auto p-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
//       {/* Desktop */}
//       <div className="min-w-[900px] hidden md:flex flex-row justify-center gap-20 relative">
//         <Stage title="Quarter Finals" matches={stages.QF} />
//         <SVGConnector direction="right" />
//         <Stage title="Semi Finals" matches={stages.SF} />
//         <SVGConnector direction="right" />
//         <Stage title="Final" matches={stages.Final} single />
//       </div>

//       {/* Mobile */}
//       <div className="flex flex-col md:hidden items-center gap-10">
//         <StageMobile title="Quarter Finals" matches={stages.QF} columns={2} />
//         <CurvedDivider />
//         <StageMobile title="Semi Finals" matches={stages.SF} columns={2} />
//         <CurvedDivider />
//         <StageMobile title="Final" matches={stages.Final} columns={1} final />
//       </div>
//     </div>
//   );
// };

// const Stage = ({ title, matches, single }) => (
//   <div className="flex flex-col justify-center gap-12 relative">
//     <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
//     {matches.map((m) => (
//       <MatchCard key={m.id} {...m} wide={single} />
//     ))}
//   </div>
// );

// const StageMobile = ({ title, matches, columns, final }) => (
//   <div className="w-full text-center">
//     <h2 className="text-lg font-bold mb-3">{title}</h2>
//     <div
//       className={`grid ${
//         columns === 2 ? "grid-cols-2" : "grid-cols-1"
//       } gap-4 justify-items-center`}
//     >
//       {matches.map((m) => (
//         <MatchCard key={m.id} {...m} mobile final={final} />
//       ))}
//     </div>
//   </div>
// );

// const MatchCard = ({ teamA, teamB, mobile, wide, final }) => (
//   <div
//     className={`${
//       mobile ? (final ? "w-[80%]" : "w-[85%]") : wide ? "w-52" : "w-40"
//     } bg-slate-700 rounded-2xl shadow-lg shadow-slate-900/50 p-3 text-center relative hover:scale-[1.03] transition-transform duration-200`}
//   >
//     <div className="flex flex-col gap-2">
//       <div className="bg-slate-600 py-1 rounded">{teamA}</div>
//       <div className="text-sm text-slate-400">vs</div>
//       <div className="bg-slate-600 py-1 rounded">{teamB}</div>
//     </div>
//   </div>
// );

// const SVGConnector = ({ direction }) => (
//   <svg
//     width="80"
//     height="300"
//     className={`absolute top-1/2 -translate-y-1/2 ${
//       direction === "right" ? "right-[-40px]" : "left-[-40px]"
//     }`}
//   >
//     <path
//       d="M0,150 C40,150 40,0 80,0"
//       stroke="#94a3b8"
//       strokeWidth="2"
//       fill="none"
//       strokeDasharray="4 4"
//     />
//     <path
//       d="M0,150 C40,150 40,300 80,300"
//       stroke="#94a3b8"
//       strokeWidth="2"
//       fill="none"
//       strokeDasharray="4 4"
//     />
//   </svg>
// );

// const CurvedDivider = () => (
//   <div className="w-full flex justify-center">
//     <svg width="200" height="40" viewBox="0 0 200 40">
//       <path
//         d="M0 20 Q100 0 200 20 Q100 40 0 20"
//         stroke="#64748b"
//         strokeWidth="2"
//         fill="none"
//         className="opacity-60"
//       />
//     </svg>
//   </div>
// );

// export default KnockoutBracket;







////////////////////5555
import React, { useEffect, useState } from "react";
import axiosBase from "../../api/axiosBase";

const KnockoutBracket = () => {
  const [stages, setStages] = useState({
    QF: [],
    SF: [],
    Final: [],
  });

  useEffect(() => {
    const fetchKnockouts = async () => {
      try {
        const quarters = await getStageData("quarter");
        const semis = await getStageData("semi");
        const finals = await getStageData("final");

        setStages({
          QF: quarters.length ? quarters : getPlaceholder("QF"),
          SF: semis.length ? semis : getPlaceholder("SF"),
          Final: finals.length ? finals : getPlaceholder("Final"),
        });
      } catch (err) {
        console.error("Error fetching knockout data:", err);
        // fallback to placeholder if error
        setStages({
          QF: getPlaceholder("QF"),
          SF: getPlaceholder("SF"),
          Final: getPlaceholder("Final"),
        });
      }
    };

    fetchKnockouts();
  }, []);

  const getStageData = async (stage) => {
    const res = await axiosBase.get(`/matches/knockout/${stage}`);
    return res.data.map((m) => ({
      id: m.id,
      teamA: m.team_a_name,
      teamB: m.team_b_name,
      scoreA: m.score_a,
      scoreB: m.score_b,
      played: m.played,
    }));
  };

  const getPlaceholder = (stage) => {
    switch (stage) {
      case "QF":
        return [
          { id: 1, teamA: "Winner A", teamB: "Runner B" },
          { id: 2, teamA: "Winner B", teamB: "Runner C" },
          { id: 3, teamA: "Winner C", teamB: "Best 3rd A" },
          { id: 4, teamA: "Runner A", teamB: "Best 3rd B" },
        ];
      case "SF":
        return [
          { id: 1, teamA: "QF1 Winner", teamB: "QF2 Winner" },
          { id: 2, teamA: "QF3 Winner", teamB: "QF4 Winner" },
        ];
      case "Final":
        return [{ id: 1, teamA: "SF1 Winner", teamB: "SF2 Winner" }];
      default:
        return [];
    }
  };

  



  return (
    <div className="w-full  overflow-x-auto p-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <h1 className="text-4xl sm:text-5xl text-center  font-extrabold text-[#0875f3] mb-8 mt-3 md:mt-6  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
        Tournament Knockout Stage
      </h1>
      {/* <h1 className="text-3xl sm:text-4xl text-center  font-extrabold text-[#0875f3] mb-8 mt-6">
        Tournament Match Recorder
      </h1> */}
      {/* Desktop */}
      <div className="min-w-[900px] hidden md:flex flex-row justify-center gap-20 relative">
        <Stage title="Quarter Finals" matches={stages.QF} />
        <SVGConnector direction="right" />
        <Stage title="Semi Finals" matches={stages.SF} />
        <SVGConnector direction="right" />
        <Stage title="Final" matches={stages.Final} single />
      </div>

      {/* Mobile */}
      <div className="flex flex-col md:hidden items-center gap-10">
        <StageMobile title="Quarter Finals" matches={stages.QF} columns={2} />
        <CurvedDivider />
        <StageMobile title="Semi Finals" matches={stages.SF} columns={2} />
        <CurvedDivider />
        <StageMobile title="Final" matches={stages.Final} columns={1} final />
      </div>
    </div>
  );
};

const Stage = ({ title, matches, single }) => (
  <div className="flex flex-col justify-center gap-12 relative">
    <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
    {matches.map((m) => (
      <MatchCard key={m.id} {...m} wide={single} />
    ))}
  </div>
);

const StageMobile = ({ title, matches, columns, final }) => (
  <div className="w-full text-center">
    <h2 className="text-lg font-bold mb-3">{title}</h2>
    <div
      className={`grid ${
        columns === 2 ? "grid-cols-2" : "grid-cols-1"
      } gap-4 justify-items-center`}
    >
      {matches.map((m) => (
        <MatchCard key={m.id} {...m} mobile final={final} />
      ))}
    </div>
  </div>
);



/////////
  // A simple function to generate a random match time for upcoming fixtures
  const getRandomTime = (matchId) => {
    const times = ["19:00", "20:00", "21:00", "22:00"];
    // Use match ID to get a consistent "random" time
    return times[matchId % times.length];
  };

const MatchCard = ({
  teamA,
  teamB,
  scoreA,
  scoreB,
  played,
  id,
  mobile,
  wide,
  final,
}) => (
  <div
    className={`${
      mobile ? (final ? "w-[80%]" : "w-[85%]") : wide ? "w-52" : "w-40"
    } bg-slate-700 rounded-2xl shadow-lg shadow-slate-900/50 p-3 text-center relative hover:scale-[1.03] transition-transform duration-200`}
  >
    <div className="flex flex-col gap-2 items-center">
      <div className="w-full bg-slate-600 py-1 rounded">{teamA}</div>
      {/* Score or Time */}
      <div className="w-24 text-center">
        {played ? (
          <span className="text-2xl font-bold bg-gray-700/50 px-3 py-1 rounded-md text-white">
            {scoreA} - {scoreB}
          </span>
        ) : (
          <div className="text-center">
            <span className="text-xl font-bold text-blue-400">
              {getRandomTime(id)}
            </span>
            <span className="text-xs text-gray-400 block">Upcoming</span>
          </div>
        )}
      </div>
      <div className="w-full bg-slate-600 py-1 rounded">{teamB}</div>
    </div>
  </div>
);

const SVGConnector = ({ direction }) => (
  <svg
    width="80"
    height="300"
    className={`absolute top-1/2 -translate-y-1/2 ${
      direction === "right" ? "right-[-40px]" : "left-[-40px]"
    }`}
  >
    <path
      d="M0,150 C40,150 40,0 80,0"
      stroke="#94a3b8"
      strokeWidth="2"
      fill="none"
      strokeDasharray="4 4"
    />
    <path
      d="M0,150 C40,150 40,300 80,300"
      stroke="#94a3b8"
      strokeWidth="2"
      fill="none"
      strokeDasharray="4 4"
    />
  </svg>
);

const CurvedDivider = () => (
  <div className="w-full flex justify-center">
    <svg width="200" height="40" viewBox="0 0 200 40">
      <path
        d="M0 20 Q100 0 200 20 Q100 40 0 20"
        stroke="#64748b"
        strokeWidth="2"
        fill="none"
        className="opacity-60"
      />
    </svg>
  </div>
);

export default KnockoutBracket;
