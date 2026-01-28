'use client';

import { useState } from 'react';

type Message = {
  from: 'user' | 'bot';
  text: string;
};

const QUICK_OPTIONS = [
  'Wat zijn de SDG’s?',
  'Waar komt de data vandaan?',
  'Hoe kan ik data exporteren?',
  'Hoe vaak wordt de data bijgewerkt?',
  'Hoe gebruik ik het dashboard?'
];

export default function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: '👋 Hallo! Ik ben de SDG-assistent. Stel gerust je vraag over het dashboard, data of doelen.'
    }
  ]);

  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(true);

  const getBotResponse = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes('sdg')) {
      return 'De SDG’s (Sustainable Development Goals) zijn 17 doelen van de VN om armoede, ongelijkheid en klimaatverandering aan te pakken.';
    }

    if (q.includes('data')) {
      return 'De data in het SDG dashboard komt van betrouwbare bronnen zoals de VN, Wereldbank en nationale statistische bureaus.';
    }

    if (q.includes('export')) {
      return 'Je kunt data exporteren via het export-icoon bij grafieken en tabellen. Export is beschikbaar als CSV en PDF.';
    }

    if (q.includes('bijgewerkt') || q.includes('update')) {
      return 'De meeste indicatoren worden maandelijks bijgewerkt. Sommige data is real-time beschikbaar.';
    }

    if (q.includes('dashboard')) {
      return 'Begin bij het overzicht en gebruik filters om per SDG, regio of periode dieper te analyseren.';
    }

    return 'Goede vraag! Ik help je graag met SDG’s, data, export en dashboardgebruik.';
  };

  const sendMessage = (text?: string) => {
    const messageText = text ?? input;
    if (!messageText.trim()) return;
    const wasQuick = QUICK_OPTIONS.includes(messageText);

    setMessages(prev => [
      ...prev,
      { from: 'user', text: messageText }
    ]);

    setInput('');
    setShowOptions(false);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: getBotResponse(messageText) }
      ]);
      if (wasQuick) setShowOptions(true);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-purple-900 border border-purple-400/30 rounded-xl shadow-2xl z-50">

      {/* Header */}
       <div className="flex justify-between items-center p-3 border-b border-purple-400/20">
        <span className="text-white font-semibold">SDG Live Chat</span>
        <button onClick={onClose} className="text-purple-300 hover:text-white">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="p-3 h-64 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm p-2 rounded-lg max-w-[85%] ${
                msg.from === 'user'
                  ? 'ml-auto bg-purple-600 text-white'
                  : 'bg-purple-700 text-purple-100'
              }`}
          >
            {msg.text}
          </div>
        ))}

        {/* Quick options */}
        {showOptions && (
            <div className="mt-2 space-y-2">
            {QUICK_OPTIONS.map(option => (
              <button
                key={option}
                onClick={() => sendMessage(option)}
                 className="w-full text-left text-sm px-3 py-2 rounded-lg bg-purple-800 text-purple-100 hover:bg-purple-700 transition"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 p-3 border-t border-purple-400/20">
        <input
           className="flex-1 bg-purple-900 text-white rounded px-2 py-1 text-sm"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Of typ je eigen vraag..."
        />
        <button
          onClick={() => sendMessage()}
          className="bg-purple-600 text-white px-3 rounded text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
