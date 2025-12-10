import React, { useState, useRef, useEffect } from 'react';
import { Send, User, RefreshCw, Code, MessageSquare, Play, Copy, Check, Terminal, FileCode, Monitor, Rocket, Zap } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const QUICK_ACTIONS = [
  { label: "🐍 Pump Snake", prompt: "Write a fully functional Snake game where the snake is a green candle eating shorts. Single HTML file." },
  { label: "💊 Flappy Pill", prompt: "Create a Flappy Bird clone called 'Flappy Pill' where a green pill flies through red candles." },
  { label: "🪙 Token Dashboard", prompt: "Create a modern Pump.fun Token Dashboard UI with price charts, volume stats, and a swap interface component." },
  { label: "🧮 ROI Calculator", prompt: "Build a Crypto ROI Calculator app that calculates potential moon profits based on investment and multiplier." }
];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'INITIATING PUMP PROTOCOL v1.0...\n\nI am Pump GPT. I build flawless apps, games, and smart contracts.\n\nTell me what to ship. 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [previewKey, setPreviewKey] = useState(0);
  const [codeCopied, setCodeCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractCode = (text: string) => {
    const match = text.match(/```html([\s\S]*?)```/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return null;
  };

  const extractUpgrades = (text: string): string[] => {
    // Look for "Vibe Upgrades" followed by content until the end
    const match = text.match(/(?:###|\*\*|)\s*Vibe Upgrades[:\s]*([\s\S]*?)$/i);
    if (match && match[1]) {
      return match[1]
        .split('\n')
        .filter(line => line.trim().match(/^[-*•]/)) // Get lines starting with bullets
        .map(line => line.replace(/^[-*•]\s*/, '').trim()) // Clean bullets
        .filter(line => line.length > 0);
    }
    return [];
  };

  const cleanText = (text: string) => {
    let clean = text.replace(/```html[\s\S]*?```/, '[Code successfully compiled to Workspace]');
    // Remove the Vibe Upgrades section from the main text
    clean = clean.replace(/(?:###|\*\*|)\s*Vibe Upgrades[:\s]*([\s\S]*?)$/i, '');
    return clean.trim();
  };

  const processMessage = async (textInput: string) => {
    if (!textInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: textInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(userMessage.text, history);
      
      const code = extractCode(responseText);
      const upgrades = extractUpgrades(responseText);
      const displayContent = cleanText(responseText);

      const botMessage: ChatMessage = { 
        role: 'model', 
        text: displayContent,
        upgrades: upgrades.length > 0 ? upgrades : undefined
      };
      
      setMessages(prev => [...prev, botMessage]);

      if (code) {
        setGeneratedCode(code);
        setPreviewKey(prev => prev + 1);
        setActiveTab('preview');
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Network congested. Vibes are too high. Try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processMessage(input);
  };

  const handleQuickAction = (prompt: string) => {
    processMessage(prompt);
  };

  const handleCopyCode = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-white relative">
      
      {/* LEFT PANEL: CHAT */}
      <div className="flex flex-col h-full lg:w-[400px] xl:w-[450px] border-r border-gray-200 bg-gray-50 flex-shrink-0">
          {/* Chat Header */}
          <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-green-200 overflow-hidden shadow-sm flex-shrink-0">
                   <img 
                      src="https://pbs.twimg.com/media/G71caYrXsAAAonQ?format=jpg&name=medium" 
                      alt="Pump GPT Logo"
                      className="w-full h-full object-cover"
                   />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-sm">Pump GPT</h3>
                    <p className="text-[10px] text-gray-500 font-mono">Vibe_Engine_v1.0.0 [ONLINE]</p>
                </div>
            </div>
            <button 
                onClick={() => {
                  setMessages([{ role: 'model', text: 'System Reset. Memory Cleared. Ready for new input.' }]);
                  setGeneratedCode('');
                }}
                className="text-gray-400 hover:text-pump-green transition-colors"
                title="Reset Session"
            >
                <RefreshCw size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-pump-black text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>

                    {/* VIBE UPGRADES SECTION */}
                    {msg.upgrades && msg.upgrades.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                         <div className="bg-green-50 rounded-xl p-3 border border-green-100/50">
                            <h4 className="flex items-center gap-2 text-pump-dark font-black text-[10px] uppercase tracking-widest mb-2">
                               <Rocket size={12} className="animate-pulse" /> Vibe Upgrades
                            </h4>
                            <ul className="space-y-2">
                               {msg.upgrades.map((upgrade, i) => (
                                 <li key={i} className="text-xs text-gray-700 flex gap-2 items-start leading-snug">
                                    <span className="text-pump-green font-bold mt-0.5">•</span> 
                                    <span>{upgrade}</span>
                                 </li>
                               ))}
                            </ul>
                         </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200 flex gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (Visible when chat is short) */}
          {messages.length < 3 && !isLoading && (
            <div className="px-4 pb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Quick Start</p>
                <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => handleQuickAction(action.prompt)}
                            className="bg-white border border-gray-200 hover:border-pump-green hover:bg-green-50 text-gray-600 hover:text-pump-dark text-xs font-bold py-2 px-3 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Create a Solana token dashboard..."
                className="flex-grow bg-gray-100 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pump-green/50 border border-transparent transition-all text-sm"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-pump-green text-white p-3 rounded-xl hover:bg-pump-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
      </div>

      {/* RIGHT PANEL: WORKSPACE (PREVIEW & CODE) */}
      <div className="flex flex-col h-full flex-grow bg-gray-900 overflow-hidden">
          {/* Workspace Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 flex items-center px-2">
             <button 
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wide flex items-center gap-2 border-b-2 transition-all ${
                    activeTab === 'preview' ? 'border-pump-green text-white bg-gray-700/50' : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
             >
                <Monitor size={14} /> Live Preview
             </button>
             <button 
                onClick={() => setActiveTab('code')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wide flex items-center gap-2 border-b-2 transition-all ${
                    activeTab === 'code' ? 'border-pump-green text-white bg-gray-700/50' : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
             >
                <FileCode size={14} /> Source Code
             </button>

             <div className="ml-auto flex items-center gap-3 pr-2">
                {generatedCode && activeTab === 'preview' && (
                    <button 
                    onClick={() => setPreviewKey(prev => prev + 1)}
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-all"
                    title="Reload Preview"
                    >
                    <RefreshCw size={14} />
                    </button>
                )}
                {generatedCode && (
                    <button 
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-pump-green hover:bg-pump-dark text-white rounded-md text-[10px] font-bold uppercase tracking-wider transition-all"
                    >
                    {codeCopied ? <Check size={12} /> : <Copy size={12} />}
                    {codeCopied ? 'COPIED' : 'COPY'}
                    </button>
                )}
             </div>
          </div>
          
          <div className="flex-grow relative bg-gray-900 overflow-hidden">
             {generatedCode ? (
                <>
                   {/* PREVIEW VIEW */}
                   <div className={`w-full h-full ${activeTab === 'preview' ? 'block' : 'hidden'}`}>
                        <iframe 
                            key={previewKey}
                            srcDoc={generatedCode}
                            title="Live Preview"
                            className="w-full h-full border-0 bg-white"
                            sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                        />
                   </div>

                   {/* CODE VIEW */}
                   <div className={`w-full h-full overflow-auto p-0 ${activeTab === 'code' ? 'block' : 'hidden'}`}>
                        <pre className="p-4 text-xs font-mono text-green-400 bg-gray-950 w-full min-h-full">
                            <code>{generatedCode}</code>
                        </pre>
                   </div>
                </>
             ) : (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-8 text-center select-none">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 ring-4 ring-gray-800/50">
                     <Code size={40} className="text-gray-600" />
                  </div>
                  <h3 className="font-bold text-gray-400 text-lg mb-2">Workspace Empty</h3>
                  <p className="text-sm max-w-sm">Command the agent to generate a UI, App, or Game to visualize it here.</p>
               </div>
             )}
          </div>
      </div>
    </div>
  );
};