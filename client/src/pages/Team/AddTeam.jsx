import React from "react";
import { useState } from "react";
import axiosBase from "../../api/axiosBase";


const AddTeam = ()=> {
    const [name,setName] = useState("");
    const [group_name,setGroup_name] = useState("");


    const handleSubmit = async (e)=> {
        e.preventDefault();
        if(!name || !group_name) return alert("Please required all field");

        try {
             const res = await axiosBase.post("/teams/add-teams",{name,group_name})

            alert(res.data.message);
            setName("");
            setGroup_name("");
        } catch (err) {
            console.error(err);
            alert("error adding team")
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
              <span className="w-5 h-5 mr-2 text-indigo-500">+</span>Add New
              Team
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

                <div className="flex flex-col gap-1 flex-[1]">
                  <label className="text-sm font-medium text-gray-700">
                    Group
                  </label>
                  <select
                    className="p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    value={group_name}
                    onChange={(e) => setGroup_name(e.target.value)}
                  >
                    <option value="">Select a group</option>
                    <option value="A">Group A</option>
                    <option value="B">Group B</option>
                    <option value="C">Group C</option>
                    <option value="D">Group D</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition "
              >
                Add Team
              </button>
            </form>
          </div>
        </div>
      </>
    );
};

export default AddTeam;