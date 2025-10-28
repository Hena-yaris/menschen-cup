import React from "react";
import { useState } from "react";
import axiosBase from "../../api/axiosBase";


const AddTeam = ()=> {
  const [name, setName] = useState("");
  // const [group_name,setGroup_name] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Please required the field");

    try {
      const res = await axiosBase.post("/teams/add-teams", { name });

      alert(res.data.message);
      setName("");
    } catch (err) {
      console.error(err);
      alert("error adding team");
    }
  };

  //Group generation
  const groupGeneration = async () => {
    try {
      const res = await axiosBase.post("/teams/auto-group");
      alert(res.data.message || "groups generated successfully");
    } catch (error) {
      console.error(error);
      alert("Error Generating teams");
      console.log(res.data);
    }
  };

  //Auto match Generation
  const matchGeneration = async ()=> {
    try{
        const res = await axiosBase.post("/matches/generateGroup-match");
        alert(res.data.message);

    }catch(err) {
        alert("Error generating match")
        console.log(res.data);
    }
  }

  return (
    <>
      <div className="bg-gray-200 h-screen flex justify-center items-center gap-4 flex-col p-4">
        {/* upper */}
        <div className="bg-white w-full max-w-lg p-4 rounded-lg shadow-lg">
          <h1 className="font-bold text-4xl text-center">Menschen-Cup</h1>
        </div>

        {/* bottom */}
        <div className="bg-white w-full max-w-lg p-10 rounded-lg shadow-lg">
          <h2>
            <span className="w-5 h-5 mr-2 text-indigo-500">+</span>Add New Team
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 flex-col sm:flex-row my-5">
              <div className="flex flex-col gap-1 flex-[5]">
                <label className="text-sm font-medium text-gray-700">
                  Team Name
                </label>
                <input
                  type="text"
                  placeholder="Enter team name"
                  className="p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition "
            >
              Add Team
            </button>
          </form>

          {/**Generate the Group */}
          <div className="text-center flex gap-2">
            <button
              onClick={groupGeneration}
              className="text-white w-1/2  bg-green-600 py-2 px-4 rounded mt-2"
            >
              Generate Groups
            </button>
            <button
              onClick={matchGeneration}
              className="text-white w-1/2  bg-green-600 py-2 px-4 rounded mt-2"
            >
              Generate Group Matches
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeam;