"use client";
import React, { useState, useRef } from "react";

function renderMessageContent(content: string) {
  // Render bullet points if the message contains lines starting with '- '
  if (content.includes('\n- ')) {
    const lines = content.split(/\r?\n/);
    const bullets = lines.filter(line => line.trim().startsWith('- '));
    const rest = lines.filter(line => !line.trim().startsWith('- '));
    return (
      <>
        {rest.map((line, i) => line && <div key={i}>{line}</div>)}
        {bullets.length > 0 && (
          <ul className="list-disc pl-6 my-2">
            {bullets.map((line, i) => (
              <li key={i}>{line.replace(/^-\s*/, "")}</li>
            ))}
          </ul>
        )}
      </>
    );
  }
  return content.split(/\r?\n/).map((line, i) => <div key={i}>{line}</div>);
}

// ChatBubble component removed for static site export

// export default ChatBubble;
