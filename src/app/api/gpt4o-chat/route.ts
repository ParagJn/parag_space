import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get plain text content from a page file
function getPageContent(page: string, filePath: string): string {
  try {
    const absPath = path.join(process.cwd(), 'src', 'app', filePath);
    let content = fs.readFileSync(absPath, 'utf8');
    // Remove imports/exports and JSX, keep only text content
    content = content.replace(/<[^>]+>/g, ' ') // Remove JSX tags
      .replace(/import .+?;|export .+?;/g, ' ') // Remove imports/exports
      .replace(/\{[^}]*\}/g, ' ') // Remove JS expressions
      .replace(/\s+/g, ' ') // Collapse whitespace
      .trim();
    return `${page}: ${content}`;
  } catch {
    return `${page}: [Could not load content]`;
  }
}

function getAllPageContent() {
  // List of pages to aggregate
  const pages = [
    { page: 'Home', file: 'page.tsx' },
    { page: 'Projects', file: 'projects/page.tsx' },
    { page: 'Work History', file: 'work-history/page.tsx' },
    { page: 'Consulting Services', file: 'consulting-services/page.tsx' },
  ];
  // Get static page content
  const staticContent = pages.map(p => getPageContent(p.page, p.file)).join('\n\n');
  // Add project cards info
  let projectsInfo = '';
  try {
    const projects = require('../../../data/projects').default;
    projectsInfo = '\n\nProjects List:\n' + projects.map((p: any, i: number) => {
      return `${i+1}. ${p.name}\n   Description: ${p.description.replace(/\n/g, ' ')}\n   Technologies: ${p.tech.join(', ')}`;
    }).join('\n');
  } catch {
    projectsInfo = '\n[Could not load project cards info]';
  }
  // Add timeline info
  let timelineInfo = '';
  try {
    const timeline = require('../../../data/timeline').default;
    timelineInfo = '\n\nProfessional Timeline:\n' + timeline.map((t: any, i: number) => {
      return `${t.year}: ${t.title}${t.subtitle ? ' - ' + t.subtitle : ''}\n   ${t.description.replace(/\n/g, ' ')}`;
    }).join('\n');
  } catch {
    timelineInfo = '\n[Could not load timeline info]';
  }
  return staticContent + projectsInfo + timelineInfo;
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY || process.env['OPENAI_API_KEY'];
  if (!apiKey) {
    return NextResponse.json({ answer: 'API key not set.' }, { status: 500 });
  }

  // Dynamically aggregate website content as context
  const context = getAllPageContent();
  // console.log('GPT4o-chat context:', context);

  const systemPrompt = `You are Parag's helpful AI assistant. Use the following website context to answer questions as helpfully as possible.\n\n${context}`;

  const body = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    max_tokens: 2000
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    return NextResponse.json({ answer: 'OpenAI API error.' }, { status: 500 });
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content || 'No answer.';
  return NextResponse.json({ answer });
}

// API route removed for static export (GitHub Pages)
