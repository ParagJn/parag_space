import React from 'react';
import { HighlightCard, Timeline } from '../components';

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header Section */}
          <header className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2" style={{ fontFamily: 'Aptos Display, sans-serif' }}>Parag Jain</h1>
            <h2 className="text-xl md:text-2xl text-blue-700 font-semibold mb-2">Generative AI Architect | Technology Strategist</h2>
            <p className="text-slate-600 italic mb-4">"Shaping intelligent automations   with AI-driven innovation."</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline Section (Left) */}
            <section>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Professional Timeline</h3>
              <Timeline />
            </section>
            {/* Skills & Experience Highlights (Right) */}
            <aside className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Key Skills & Experience</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow p-4 border border-blue-100 hover:shadow-lg transition-all">
                  <span className="bg-blue-600 text-white rounded-full p-2 shadow text-xl">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M8 20v-4M16 20v-2M12 4v4M4 12h16"/></svg>
                  </span>
                  <div>
                    <div className="font-semibold text-slate-800">AI Agent Orchestration, LLMs, Prompt Engineering</div>
                    <div className="text-xs text-slate-500">Cutting-edge GenAI, advanced prompt design</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-white rounded-xl shadow p-4 border border-green-100 hover:shadow-lg transition-all">
                  <span className="bg-green-600 text-white rounded-full p-2 shadow text-xl">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M16 8v8M8 8v8"/></svg>
                  </span>
                  <div>
                    <div className="font-semibold text-slate-800">Enterprise NLP, Healthcare Data, ML Pipelines</div>
                    <div className="text-xs text-slate-500">Domain expertise, scalable solutions</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-50 to-white rounded-xl shadow p-4 border border-yellow-100 hover:shadow-lg transition-all">
                  <span className="bg-yellow-500 text-white rounded-full p-2 shadow text-xl">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M12 3v18"/></svg>
                  </span>
                  <div>
                    <div className="font-semibold text-slate-800">Cloud: Azure, AWS, GCP</div>
                    <div className="text-xs text-slate-500">Multi-cloud architecture & deployment</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-pink-50 to-white rounded-xl shadow p-4 border border-pink-100 hover:shadow-lg transition-all">
                  <span className="bg-pink-500 text-white rounded-full p-2 shadow text-xl">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M8 20v-4M16 20v-2M12 4v4M4 12h16"/></svg>
                  </span>
                  <div>
                    <div className="font-semibold text-slate-800">Leadership, Strategy, Public Speaking</div>
                    <div className="text-xs text-slate-500">Team building, vision, communication</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
