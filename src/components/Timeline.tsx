"use client";
import React, { useState, useRef, useEffect } from 'react';
import timelineData from '../data/timeline';

const currentYear = new Date().getFullYear();

const Timeline: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Animation: track if timeline is visible for fade-in
	const [mounted, setMounted] = useState(false);
	useEffect(() => { setMounted(true); }, []);

	// Calculate dynamic margin based on year difference
	const getMarginTop = (idx: number) => {
		if (idx === 0) return 0;
		const prevYear = timelineData[idx - 1].year;
		const currYear = timelineData[idx].year;
		// 1 year = 16px, minimum 24px for visual separation
		const yearGap = Math.max((currYear - prevYear) * 16, 24);
		return yearGap;
	};

	useEffect(() => {
		if (selected === null) return;
		const handleClick = (e: MouseEvent) => {
			// Close if click is outside any open card
			if (
				cardRefs.current[selected] &&
				!cardRefs.current[selected]?.contains(e.target as Node)
			) {
				setSelected(null);
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [selected]);

	const formatDescription = (desc: string) => {
		// Split into paragraphs
		const paragraphs = desc.split(/\n+/);
		return paragraphs.map((para, idx) => {
			const keyIdx = para.toLowerCase().indexOf('key highlight');
			if (keyIdx !== -1) {
				// Find the start of the highlight
				const before = para.slice(0, keyIdx);
				const highlightStart = keyIdx;
				// Everything after 'Key highlight' is highlighted
				const highlightText = para.slice(keyIdx);
				return (
					<p key={idx}>
						{before}
						<span className="font-bold underline underline-offset-4 decoration-red-500 text-slate-700">
							{highlightText}
						</span>
					</p>
				);
			}
			return <p key={idx}>{para}</p>;
		});
	};

	// Animation delay for each year
	const getAnimDelay = (idx: number) => `${idx * 200}ms`;

	return (
		<div className="relative flex flex-col items-center">
			<div className="border-l-3 border-slate-300 absolute left-6 top-0 h-full z-0" />
			<ul className="w-full">
				{timelineData.map((item, idx) => (
					<li
						key={item.year}
						className="relative flex items-center group"
						style={{ marginTop: idx === 0 ? 0 : getMarginTop(idx) }}
					>
						<button
							className={`z-10 w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-200
                ${item.future
									? 'border-slate-300 bg-slate-100 text-slate-400 blur-[1px] animate-pulse-slow'
									: 'border-blue-500 bg-white text-blue-700'}
                group-hover:scale-110 group-hover:text-blue-600
                ${selected === idx ? 'scale-110 ring-2 ring-blue-300' : ''}
                ${mounted ? 'opacity-100' : 'opacity-0'}
                animate-timeline-fade-in
              `}
							style={{
								animationDelay: mounted ? getAnimDelay(idx) : '0ms',
								animationFillMode: 'both',
							}}
							onClick={() => !item.future && setSelected(idx)}
							disabled={!!item.future}
							aria-label={`Show details for ${item.year}`}
						>
							<span className="font-bold text-lg">{item.year}</span>
						</button>
						{/* Popup for future year on hover */}
						{item.future && (
							<div className="absolute left-16 top-1/2 -translate-y-1/2 bg-white border border-slate-300 rounded-lg shadow-lg px-4 py-2 font-bold text-slate-700 text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-20 whitespace-nowrap">
								{item.description}
							</div>
						)}
						<div className="ml-6">
							<div className={`font-semibold ${item.future ? 'text-slate-400' : 'text-slate-800'}`}>{item.title}</div>
							{item.subtitle && (
								<div className="text-slate-500 text-sm font-bold">{item.subtitle}</div>
							)}
						</div>
						{/* Floating Card */}
						{selected === idx && !item.future && (
							<div
								ref={el => { cardRefs.current[idx] = el; }}
								className="absolute left-24 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-md w-[500px] z-30 animate-fade-in border border-slate-200"
								tabIndex={-1}
							>
								<button
									className="absolute top-2 right-2 text-slate-500 font-bold hover:text-slate-700"
									onClick={() => setSelected(null)}
									aria-label="Close"
									tabIndex={0}
								>
									✕
								</button>
								<h4 className="text-xl font-bold mb-2">
									{item.title}{' '}
									<span className="text-slate-500 font-normal">
										({item.year})
									</span>
								</h4>
								{item.subtitle && (
									<div className="text-slate-600 mb-1 font-bold">
										{item.subtitle}
									</div>
								)}
								<div className="text-slate-700">
									{formatDescription(item.description)}
								</div>
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

// Tailwind CSS keyframes for fade-in and pulse
// Add to your global CSS (e.g., src/app/globals.css):
//
// @keyframes timeline-fade-in {
//   0% { opacity: 0; transform: scale(0.85); }
//   100% { opacity: 1; transform: scale(1); }
// }
// .animate-timeline-fade-in { animation: timeline-fade-in 0.6s cubic-bezier(0.4,0,0.2,1) both; }
//
// @keyframes pulse-slow {
//   0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.2); }
//   50% { box-shadow: 0 0 0 8px rgba(59,130,246,0.12); }
// }
// .animate-pulse-slow { animation: pulse-slow 2s infinite; }
//
export default Timeline;
