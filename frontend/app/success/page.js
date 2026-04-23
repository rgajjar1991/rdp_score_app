// app/success/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Success() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/dashboard");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#05080a] flex items-center justify-center px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 pointer-events-none" />
      
      <div className="w-full max-w-lg glass-card p-12 rounded-[3rem] text-center relative z-10 border-emerald-500/20">
        <div className="h-24 w-24 rounded-full bg-emerald-500 mx-auto flex items-center justify-center text-5xl mb-8 animate-bounce shadow-2xl shadow-emerald-500/50">
          ✅
        </div>
        
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Payment <span className="text-emerald-400">Successful!</span></h1>
        <p className="text-gray-400 text-lg mb-10">
          Welcome to the Elite club! Your subscription is now active, and you've been entered into this month's reward draw.
        </p>

        <div className="bg-emerald-500/10 rounded-2xl p-6 mb-10 border border-emerald-500/20">
          <p className="text-emerald-400 font-medium">
            Redirecting to your dashboard in <span className="text-white font-bold text-xl">{countdown}</span> seconds...
          </p>
        </div>

        <Link 
          href="/dashboard"
          className="inline-block w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all border border-white/10"
        >
          Go to Dashboard Now
        </Link>
      </div>
    </div>
  );
}
