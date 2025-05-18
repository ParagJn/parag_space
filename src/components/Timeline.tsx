"use client";
import React, { useState, useRef, useEffect } from 'react';

const currentYear = new Date().getFullYear();

const timelineData = [
	{
		year: 2000,
		title: 'Emids Technologies',
		subtitle: 'Senior Web Developer',
		description: `As a graduate hire, I started my career as a web developer at Emids Technologies Pvt. Ltd. 
where I worked on various projects involving web technologies and gained valuable experience in software development life cycle.
All the projects I worked on were in the healthcare domain, which helped me understand the complexities and challenges of this industry.
I was involved in the development of web applications that catered to the needs of healthcare providers as well as internal tools for the company.
`,
	},
	{
		year: 2002,
		title: 'Timken Engineering & Research India',
		subtitle: 'Data Warehouse & BI Developer',
		description: `At Timken, I learnt the importance of data in decision making and how to leverage it for business growth. 
Here, I learned about data warehousing concepts, ETL processes, and BI tools and using Modeling to build data pipelines and dashboards.
These dashboards provided insights into the company's operations and performance and helped in making informed decisions by the leadership team.
I was involved in the development of a data warehouse that integrated data from various sources and provided a single source of truth for the organization.
`,
	},
	{
		year: 2005,
		title: 'Symphony Services Pvt. Ltd (now Cognizant)',
		subtitle: 'Senior Software Engineer',
		description: `At symphony, I worked on various projects involving core ETL development and large scale deployment across clients. 
I gained hands-on experience in designing and implementing data integration solutions using various ETL tools and frameworks.
I also collaborated with cross-functional teams to gather requirements and ensure successful project delivery.
I was deployed on-site to ensure smooth implementation and support for the clients.
Key highlight was a Retail store "Shelf Planner" software that used statistics to plan the shelf space for various products in a retail store helping the overall inventory & product discoverability.
I was also a team lead and mentor for junior developers, providing guidance and support in their professional growth.
`,
	},
	{
		year: 2007,
		title: 'Accenture Technology Solutions',
		subtitle: 'Technology Architect',
		description: `At Accenture I really started my journey deep into the world of data and analytics. 
    I was involved in various projects involving data warehousing, ETL development, and BI solutions at a large enterprise scale. 
    I gained hands-on experience in designing and implementing data integration solutions using various ETL tools and frameworks that were core part of the Accenture's strategy and implementation. 
    I also collaborated with cross-functional teams to gather requirements and ensure successful project delivery. 
    I was deployed on-site for a multi-year engagement to one of the largest telecom providers in Australia. 
    Key Highlight was a "User Migration" project that involved migration of millions of records with an older system to a new system with zero downtime and no data loss. 
    Being a telecom provider, it was critical to ensure that the customer experience was not affected and no errors were reported in the billing system.
    `,
	},
	{
		year: 2012,
		title: 'IBM India Pvt. Ltd.',
		subtitle: 'Technology Strategist - Generative AI Asset Engineering',
		description: ` At IBM India, my journey has been divided in to 2 parts. First 10 years of my journey has been to provide expert level consulting services to clients acrsoss the globe.
    I was part of IBM's Data Platform CoE Competency with focus on driving solutions and building architectures for large scale data and analytics solutions.
    Key highlight was delivery of a Federal government mandated compliance solution for a large bank in California. The project has strict deadlines without any option of delays.
    With this project, my role also involved managing a large team and client at the same time using proven project management and agile methodologies.
    
    The second and ongoing part of my journey from last 3 years has been focused on building Generative AI solutions for IBM's clients.
    I was part of the initial development team that built IBM Watsonx.ai and Watsonx.data based solutions and executing them as pilot program to showcase the capabilities of the generative AI services.
    Key highlight has been the development and implementation of "Generative AI based Fraud Detection" solution for IBM BPO Organization.
    These days, I am hands-on developing & leading a team of excellent engineers to build a suite of productivity assets that leverage generative AI to automate and enhance SAP processes.
    The assets are modular and reusable, allowing for easy integration into existing workflows.`,
	},
	{
		year: currentYear,
		title: "What's next?",
		description: 'Possibilities are exciting and endless.',
		future: true,
	},
];

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
	const getAnimDelay = (idx: number) => `${idx * 120}ms`;

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
