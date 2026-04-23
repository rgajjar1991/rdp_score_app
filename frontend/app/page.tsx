"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05080a] selection:bg-emerald-500/30">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-32 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 mb-8 animate-fade-in">
            <span className="mr-2">✨</span> New: Monthly Golf Challenges
          </div>
          
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Golf Game</span> to Pro Levels
          </h1>
          
          <p className="max-w-2xl text-lg text-gray-400 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Track every stroke, analyze your performance, and compete for amazing monthly rewards. The ultimate companion for modern golfers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => router.push("/login")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-xl shadow-emerald-500/25 flex items-center gap-2"
            >
              Get Started Free <span>→</span>
            </button>

            <button
              onClick={() => router.push("/subscribe")}
              className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl transition-all border border-white/10 backdrop-blur-sm"
            >
              View Pricing
            </button>
          </div>

          {/* Stats/Social Proof */}
          <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { label: "Active Players", value: "10k+" },
              { label: "Rounds Logged", value: "250k+" },
              { label: "Prizes Awarded", value: "$50k+" },
              { label: "Accuracy Rating", value: "99.9%" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Image Mockup (Visual placeholder using gradients) */}
      <div className="relative mx-auto max-w-5xl px-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="aspect-[16/9] w-full rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-slate-900 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080a] via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}