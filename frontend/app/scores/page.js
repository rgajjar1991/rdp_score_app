// app/scores/page.js
"use client";

import { useState } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function Scores() {
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await API.post("/scores", {
        score: Number(score),
        played_at: date,
      });
      setMessage({ type: "success", text: "Score recorded successfully! Redirecting..." });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to record score. Please check your subscription status." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080a]">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-4 py-20 flex flex-col items-center">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white tracking-tight">Record Your <span className="text-emerald-400">Round</span></h1>
          <p className="text-gray-400 mt-3 text-lg">Input your final score and the date played to track your progress.</p>
        </div>

        <div className="w-full max-w-lg glass-card p-10 rounded-3xl border border-white/10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={submit} className="space-y-8">
            {message && (
              <div className={`p-4 rounded-xl text-sm border ${
                message.type === "success" 
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                : "bg-red-500/10 border-red-500/50 text-red-400"
              }`}>
                {message.text}
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Total Strokes</label>
              <input
                type="number"
                required
                placeholder="72"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-3xl font-extrabold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/10"
                onChange={(e) => setScore(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Date Played</label>
              <input
                type="date"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Record Round <span>⛳</span></>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xl">💡</span>
              <p className="text-sm text-gray-500 italic">
                Pro Tip: Consistent tracking is the first step toward improving your handicap. Record every round, even the bad ones!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}