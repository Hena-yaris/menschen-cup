import React from "react";
import { LockKeyhole } from "lucide-react";

function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      {/* Icon */}
      <div className="bg-red-600/10 p-6 rounded-full shadow-md mb-5">
        <LockKeyhole className="w-14 h-14 text-red-500" />
      </div>

      {/* Title */}
      <h1 className="text-red-400 text-3xl md:text-5xl font-extrabold text-center">
        Access Denied
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 mt-3 text-center max-w-md">
        You don’t have permission to view this page. Please check your account
        or contact an administrator.
      </p>

      {/* Button */}
      <a
        href="/"
        className="mt-6 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all text-white font-semibold shadow-lg"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default Unauthorized;
