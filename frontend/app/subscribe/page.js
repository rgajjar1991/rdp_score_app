// app/subscribe/page.js
"use client";

import API from "@/lib/api";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Subscribe() {
  const [loading, setLoading] = useState(null);

  const subscribe = async (plan) => {
    setLoading(plan);
    try {
      const res = await API.post("/subscription/create-session", { plan });
      window.location.href = res.data.url;
    } catch (err) {
      alert("Failed to initiate checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: "monthly",
      name: "Pro Monthly",
      price: "$9.99",
      period: "/month",
      features: ["Unlimited Score Tracking", "Monthly Reward Draws", "Performance Analytics", "Priority Support"],
      highlight: false
    },
    {
      id: "yearly",
      name: "Elite Yearly",
      price: "$99",
      period: "/year",
      features: ["All Pro Features", "Double Prize Entries", "Custom Club Analytics", "Exclusive Pro Lessons", "Save 20% vs Monthly"],
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#05080a]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">Choose Your <span className="text-emerald-400">Experience</span></h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Select a plan that fits your game. Upgrade or cancel at any time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`relative glass-card p-10 rounded-[2.5rem] flex flex-col border transition-all hover:scale-[1.02] duration-300 animate-fade-in ${
                plan.highlight ? "border-emerald-500/50 shadow-emerald-500/10 shadow-2xl" : "border-white/10"
              }`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Best Value
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-500 font-medium">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-[10px]">
                      ✓
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => subscribe(plan.id)}
                disabled={loading !== null}
                className={`w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.highlight 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20" 
                  : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {loading === plan.id ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  `Upgrade to ${plan.id === 'monthly' ? 'Monthly' : 'Yearly'}`
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-500 text-sm">
            All payments are processed securely via Stripe. 
            <br />
            Need a custom enterprise plan for your golf club? <Link href="#" className="text-emerald-400 hover:underline">Contact sales</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}