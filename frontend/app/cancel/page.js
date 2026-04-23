// app/cancel/page.js
"use client";

import Link from "next/link";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-[#05080a] flex items-center justify-center px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-red-500/5 pointer-events-none" />
      
      <div className="w-full max-w-lg glass-card p-12 rounded-[3rem] text-center relative z-10 border-red-500/20">
        <div className="h-24 w-24 rounded-full bg-white/5 mx-auto flex items-center justify-center text-5xl mb-8 border border-white/10 shadow-2xl">
          ❌
        </div>
        
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Payment <span className="text-red-400">Cancelled</span></h1>
        <p className="text-gray-400 text-lg mb-10">
          No worries! Your subscription process was cancelled. No charges were made to your account.
        </p>

        <div className="space-y-4">
          <Link 
            href="/subscribe"
            className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Try Again
          </Link>
          
          <Link 
            href="/dashboard"
            className="block w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all border border-white/10"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
