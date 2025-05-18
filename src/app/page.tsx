import React from 'react';
import { HighlightCard, Timeline } from '../components';
import strengths from '../data/strengths';

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header Section */}
          <header className="mb-6 text-center pt-[25px]">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2" style={{ fontFamily: 'Aptos Display, sans-serif' }}>Parag Jain</h1>
            <h2 className="text-xl md:text-2xl text-blue-700 font-semibold mb-2">Generative AI Architect | Technology Strategist | App Developer</h2>
            <p className="text-slate-600 italic mb-4">"Shaping intelligent automations   with AI-driven innovation."</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline Section (Left) */}
            <section>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Chapters of My Career</h3>
              <p className="text-xs text-slate-400 mb-2" style={{ fontSize: '0.7rem' }}>
                Click on years to know more
              </p>
              <Timeline />
            </section>
            {/* Skills & Experience Highlights (Right) */}
            <aside className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Strengths That Drive Results</h3>
              <div className="grid gap-3">
                {strengths.map((s, idx) => (
                  <div
                    key={s.title}
                    className={`flex items-center gap-4 bg-gradient-to-r ${s.icon === 'engagement' ? 'from-orange-100' : s.icon === 'leadership' ? 'from-cyan-100' : `from-${s.color}-50`} to-white rounded-xl shadow p-4 border ${s.icon === 'engagement' ? 'border-orange-200' : s.icon === 'leadership' ? 'border-cyan-200' : `border-${s.color}-100`} hover:shadow-lg transition-all`}
                  >
                    <span className={`${s.icon === 'engagement' ? 'bg-orange-500' : s.icon === 'leadership' ? 'bg-cyan-600' : `bg-${s.color}-600`} text-white rounded-full p-2 shadow text-xl`}>
                      {/* Icon selection */}
                      {s.icon === 'lightbulb' && (
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6a3.5 3.5 0 0 1-7 0c-1.5-1.5-3-3.5-3-6a7 7 0 0 1 7-7z"/></svg>
                      )}
                      {s.icon === 'ai' && (
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M8 20v-4M16 20v-2M12 4v4M4 12h16"/></svg>
                      )}
                      {s.icon === 'architecture' && (
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M16 8v8M8 8v8"/></svg>
                      )}
                      {s.icon === 'engagement' && (
                        // Corporate Social Engagement: Handshake SVG
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 17l5 1 2-2 2 2 5-1"/>
                          <path d="M2 12l5 5 2-2 2 2 5-5"/>
                          <path d="M16 7a2 2 0 0 1 4 0v2a2 2 0 0 1-2 2h-2"/>
                          <path d="M8 7a2 2 0 0 0-4 0v2a2 2 0 0 0 2 2h2"/>
                        </svg>
                      )}
                      {s.icon === 'leadership' && (
                        // Leadership, Strategy & Vision: Target SVG
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <circle cx="12" cy="12" r="6"/>
                          <circle cx="12" cy="12" r="2"/>
                          <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
                        </svg>
                      )}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-800">{s.title}</div>
                      <div className="text-xs text-slate-500">{s.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
