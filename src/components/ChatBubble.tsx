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

// Floating Chat Button and ChatBubble
const ChatBubble: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Parag's AI assistant. Ask me anything about this website or Parag's work!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  React.useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/gpt4o-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.answer }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, there was an error.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed z-50 bottom-[250px] right-6 p-0 w-14 h-14 flex items-center justify-center bg-transparent border-none hover:scale-105 transition-transform focus:outline-none"
        aria-label="Open AI Chat"
        onClick={() => setOpen(true)}
        style={{ display: open ? 'none' : 'flex' }}
      >
        <img src="/chat_bubble.png" alt="Chat" className="w-12 h-12 rounded-full" />
      </button>
      {/* Chat Window */}
      {open && (
        <div className="fixed z-50 bottom-6 right-6 w-80 max-w-[95vw] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col animate-fadeIn" style={{ minHeight: 400 }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-blue-700 dark:text-white">Talk to my assistant</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages([{ role: 'assistant', content: "Hi! I'm Parag's AI assistant. Ask me anything about this website or Parag's work!" }])}
                aria-label="Clear chat"
                className="text-slate-400 hover:text-blue-600 dark:hover:text-white text-lg px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                title="Clear chat"
              >
                🗑️
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-slate-400 hover:text-blue-600 dark:hover:text-white text-lg">✕</button>
            </div>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-3 text-sm" style={{ maxHeight: 300 }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={msg.role === 'user' ? 'inline-block bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-xl px-3 py-2 my-1' : 'inline-block bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl px-3 py-2 my-1'}>
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {loading && <div className="text-slate-400">Thinking...</div>}
          </div>
          <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 dark:border-slate-800">
            <input
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              aria-label="Type your message"
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-50"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
