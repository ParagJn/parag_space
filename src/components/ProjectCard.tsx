"use client";
import React from 'react';

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  onLearnMore?: () => void;
}

const renderDescription = (desc: string) => {
  // Split by line breaks and render as a vertical list with icons
  return (
    <ul className="space-y-1 pl-0 list-none">
      {desc.split('\n').map((line, idx) => (
        <li key={idx} className="flex items-start text-slate-600 text-sm">
          <span className="mr-2">{line.trim().slice(0,2)}</span>
          <span>{line.trim().slice(2)}</span>
        </li>
      ))}
    </ul>
  );
};

const getTruncatedDescription = (desc: string, wordLimit: number = 50) => {
  const words = desc.split(/\s+/);
  if (words.length <= wordLimit) return desc;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, tech, link, onLearnMore }) => {
  const truncated = getTruncatedDescription(description);
  // Show only the first 3 techs on the card
  const techPreview = tech.slice(0, 3);
  return (
    <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      <h4 className="text-lg font-bold text-slate-800 mb-1">{name}</h4>
      <div className="mb-2">{renderDescription(truncated)}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {techPreview.map(t => (
          <span key={t} className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">{t}</span>
        ))}
        {tech.length > 3 && (
          <span className="text-xs text-slate-400">+{tech.length - 3} more</span>
        )}
      </div>
      {link && (
        <button
          className="text-blue-600 text-sm font-medium hover:underline self-start"
          onClick={onLearnMore}
          type="button"
        >
          Learn more
        </button>
      )}
    </div>
  );
};

export default ProjectCard;
