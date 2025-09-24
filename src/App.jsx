import { useState } from 'react'
import './App.css'
import testing from './config/gemini'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentPrompts, setRecentPrompts] = useState([]);

  const handleSend = async (prompt) => {
    if (!prompt) return;

  
    setMessages(prev => [...prev, { role: "user", text: prompt }]);
    setLoading(true);

    
    setRecentPrompts(prev => [prompt, ...prev]); 
    try {
      let rs = await testing(prompt);

      setMessages(prev => [
        ...prev,
        { role: "user", text: prompt },
        { role: "ai", text: rs }
      ]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", text: "⚠️ Error fetching response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <Sidebar recentPrompts={recentPrompts} />
      <Main messages={messages} onSend={handleSend} loading={loading} />
    </>
  )
}

export default App;
