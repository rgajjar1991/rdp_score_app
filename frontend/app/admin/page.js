// app/admin/page.js
"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function Admin() {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(null);

  useEffect(() => {
    API.get("/draw")
      .then((res) => {
        setDraws(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePublish = async (drawId) => {
    setPublishing(drawId);
    try {
      await API.post(`/draw/publish/${drawId}`);
      alert("Results published successfully!");
      // Refresh draws
      const res = await API.get("/draw");
      setDraws(res.data);
    } catch (err) {
      alert("Failed to publish results.");
    } finally {
      setPublishing(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080a]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white tracking-tight">Admin <span className="text-emerald-400">Control</span></h1>
          <p className="text-gray-400 mt-2 text-lg">Manage monthly draws and rewards distribution.</p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Monthly Draws
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </h2>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all">
              Generate New Draw
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card h-24 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : draws.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {draws.map((d) => (
                <div key={d.id} className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-emerald-500/20 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-xl font-bold text-emerald-400 border border-white/5">
                      {d.month}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Draw for {d.month}/{d.year}</h3>
                      <p className="text-gray-500 text-sm">Status: <span className={d.published ? "text-emerald-400" : "text-yellow-500"}>{d.published ? "Published" : "Pending Publication"}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-2 mr-4">
                      {d.numbers?.map((num, i) => (
                        <span key={i} className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/20">
                          {num}
                        </span>
                      ))}
                    </div>

                    <button
                      disabled={d.published || publishing === d.id}
                      onClick={() => handlePublish(d.id)}
                      className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                        d.published 
                        ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5" 
                        : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/10"
                      }`}
                    >
                      {publishing === d.id ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : d.published ? "Already Published" : "Publish Results"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-16 rounded-3xl flex flex-col items-center text-center">
              <div className="text-5xl mb-6 opacity-20">🎲</div>
              <h3 className="text-xl font-bold text-white mb-2">No Draws Generated</h3>
              <p className="text-gray-500 max-w-sm">There are no monthly draws scheduled at this time.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}