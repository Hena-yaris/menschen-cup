import React, { useEffect, useState } from "react";
import axiosBase from "../api/axiosBase";

function Setting() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axiosBase.get("/teams/teamslist");
        setTeams(res.data);
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchTeams();
  }, []);

  const handleResetClick = async () => {
    const confirmReset = window.confirm(
      "Are you sure? This will delete ALL teams and matches."
    );
    if (!confirmReset) return;

    try {
      await axiosBase.delete("/teams/reset-Demo");
      alert("Demo data wiped successfully!");
      window.location.reload();
    } catch (err) {
      alert("Error resetting demo data");
    }
  };

  return (
    <section className="bg-gray-950 min-h-screen p-6">
      <button
        onClick={handleResetClick}
        className="px-5 py-2.5 rounded-lg border border-red-500 text-red-400 
             hover:bg-red-500/10 hover:text-red-200 
             transition-all duration-200 font-medium"
      >
        ⚠ Reset Demo Data
      </button>

      {/* Beautiful Team Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="
              bg-gray-900 
              p-4 rounded-xl 
              border border-orange-500/20 
              shadow-md 
              hover:border-orange-500 
              hover:shadow-orange-500/20 
              transition-all 
              text-white
            "
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-orange-300">{team.name}</h2>
              <span
                className="
                  text-xs 
                  bg-orange-500/20 
                  px-2 py-1 
                  rounded-md 
                  text-orange-400 
                  font-semibold
                "
              >
                Group {team.group_name || "-"}
              </span>
            </div>

            <div className="text-sm text-gray-400 space-y-1">
              <p>Wins: {team.wins}</p>
              <p>Draws: {team.draws}</p>
              <p>Losses: {team.losses}</p>
              <p>
                Points:{" "}
                <span className="text-orange-300 font-semibold">
                  {team.points}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Setting;
