import React, { useState, useEffect, useRef } from 'react';
import './Response.css'; // <-- make sure this file is next to Response.jsx

function Response({ messages = [], onSend = () => {} }) {
  const [text, setText] = useState('');
  const endRef = useRef(null);

  // Auto-scroll when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  }

  return (
    <div className="chat-container" role="region" aria-label="Chat">
      <div className="messages">
        {messages.length === 0 ? (
          <div className="empty">Start a conversation...</div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}
            >
              {msg.text}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>

      <div className="input-area">
        <input
          aria-label="Chat input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) send(); }}
        />
        <button aria-label="Send message" onClick={send}>Send</button>
      </div>
    </div>
  );
}

export default Response;
