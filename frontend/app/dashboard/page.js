// app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/scores")
      .then((res) => {
        setScores(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Calculate some stats
  const bestScore = scores.length > 0 ? Math.min(...scores.map(s => s.score)) : "-";
  const avgScore = scores.length > 0 ? (scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length).toFixed(1) : "-";

  return (
    <div className="min-h-screen bg-[#05080a]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Performance <span className="text-emerald-400">Hub</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Detailed analysis of your recent golf rounds.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="glass-card px-6 py-4 rounded-2xl flex flex-col items-center">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Best Score</span>
              <span className="text-2xl font-bold text-white">{bestScore}</span>
            </div>
            <div className="glass-card px-6 py-4 rounded-2xl flex flex-col items-center">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Avg Score</span>
              <span className="text-2xl font-bold text-emerald-400">{avgScore}</span>
            </div>
            <div className="glass-card px-6 py-4 rounded-2xl flex flex-col items-center border-emerald-500/30 bg-emerald-500/5">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Rounds</span>
              <span className="text-2xl font-bold text-white">{scores.length}</span>
            </div>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            Recent Activity
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card h-48 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : scores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scores.map((s, index) => (
                <div 
                  key={s.id} 
                  className="glass-card p-6 rounded-3xl transition-all hover:translate-y-[-4px] hover:border-emerald-500/30 group"
                  style={{ animationDelay: `${0.1 + (index * 0.05)}s` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                      ⛳
                    </div>
                    <div className="bg-white/5 px-3 py-1 rounded-full text-xs font-medium text-gray-400 border border-white/5">
                      {new Date(s.played_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500 text-sm font-medium">Final Score</p>
                    <p className="text-4xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">{s.score}</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-bold uppercase tracking-tighter">Round Completed</span>
                    <button className="text-emerald-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Details →</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-20 rounded-3xl flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-6 opacity-20">⛳</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Rounds Logged Yet</h3>
              <p className="text-gray-500 max-w-sm mb-8">Start tracking your golf performance by adding your first score.</p>
              <button 
                onClick={() => window.location.href = "/scores"}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all"
              >
                Add Your First Score
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}