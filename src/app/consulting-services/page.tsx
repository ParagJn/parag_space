"use client";
import React, { useState } from "react";

const services = [
	{
		title: "AI Strategy & Advisory",
		summary:
			"Guidance on leveraging AI for business transformation, including roadmap, technology selection, and ROI analysis.",
		details:
			"I help organizations define and execute their AI strategy, from ideation to implementation. Services include executive workshops, technology landscape reviews, and actionable roadmaps tailored to your business goals.",
	},
	{
		title: "Custom LLM & GenAI Solutions",
		summary:
			"Design and build custom Large Language Model (LLM) and Generative AI solutions for your unique business needs.",
		details:
			"From proof-of-concept to production, I architect and deliver GenAI-powered applications, including chatbots, document automation, and knowledge assistants. My approach ensures security, scalability, and measurable business impact.",
	},
	{
		title: "Enterprise Data & NLP Consulting",
		summary:
			"Unlock value from your data with advanced NLP, data pipelines, and domain-specific AI models.",
		details:
			"I provide end-to-end consulting for enterprise data projects: data strategy, NLP pipelines, healthcare/finance data solutions, and integration with cloud platforms. My work enables actionable insights and automation at scale.",
	},
];

const ConsultingServicesPage: React.FC = () => {
	const [openIdx, setOpenIdx] = useState<number | null>(null);

	return (
		<div className="w-full min-h-screen bg-white flex flex-col">
			<div className="flex-1 flex flex-col justify-start">
				<div className="max-w-5xl mx-auto px-4 py-16 bg-white transition-colors duration-300">
					<h1 className="text-4xl font-extrabold text-slate-800 mb-10 text-center">
						Consulting Services
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{services.map((service, idx) => (
							<div key={service.title} className="flex">
								<button
									className="w-full flex-1 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-start gap-4 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[320px] h-full"
									style={{ minHeight: 320, height: "100%" }}
									onClick={() => setOpenIdx(idx)}
									aria-label={`Open details for ${service.title}`}
								>
									<div className="text-2xl font-bold text-blue-700 mb-2">
										{service.title}
									</div>
									<div className="text-slate-700 text-base mb-2">
										{service.summary}
									</div>
									<span className="mt-auto text-blue-600 font-semibold text-sm">
										Learn More →
									</span>
								</button>
								{/* Modal Card */}
								{openIdx === idx && (
									<div
										className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
										onClick={() => setOpenIdx(null)}
									>
										<div
											className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full relative animate-fade-in border border-blue-200"
											onClick={(e) => e.stopPropagation()}
										>
											<button
												className="absolute top-4 right-4 text-slate-400 hover:text-blue-600 text-2xl"
												onClick={() => setOpenIdx(null)}
												aria-label="Close details"
											>
												✕
											</button>
											<h2 className="text-2xl font-bold text-blue-700 mb-4">
												{service.title}
											</h2>
											<div className="text-slate-700 text-base mb-4">
												{service.details}
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConsultingServicesPage;
