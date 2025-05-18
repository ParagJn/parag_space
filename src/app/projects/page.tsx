"use client";
import React, { useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import projects from '../../data/projects';

const renderDescription = (desc: string) => {
  // If the description contains line breaks, split and render each line as a professional list
  return (
    <ul className="space-y-2 pl-0 list-none">
      {desc.split('\n').map((line, idx) => (
        <li key={idx} className="flex items-start text-slate-700 text-base">
          <span className="mr-2 text-lg">{line.trim().slice(0,2)}</span>
          <span>{line.trim().slice(2)}</span>
        </li>
      ))}
    </ul>
  );
};

const ProjectsPage: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<div className="w-full min-h-screen bg-white flex flex-col">
			<div className="flex-1 flex flex-col justify-start">
				<div className="max-w-5xl mx-auto px-4 py-12 bg-white transition-colors duration-300">
					<h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
						Projects
					</h1>
					<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
						{projects.map((project, idx) => (
							<ProjectCard
								key={idx}
								{...project}
								onLearnMore={() => setSelected(idx)}
							/>
						))}
					</div>
					{/* Modal for Learn More */}
					{selected !== null && (
						<div
							className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
							onClick={() => setSelected(null)}
						>
							<div
								className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative border border-slate-200"
								onClick={(e) => e.stopPropagation()}
							>
								<button
									className="absolute top-2 right-2 text-slate-400 hover:text-blue-600"
									onClick={() => setSelected(null)}
									aria-label="Close"
								>
									✕
								</button>
								<h2 className="text-2xl font-bold mb-2 text-slate-800">
									{projects[selected].name}
								</h2>
								<div className="text-slate-700 mb-2">
									{renderDescription(projects[selected].description)}
								</div>
								<div className="mb-4">
									<span className="font-semibold text-slate-800">
										Technologies:
									</span>
									<ul className="flex flex-wrap gap-2 mt-1">
										{projects[selected].tech.map((t) => (
											<li
												key={t}
												className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
											>
												{t}
											</li>
										))}
									</ul>
								</div>
								{/* Custom content for Productivity Assets */}
								{projects[selected].name === 'Generative AI-based productivity assets' && (
									<div className="mb-4">
										<span className="font-semibold text-slate-800 block mb-1">Developed Assets:</span>
										<ol className="list-decimal pl-6 text-slate-700 text-sm space-y-1">
											<li>Technical Specification Document</li>
											<li>Process Design Document</li>
											<li>RFP Generator</li>
										</ol>
									</div>
								)}
								<div className="text-slate-500 text-sm">
									Details about the project. 
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectsPage;
