import React from "react";
import { useState } from "react";
import axiosBase from "../../api/axiosBase";


const AddTeam = ()=> {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  // const [group_name,setGroup_name] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Please required the field");
    setIsLoading(true);


    try {
      const res = await axiosBase.post("/teams/add-teams", { name });

      alert(res.data.message);
      setName("");
    } catch (err) {
      console.error(err);
      alert("error adding team");
    }finally{
      setIsLoading(false);
    }
  };

  //Group generation
  const groupGeneration = async () => {
    setIsLoading(true);
    try {
      const res = await axiosBase.post("/teams/auto-group");
      alert(res.data.message || "groups generated successfully");
    } catch (error) {
      console.error(error);
      alert("Error Generating teams");
      console.log(res.data);
    }finally{
      setIsLoading(false);
    }
  };

  //Auto match Generation
  const matchGeneration = async ()=> {
    setIsLoading(true);
    try{
        const res = await axiosBase.post("/matches/generateGroup-match");
        alert(res.data.message);

    }catch(err) {
        alert("Error generating match")
        console.log(res.data);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="bg-gray-950 min-h-screen flex justify-center items-start md:items-center gap-6 flex-col p-4 pt-20 md:pt-4">
        {/**ADDING TEAMS header */}
        <h1
          className="mr-auto text-4xl sm:text-5xl text-center font-extrabold mb-10 mt-6 py-3 px-6 
               text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 
               rounded-2xl shadow-2xl border-b-4 border-orange-500/70 "
        >
          Adding New Teams
        </h1>
        {/* UPPER CARD: App Title */}
        <div className="bg-gray-800 w-full max-w-lg p-6 rounded-xl border border-yellow-500/50 shadow-2xl">
          <h1
            className="font-extrabold text-3xl md:text-4xl text-center
            text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
          >
            Menschen-Cup
          </h1>
        </div>

        {/* BOTTOM CARD: Form and Actions */}
        <div className="bg-gray-800 w-full max-w-lg p-8 md:p-10 rounded-xl shadow-2xl border border-orange-500/30">
          <h2 className="text-2xl font-bold mb-6 text-orange-400 flex items-center">
            <svg
              className="w-6 h-6 mr-2 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
            Add New Team
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 my-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">
                  Team Name
                </label>
                <input
                  type="text"
                  placeholder="Enter team name (e.g., 'The Titans')"
                  className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-orange-600 transition duration-200
                         transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Team"}
            </button>
          </form>

          {/**Generate Buttons */}
          <div className="text-center flex gap-4 mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={groupGeneration}
              className="text-white w-1/2 font-semibold bg-gradient-to-r from-yellow-500 to-orange-600 py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition duration-200
                         transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Groups"}
            </button>
            <button
              onClick={matchGeneration}
              className="text-white w-1/2 font-semibold bg-gradient-to-r from-yellow-500 to-orange-600 py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition duration-200
                         transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Matches"}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="bg-gray-200 h-screen flex justify-center items-center gap-4 flex-col p-4">
  //       {/* upper */}
  //       <div className="bg-white w-full max-w-lg p-4 rounded-lg shadow-lg">
  //         <h1 className="font-bold text-4xl text-center">Menschen-Cup</h1>
  //       </div>

  //       {/* bottom */}
  //       <div className="bg-white w-full max-w-lg p-10 rounded-lg shadow-lg">
  //         <h2>
  //           <span className="w-5 h-5 mr-2 text-indigo-500">+</span>Add New Team
  //         </h2>

  //         <form onSubmit={handleSubmit}>
  //           <div className="flex gap-4 flex-col sm:flex-row my-5">
  //             <div className="flex flex-col gap-1 flex-[5]">
  //               <label className="text-sm font-medium text-gray-700">
  //                 Team Name
  //               </label>
  //               <input
  //                 type="text"
  //                 placeholder="Enter team name"
  //                 className="p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //                 value={name}
  //                 onChange={(e) => setName(e.target.value)}
  //               />
  //             </div>
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition "
  //           >
  //             Add Team
  //           </button>
  //         </form>

  //         {/**Generate the Group */}
  //         <div className="text-center flex gap-2">
  //           <button
  //             onClick={groupGeneration}
  //             className="text-white w-1/2  bg-green-600 py-2 px-4 rounded mt-2"
  //           >
  //             Generate Groups
  //           </button>
  //           <button
  //             onClick={matchGeneration}
  //             className="text-white w-1/2  bg-green-600 py-2 px-4 rounded mt-2"
  //           >
  //             Generate Group Matches
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default AddTeam;