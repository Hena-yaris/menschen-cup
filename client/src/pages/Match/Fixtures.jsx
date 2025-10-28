
import React, { useEffect, useState } from "react";
import axiosBase from "../../api/axiosBase";

const Fixtures = () => {
  const [matches, setMatches] = useState([]);

  useEffect( ()=> {
      const fetch = async ()=> {
          try {
            const res = await axiosBase.get("/matches/groupMatch-fixture");
            setMatches(res.data);
          } catch (err) {
            alert("Error getting Group matches");
          }
      }

      fetch();
  },[])

  // group matches by group_name
  const grouped = matches.reduce((acc, m) => {
    if (!acc[m.group_name]) acc[m.group_name] = [];
    acc[m.group_name].push(m);
    return acc;
  }, {});

  // Helper to get initials from team name for placeholder logos
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // A simple function to generate a random match time for upcoming fixtures
  const getRandomTime = (matchId) => {
    const times = ["19:00", "20:00", "21:00", "22:00"];
    // Use match ID to get a consistent "random" time
    return times[matchId % times.length];
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Group Stage Fixtures
          </h1>
          <p className="text-blue-400 mt-2 text-lg">
            The Road to Glory Starts Here
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.keys(grouped)
            .sort()
            .map((group) => (
              <div
                key={group}
                className="bg-gray-800/50 rounded-xl shadow-2xl border border-gray-700"
              >
                <h3 className="text-2xl font-bold p-4 bg-black/30 tracking-wider border-b border-gray-700 text-white">
                  Group {group}
                </h3>
                <div className="p-4 space-y-4">
                  {grouped[group].map((match) => (
                    <div
                      key={match.id}
                      className="bg-gray-900/60 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/80"
                    >
                      <div className="flex justify-between items-center">
                        {/* Team A */}
                        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 justify-start">
                          <img
                            src={`https://placehold.co/40x40/1E293B/E0E7FF?text=${getInitials(
                              match.team_a_name
                            )}&font=roboto`}
                            alt={`${match.team_a_name} logo`}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-semibold text-sm sm:text-base text-center sm:text-left">
                            {match.team_a_name}
                          </span>
                        </div>

                        {/* Score or Time */}
                        <div className="w-24 text-center">
                          {match.played ? (
                            <span className="text-2xl font-bold bg-gray-700/50 px-3 py-1 rounded-md text-white">
                              {match.score_a} - {match.score_b}
                            </span>
                          ) : (
                            <div className="text-center">
                              <span className="text-xl font-bold text-blue-400">
                                {getRandomTime(match.id)}
                              </span>
                              <span className="text-xs text-gray-400 block">
                                Upcoming
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Team B */}
                        <div className="flex-1 flex flex-col sm:flex-row-reverse items-center gap-3 justify-start">
                          <img
                            src={`https://placehold.co/40x40/1E293B/E0E7FF?text=${getInitials(
                              match.team_b_name
                            )}&font=roboto`}
                            alt={`${match.team_b_name} logo`}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-semibold text-sm sm:text-base text-center sm:text-right">
                            {match.team_b_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Fixtures;

