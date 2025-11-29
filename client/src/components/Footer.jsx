import React from 'react'

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 pt-20 border-t border-blue-500/20 backdrop-blur-md">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Left */}
    <div>
      <h2 className="text-2xl font-extrabold text-blue-400 mb-3">
        Menschen Cup 2025
      </h2>
      <p className="text-sm text-gray-400 leading-relaxed">
        Born from chaos. Powered by passion. Fueled by campus bragging rights.
        This is not just a tournament — it’s a whole vibe. ⚽🔥
      </p>
    </div>

    {/* Middle */}
    <div>
      <h3 className="text-lg font-semibold text-blue-300 mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-white transition cursor-pointer">Home</li>
        <li className="hover:text-white transition cursor-pointer">
          Live Matches
        </li>
        <li className="hover:text-white transition cursor-pointer">
          Predictions
        </li>
        <li className="hover:text-white transition cursor-pointer">Teams</li>
        <li className="hover:text-white transition cursor-pointer">
          Login / Signup
        </li>
      </ul>
    </div>

    {/* Right */}
    <div>
      <h3 className="text-lg font-semibold text-blue-300 mb-3">Stay Updated</h3>
      <p className="text-sm text-gray-400 mb-4">
        Get match alerts, score updates, and dramatic plot twists.
      </p>

      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
          👍
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
          ⚽
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
          🔥
        </div>
      </div>
    </div>
  </div>

  {/* Bottom line */}
  <div className="text-center text-xs text-green-500 mt-10">
    © {new Date().getFullYear()} Menschen Cup — “May the best legs win.”
  </div>
</footer>

  )
}

export default Footer